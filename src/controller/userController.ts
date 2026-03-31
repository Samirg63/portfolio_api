
import db from '../models/index.cjs'
const Users = db.Users


export default class userController{

     async getAll(){
        try {
            const data = await Users.findAll()
            return data[0]; 
        } catch (error:any) {
            return {error:error.message};
        }
    }

    async getByKey(key:string){
        try {
            const data = await Users.findAll({
                attributes:[key]
            })
            return data[0];
        } catch (error:any) {
            return {error:error.message};
        }
    }

    async create(data:any){
        try {
            const add = await Users.create(data)
            return add; 
        } catch (error) {
            throw error
        }
    }

    async edit(data:any,id:string){
        try {
            const edit = await Users.update(data,{where:{id:id}})
            return edit; 
        } catch (error) {
            return {error:error};
        }
    }

    async delete(id:string){
        try {
            const destroy = await Users.destroy({where:{id:id}})
            return destroy; 
        } catch (error) {
            return {error:error};
        }
    }

    async deleteImage(id:string,image:'primary' | 'secondary'){
        try {
            let destroy;
            if(image == 'primary'){
                destroy = await Users.update({image:''},{where:{id:id}})
            }else{
                destroy = await Users.update({secondImage:''},{where:{id:id}})
            }
            
            return destroy;
        } catch (error) {
            return {error:error};
        }
    }

    
}