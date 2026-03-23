import { projectTagsModel, tagsGroupModel } from "../db/models";
import { tagsModel } from "../db/models";

export default class tagsGroupController{

     async getAll(){
        try {
            const groups = (await tagsGroupModel.findAll()).map((data)=>data.dataValues)
                            const tags = (await tagsModel.findAll()).map((data)=>data.dataValues);
                        

                        const tagsMap = tags.reduce((acc,tag)=>{
                            if(!acc[tag.tagGroupId]){
                                acc[tag.tagGroupId] = [];
                            }
            
                            acc[tag.tagGroupId].push(tag);
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
            const add = await tagsGroupModel.create(data)
            return add; 
        } catch (error) {
            return {error:error};
        }
    }

    async edit(data:any,id:string){
        try {
            const edit = await tagsGroupModel.update(data,{where:{id:id}})
            return edit; 
        } catch (error) {
            return {error:error};
        }
    }

    async delete(id:string){
        try {
            const tagsOnGroup = await tagsModel.findAll({where:{tagGroupId:id}});
            let removeFromProject:Promise<any>[] = [];
            
            if(tagsOnGroup.length){
                tagsOnGroup.map((tag)=>{
                    removeFromProject.push(
                        projectTagsModel.destroy({where:{tagId:tag.dataValues.id}})
                    )
                })
                await Promise.all(removeFromProject)
                await tagsModel.destroy({where:{tagGroupId:id}})                 
            }
            
            const destroy = await tagsGroupModel.destroy({where:{id:id}})
            return destroy;

            
        } catch (error) {
            return {error:error};
        }
    }

    async deleteTagsFromGroup(groupId:string){
            try {
                const deleteAllSkills = await tagsModel.destroy({where:{tagGroupId:groupId}})
                return deleteAllSkills;
            } catch (error) {
                return {error:error};
            }
        }
}