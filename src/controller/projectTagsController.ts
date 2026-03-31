
import db from '../models/index.cjs'
const ProjectTags = db.ProjectTags


export default class projectTagsController{

     async getAll(){
        try {
            const data = await ProjectTags.findAll()
            return data; 
        } catch (error) {
            return {error:error};
        }
    }

    async create(data:any){
        try {
            const add = await ProjectTags.create(data);
            return add;
        } catch (error) {
            return {error:error};
        }
    }

    async edit(data:any,id:string){
        try {
            const edit = await ProjectTags.update(data,{where:{id:id}})
            return edit; 
        } catch (error) {
            return {error:error};
        }
    }

    async delete(id:string){
        try {
            const destroy = await ProjectTags.destroy({where:{id:id}})
            return destroy; 
        } catch (error) {
            return {error:error};
        }
    }
}