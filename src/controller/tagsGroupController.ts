import db from '../models/index.cjs'
const Tags = db.Tags
const ProjectTags = db.ProjectTags
const TagsGroups = db.TagsGroups


export default class tagsGroupController{

     async getAll(){
        try {
            const groups = (await TagsGroups.findAll()).map((data)=>data.dataValues)
                            const tags = (await Tags.findAll()).map((data)=>data.dataValues);
                        

                        const tagsMap = tags.reduce((acc,tag)=>{
                            if(!acc[tag.groupId]){
                                acc[tag.groupId] = [];
                            }
            
                            acc[tag.groupId].push(tag);
                            return acc;
                        },{})

                        const result = groups.map((group)=>({
                            ...group,
                            tags:tagsMap[group.id] || []
                        }))

            return result; 
        } catch (error) {
            return {error:error};
        }
    }

    async create(data:any){
        try {
            const add = await TagsGroups.create(data)
            return add; 
        } catch (error) {
            return {error:error};
        }
    }

    async edit(data:any,id:string){
        try {
            const edit = await TagsGroups.update(data,{where:{id:id}})
            return edit; 
        } catch (error) {
            return {error:error};
        }
    }

    async delete(id:string){
        try {
            const destroy = await TagsGroups.destroy({where:{id:id}})
            return destroy;     
        } catch (error) {
            return {error:error};
        }
    }

    async deleteTagsFromGroup(groupId:string){
            try {
                const deleteAllSkills = await Tags.destroy({where:{groupId:groupId}})
                return deleteAllSkills;
            } catch (error) {
                return {error:error};
            }
        }
}