import {hardskillsGroupsModel} from '../db/models'
import { hardskillsModel } from '../db/models';

export default class hardskillsGroupsController{

     async getAll(){
        try {
            const groups = (await hardskillsGroupsModel.findAll()).map((data)=>data.dataValues)
            const skills = (await hardskillsModel.findAll({order:[['order',"ASC"]]})).map((data)=>data.dataValues);
            
            
            const skillsMap = skills.reduce((acc,skill)=>{
                if(!acc[skill.hardskillsGroupId]){
                    acc[skill.hardskillsGroupId] = [];
                }

                acc[skill.hardskillsGroupId].push(skill);
                return acc;
            },{})

            const result = groups.map((group)=>({
                ...group,
                hardskills:skillsMap[group.id] || []
            }))


            return result; 
        } catch (error) {
            return {error:error};
        }
    }

    async create(data:any){
        console.log(data)
        try {
            const add = await hardskillsGroupsModel.create(data)
            return add; 
        } catch (error) {
            return {error:error};
        }
    }

    async edit(data:any,id:string){
        try {
            const edit = await hardskillsGroupsModel.update(data,{where:{id:id}})
            return edit; 
        } catch (error) {
            return {error:error};
        }
    }

    async delete(id:string){
        try {
            const skillDestroy = await hardskillsModel.destroy({where:{hardskillsGroupId:id}})    
            const destroy = await hardskillsGroupsModel.destroy({where:{id:id}})
  
            return {groupDestroy:destroy,skillsDestroy:skillDestroy};      
        } catch (error) {
            return {error:error};
        }
    }

    async deleteSkillsFromGroup(groupId:string){
        try {
            const deleteAllSkills = await hardskillsModel.destroy({where:{tagGroupId:groupId}})
            return deleteAllSkills;
        } catch (error) {
            return {error:error};
        }
    }
}