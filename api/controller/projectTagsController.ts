import {projectTagsModel} from '../db/models'

export default class projectTagsController{

     async getAll(){
        try {
            const data = await projectTagsModel.findAll()
            return data; 
        } catch (error) {
            return {error:error};
        }
    }

    async create(data:any){
        try {
            const add = await projectTagsModel.create(data);
            return add;
        } catch (error) {
            return {error:error};
        }
    }

    async edit(data:any,id:string){
        try {
            const edit = await projectTagsModel.update(data,{where:{id:id}})
            return edit; 
        } catch (error) {
            return {error:error};
        }
    }

    async delete(id:string){
        try {
            const destroy = await projectTagsModel.destroy({where:{id:id}})
            return destroy; 
        } catch (error) {
            return {error:error};
        }
    }
}