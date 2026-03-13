import {aboutModel} from '../db/models'


export default class aboutController{

     async getAll(){
        try {
            const data = await aboutModel.findAll()
            return data[0]; 
        } catch (error) {
            return {error:error};
        }
    }

    async getByKey(key:string){
            try {
                const data = await aboutModel.findAll({
                    attributes:[key]
                })
                return data[0];
            } catch (error:any) {
                return {error:error.message};
            }
        }

    async create(data:any){
        try {
            const add = await aboutModel.create(data)
            return add; 
        } catch (error) {
            return {error:error};
        }
    }

    async edit(data:any,id:string){
        try {
            const edit = await aboutModel.update(data,{where:{id:id}})
            return edit; 
        } catch (error) {
            return {error:error};
        }
    }

    async delete(id:string){
        try {
            const destroy = await aboutModel.destroy({where:{id:id}})
            return destroy; 
        } catch (error) {
            return {error:error};
        }
    }

    async deleteImage(id:string){
            try {
                const destroy = await aboutModel.update({image:''},{where:{id:id}})        
                return destroy;
            } catch (error) {
                return {error:error};
            }
        }
}

