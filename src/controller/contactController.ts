import {contactModel} from '../db/models'

export default class contactController{

     async getAll(){
        try {
            const data = await contactModel.findAll()
            return data[0]; 
        } catch (error:any) {
            return {error:error.message};
        }
    }

    async create(data:any){
        try {
            const add = await contactModel.create(data)
            return add; 
        } catch (error) {
            return {error:error};
        }
    }

    async edit(data:any,id:string){
        try {
            const edit = await contactModel.update(data,{where:{id:id}})
            return edit; 
        } catch (error) {
            return {error:error};
        }
    }

    async delete(id:string){
        try {
            const destroy = await contactModel.destroy({where:{id:id}})
            return destroy; 
        } catch (error) {
            return {error:error};
        }
    }
}

