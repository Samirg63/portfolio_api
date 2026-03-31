
import db from '../models/index.cjs'
const Skills = db.Skills
const SkillsGroups = db.SkillsGroups


export default class SkillsGroupsController{

     async getAll(){
        try {
            const groups = (await SkillsGroups.findAll({order:[['id','ASC']]})).map((data)=>data.dataValues)
            const skills = (await Skills.findAll({order:[['order',"ASC"]]})).map((data)=>data.dataValues);
            
            
            const skillsMap = skills.reduce((acc,skill)=>{
                if(!acc[skill.groupId]){
                    acc[skill.groupId] = [];
                }

                acc[skill.groupId].push(skill);
                return acc;
            },{})


            const result = groups.map((group)=>({
                ...group,
                skills:skillsMap[group.id] || []
            }))


            return result; 
        } catch (error) {
            return {error:error};
        }
    }

    async create(data:any){
        
        try {
            const add = await SkillsGroups.create(data)
            return add; 
        } catch (error) {
            return {error:error};
        }
    }

    async edit(data:any,id:string){
        try {
            const edit = await SkillsGroups.update(data,{where:{id:id}})
            return edit; 
        } catch (error) {
            return {error:error};
        }
    }

    async delete(id:string){
        try { 
            const destroy = await SkillsGroups.destroy({where:{id:id}})
            return {groupDestroy:destroy};      
        } catch (error) {
            return {error:error};
        }
    }

    async deleteSkillsFromGroup(groupId:string){
        try {
            const deleteAllSkills = await Skills.destroy({where:{groupId:groupId}})
            return deleteAllSkills;
        } catch (error) {
            return {error:error};
        }
    }
}