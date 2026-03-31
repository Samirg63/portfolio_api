import { Op } from 'sequelize';
import db from '../models/index.cjs'
const Projects = db.Projects
const ProjectsTags = db.ProjectsTags
const TagsGroups = db.TagsGroups
const Tags = db.Tags




export default class projectsController{

     async getAll(){
        try {
            //Get projects
            
            const get = await Projects.findAll()
            //Get tags linked to projects
            
                const projectAndTags = get.map(async(data)=>{
                        const projectsTags = await ProjectsTags.findAll({where:{projectId:(data as any).dataValues.id}}) 
                        const tagIdArray = projectsTags?.map((tag)=>{
                            return tag.dataValues
                        
                        })
                        const tagsValues = await Promise.all(tagIdArray?.map(async(tagId)=>{
                            
                            const values = await Tags.findAll({where:{id:tagId.tagId}})
                            return (values[0] as any).dataValues
                        }))
                        
                        const tagColor =  await Promise.all(tagsValues?.map(async(tagValue)=>{

                            const values = await TagsGroups.findAll({
                                attributes:['color'],
                                where:{
                                    id:(await tagValue).groupId
                                }
                            })
                            
                            return {...await tagValue,color:values[0].dataValues.color}
                            
                            
                        }));
                        
                        return {...data.dataValues,tags:tagColor}
                    
                })
                

                return await Promise.all(projectAndTags); 
            
        } catch (error) {
            return {error:error};
        }
    }

    async getProjectByTags(tags:number[]){
        try {
            let projectsIds = (await ProjectsTags.findAll({where:{tagId:{[Op.or]:tags}}}))
        .map((data)=>{
            return data.dataValues.projectId
        })

        //Get only who match the total of tags
        const tagOccurance = projectsIds.reduce((acc,current)=>{
            acc[current] = (acc[current] || 0) + 1
            return acc
        },{})

        projectsIds = [];
        Object.keys(tagOccurance).map((id)=>{
            if(tagOccurance[id] == tags.length){
                projectsIds.push(id)  
            }
        })

        
        if(!projectsIds.length ){

            return []
        }
        const getProjects = await Projects.findAll({where:{id:{[Op.or]:projectsIds}}})
        return getProjects;
        } catch (error) {
            return {error:error}
        }
        

    }

    async create(data:any){
        try {  
            const {tags,...rest} = data;
            const add:any = await Projects.create(rest)


            const formatedtags = tags.map((info:any)=>{
                return {projectId:add.dataValues.id,tagId:info.id}
            })
            const addTags = await ProjectsTags.bulkCreate(formatedtags)
            return {...add.dataValues,tags:addTags}; 
        } catch (error) {
            return {error:error};
        }
    }

    async edit(data:any,id:string){
        //editar as tags separadamente
        try {
            const {tags,...rest} = data;
            const edit = await Projects.update(rest,{where:{id:id}})

            //Deleta tags antigas e adiciona as novas
            if(tags){
                await ProjectsTags.destroy({where:{projectId:id}})
                const formatedtags = tags.map((info:any)=>{
                    return {projectId:id,tagId:info.id}
                })
                await ProjectsTags.bulkCreate(formatedtags)
            }


            return edit; 
        } catch (error) {
            return {error:error};
        }
    }

    async delete(id:string){
        try {
            const destroy = await Projects.destroy({where:{id:id}})
            return destroy; 
            
        } catch (error) {
            return {error:error};
        }
    }

    async deleteTag(tagId:string){
        const projectsTags = await Projects.findAll({attributes:['tags']});
        const newtags = JSON.parse(projectsTags[0].dataValues.tags).filter((tag:string) => tag != tagId)
        
        Projects.update({tags:JSON.stringify(newtags)},{where:{}})
    }
}