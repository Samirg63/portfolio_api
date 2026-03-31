import { Op } from 'sequelize';

import db from '../models/index.cjs'
const Skills = db.Skills


export default class SkillsController{

     async getAll(){
        try {
            const data = await Skills.findAll()
            return data; 
        } catch (error) {
            return {error:error};
        }
    }

    async getByGroupId(id:string){
        try {
            const data = await Skills.findAll({where:{groupId:id},order:[['order','ASC']]})
            return data; 
        } catch (error) {
            return {error:error};
        }
    }

    async create(data:any){
        try {
            const add = await Skills.create(data)

            //set Order to last
            const lastOrder = (await Skills.findOne({
                attributes:['order','id'],
                order:[['order','DESC']],
                where:{groupId:add.dataValues.groupId}})).dataValues;
                
                if(lastOrder.order && add.dataValues.id !== lastOrder.id){
                    //Define como ultimo da fila (não faz isso caso o ultimo seja o elemento recem adicionado)
                    await this.edit({order:lastOrder.order!+1},add.dataValues.id)
                    add.dataValues.order = lastOrder.order!+1;
                }
            
            return add; 
        } catch (error) {
            return {error:error};
        }
    }

    async edit(data:any,id:string){
        try {
            const edit = await Skills.update(data,{where:{id:id}})
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
                await Skills.increment({order:-1},{where:
                    {order:{[Op.lte]:body.newIndex,[Op.gte]:body.oldIndex},groupId:body.groupId}
                })
                
            }else{
                //subiu
                await Skills.increment({order:1},{where:
                    {order:{[Op.gte]:body.newIndex,[Op.lte]:body.oldIndex},groupId:body.groupId}
                })
                
            }          
               const edit = await Skills.update({order:body.newIndex},{where:{id:id}})
               return edit;
        } catch (error) {
            return {error:error};
        }
    }

    async delete(id:string){
        try {
            const order = (await Skills.findOne({attributes:['order'],where:{id:id}}))?.dataValues.order        
            const destroy = await Skills.destroy({where:{id:id}})
            await Skills.increment({order:-1},{where:{order:{[Op.gt]:order}}})
            return destroy; 
        } catch (error) {
            return {error:error};
        }
    }
}