import {hardskillsModel} from '../db/models'
import { Op } from 'sequelize';

export default class hardskillsController{

     async getAll(){
        try {
            const data = await hardskillsModel.findAll()
            return data; 
        } catch (error) {
            return {error:error};
        }
    }

    async getByGroupId(id:string){
        try {
            const data = await hardskillsModel.findAll({where:{hardskillsGroupId:id},order:[['order','ASC']]})
            return data; 
        } catch (error) {
            return {error:error};
        }
    }

    async create(data:any){
        try {
            const add = await hardskillsModel.create(data)

            //set Order to last
            const lastOrder = (await hardskillsModel.findOne({attributes:['order'],order:[['order','DESC']],where:{hardskillsGroupId:add.dataValues.hardskillsGroupId}}))?.dataValues.order | -1;
            
            await this.edit({order:lastOrder!+1},add.dataValues.id)

            add.dataValues.order = lastOrder!+1;
            return add; 
        } catch (error) {
            return {error:error};
        }
    }

    async edit(data:any,id:string){
        try {
            const edit = await hardskillsModel.update(data,{where:{id:id}})
            return edit; 
        } catch (error) {
            return {error:error};
        }
    }

    async changeOrder(id:string,body:{newIndex:number,oldIndex:number,groupId:number}){
        //incremente all the items after the selected item
        try {
            
            if(body.oldIndex < body.newIndex){
                //Desceu
                await hardskillsModel.increment({order:-1},{where:
                    {order:{[Op.lte]:body.newIndex,[Op.gte]:body.oldIndex},hardskillsGroupId:body.groupId}
                })
                
            }else{
                //subiu
                await hardskillsModel.increment({order:1},{where:
                    {order:{[Op.gte]:body.newIndex,[Op.lte]:body.oldIndex},hardskillsGroupId:body.groupId}
                })
                
            }          
               const edit = await hardskillsModel.update({order:body.newIndex},{where:{id:id}})
               return edit;
        } catch (error) {
            return {error:error};
        }
    }

    async delete(id:string){
        try {
            const order = (await hardskillsModel.findOne({attributes:['order'],where:{id:id}}))?.dataValues.order        
            const destroy = await hardskillsModel.destroy({where:{id:id}})
            await hardskillsModel.increment({order:-1},{where:{order:{[Op.gt]:order}}})
            return destroy; 
        } catch (error) {
            return {error:error};
        }
    }
}