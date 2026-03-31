import { Op } from 'sequelize';
import db from '../models/index.cjs'
const Tags = db.Tags
const ProjectTags = db.ProjectTags
const TagsGroups = db.TagsGroups

export default class tagsController{

     async getAll(){
        try {
            const data = await Tags.findAll()
            return data; 
        } catch (error) {
            return {error:error};
        }
    }

    async searchTag(searchQuery:string){
        try {
            const groups = await TagsGroups.findAll();
            const groupsMap = groups.reduce((acc:any,group:any)=>{
                if(!acc[group.dataValues.id]){
                    acc[group.dataValues.id] = []
                }
                acc[group.dataValues.id].push(group.dataValues);
                return acc
            },{})
            
            const data = (await Tags.findAll({where:{name:{[Op.like]:`%${searchQuery}%`}}}))
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
            const data = await Tags.findAll({where:{tagGroupId:groupId}})
            return data; 
        } catch (error) {
            return {error:error};
        }
    }



    async create(data:any){
        try {
            const add = await Tags.create(data)
            return add; 
        } catch (error) {
            return {error:error};
        }
    }

    async edit(data:any,id:string){
        try {
            const edit = await Tags.update(data,{where:{id:id}})
            return edit; 
        } catch (error) {
            return {error:error};
        }
    }

    async delete(id:string){
        try {
            const destroyChildrens = await ProjectTags.destroy({where:{tagId:id}})
            const destroy = await Tags.destroy({where:{id:id}})
            
            return {destroyed:destroy,childrens:destroyChildrens}; 
        } catch (error) {
            return {error:error};
        }
    }
}