import db from '../models/index.cjs'
const Contacts = db.Contacts


export default class contactController{

     async getAll(){
        try {
            const data = await Contacts.findAll()
            return data[0]; 
        } catch (error:any) {
            return {error:error.message};
        }
    }

    async create(data:any){
        try {
            const add = await Contacts.create(data)
            return add; 
        } catch (error) {
            return {error:error};
        }
    }

    async edit(data:any,id:string){
        try {
            const edit = await Contacts.update(data,{where:{id:id}})
            return edit; 
        } catch (error) {
            return {error:error};
        }
    }

    async delete(id:string){
        try {
            const destroy = await Contacts.destroy({where:{id:id}})
            return destroy; 
        } catch (error) {
            return {error:error};
        }
    }
}

