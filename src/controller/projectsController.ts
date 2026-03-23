import { Op } from 'sequelize';
import {projectsModel,projectTagsModel,tagsModel,tagsGroupModel} from '../db/models'




export default class projectsController{

     async getAll(){
        try {
            //Get projects
            const get = await projectsModel.findAll()

            //Get tags linked to projects
            const projectAndTags = get.map(async(data)=>{
                const projectTags = await projectTagsModel.findAll({where:{projectId:(data as any).id}})
                const tagIdArray = projectTags.map((tag)=>{
                    return tag.dataValues
                
                })
                const tagsValues = tagIdArray.map(async(tagId)=>{
                    
                    const values = await tagsModel.findAll({where:{id:tagId.tagId}})
                    return (values[0] as any).dataValues
                })

                const tagColor = await Promise.all( tagsValues.map(async(tagValue)=>{
                    
                    const values = await tagsGroupModel.findAll({
                        attributes:['color'],
                        where:{
                            id:(await tagValue).tagGroupId
                        }
                    })

                    return {...await tagValue,color:values[0].dataValues.color}

                    
                }))

                
                return {...data.dataValues,tags:tagColor}
            })
            
            return await Promise.all(projectAndTags); 
        } catch (error) {
            return {error:error};
        }
    }

    async getProjectByTags(tags:number[]){
        try {
            let projectsIds = (await projectTagsModel.findAll({where:{tagId:{[Op.or]:tags}}}))
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
        const getProjects = await projectsModel.findAll({where:{id:{[Op.or]:projectsIds}}})
        return getProjects;
        } catch (error) {
            return {error:error}
        }
        

    }

    async create(data:any){
        try {  
            const {tags,...rest} = data;
            const add:any = await projectsModel.create(rest)


            const formatedtags = tags.map((info:any)=>{
                return {projectId:add.dataValues.id,tagId:info.id}
            })
            const addTags = await projectTagsModel.bulkCreate(formatedtags)
            return {...add.dataValues,tags:addTags}; 
        } catch (error) {
            return {error:error};
        }
    }

    async edit(data:any,id:string){
        //editar as tags separadamente
        try {
            const {tags,...rest} = data;
            const edit = await projectsModel.update(rest,{where:{id:id}})

            //Deleta tags antigas e adiciona as novas
            if(tags){
                await projectTagsModel.destroy({where:{projectId:id}})
                const formatedtags = tags.map((info:any)=>{
                    return {projectId:id,tagId:info.id}
                })
                await projectTagsModel.bulkCreate(formatedtags)
            }


            return edit; 
        } catch (error) {
            return {error:error};
        }
    }

    async delete(id:string){
        try {
            await projectTagsModel.destroy({where:{projectId:id}})
            const destroy = await projectsModel.destroy({where:{id:id}})
            return destroy; 
            
        } catch (error) {
            return {error:error};
        }
    }

    async deleteTag(tagId:string){
        const projectTags = await projectsModel.findAll({attributes:['tags']});
        const newtags = JSON.parse(projectTags[0].dataValues.tags).filter((tag:string) => tag != tagId)
        
        projectsModel.update({tags:JSON.stringify(newtags)},{where:{}})
    }
}