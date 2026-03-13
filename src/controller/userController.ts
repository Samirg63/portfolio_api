import {userModel} from '../db/models'


export default class userController{

     async getAll(){
        try {
            const data = await userModel.findAll()
            return data[0]; 
        } catch (error:any) {
            return {error:error.message};
        }
    }

    async getByKey(key:string){
        try {
            const data = await userModel.findAll({
                attributes:[key]
            })
            return data[0];
        } catch (error:any) {
            return {error:error.message};
        }
    }

    async create(data:any){
        try {
            const add = await userModel.create(data)
            return add; 
        } catch (error) {
            throw error
        }
    }

    async edit(data:any,id:string){
        try {
            const edit = await userModel.update(data,{where:{id:id}})
            return edit; 
        } catch (error) {
            return {error:error};
        }
    }

    async delete(id:string){
        try {
            const destroy = await userModel.destroy({where:{id:id}})
            return destroy; 
        } catch (error) {
            return {error:error};
        }
    }

    async deleteImage(id:string,image:'primary' | 'secondary'){
        try {
            let destroy;
            if(image == 'primary'){
                destroy = await userModel.update({image:''},{where:{id:id}})
            }else{
                destroy = await userModel.update({secondImage:''},{where:{id:id}})
            }
            
            return destroy;
        } catch (error) {
            return {error:error};
        }
    }

    
}