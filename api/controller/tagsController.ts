import { Op } from 'sequelize';
import {tagsModel,projectTagsModel, tagsGroupModel} from '../db/models'

export default class tagsController{

     async getAll(){
        try {
            const data = await tagsModel.findAll()
            return data; 
        } catch (error) {
            return {error:error};
        }
    }

    async searchTag(searchQuery:string){
        try {
            const groups = await tagsGroupModel.findAll();
            const groupsMap = groups.reduce((acc:any,group:any)=>{
                if(!acc[group.dataValues.id]){
                    acc[group.dataValues.id] = []
                }
                acc[group.dataValues.id].push(group.dataValues);
                return acc
            },{})
            
            const data = (await tagsModel.findAll({where:{name:{[Op.like]:`%${searchQuery}%`}}}))
            .map((tag)=>(
                {...tag.dataValues,color:groupsMap[tag.dataValues.tagGroupId][0].color}
            ))
            return data;
        } catch (error) {
            return {error:error}; 
        }
    }

     async getByGroupId(groupId:string){
        try {
            const data = await tagsModel.findAll({where:{tagGroupId:groupId}})
            return data; 
        } catch (error) {
            return {error:error};
        }
    }



    async create(data:any){
        try {
            const add = await tagsModel.create(data)
            return add; 
        } catch (error) {
            return {error:error};
        }
    }

    async edit(data:any,id:string){
        try {
            const edit = await tagsModel.update(data,{where:{id:id}})
            return edit; 
        } catch (error) {
            return {error:error};
        }
    }

    async delete(id:string){
        try {
            const destroyChildrens = await projectTagsModel.destroy({where:{tagId:id}})
            const destroy = await tagsModel.destroy({where:{id:id}})
            
            return {destroyed:destroy,childrens:destroyChildrens}; 
        } catch (error) {
            return {error:error};
        }
    }
}