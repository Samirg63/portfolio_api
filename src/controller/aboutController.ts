import db from '../models/index.cjs'
const Abouts = db.Abouts



export default class aboutController{

     async getAll(){
        try {
            const data = await Abouts.findAll()
            return data[0]; 
        } catch (error) {
            return {error:error};
        }
    }

    async getByKey(key:string){
            try {
                const data = await Abouts.findAll({
                    attributes:[key]
                })
                return data[0];
            } catch (error:any) {
                return {error:error.message};
            }
        }

    async create(data:any){
        try {
            const add = await Abouts.create(data)
            return add; 
        } catch (error) {
            return {error:error};
        }
    }

    async edit(data:any,id:string){
        try {
            const edit = await Abouts.update(data,{where:{id:id}})
            return edit; 
        } catch (error) {
            return {error:error};
        }
    }

    async delete(id:string){
        try {
            const destroy = await Abouts.destroy({where:{id:id}})
            return destroy; 
        } catch (error) {
            return {error:error};
        }
    }

    async deleteImage(id:string){
            try {
                const destroy = await Abouts.update({image:''},{where:{id:id}})        
                return destroy;
            } catch (error) {
                return {error:error};
            }
        }
}

