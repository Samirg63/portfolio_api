import { Request, Response, Router } from "express";
import {httpOk,httpError} from '../utils/httpResponse'
import SkillsController from "../controller/skillsController";

const skillsRouter = Router()
const controller = new SkillsController()

//getAll
skillsRouter.get('/',async (req:Request,res:Response)=>{
    const data = await controller.getAll()
    if(!(data as any).error){
        res.status(200).send(httpOk(data,200))
   }else{
        res.status(500).send(httpError(data,"SERVER_ERROR"))
   }
})

//getByGroup
skillsRouter.get('/:groupId',async (req:Request,res:Response)=>{
    const data = await controller.getByGroupId(req.params.groupId as string)
    if(!(data as any).error){
        res.status(200).send(httpOk(data,200))
   }else{
        res.status(500).send(httpError(data,"SERVER_ERROR"))
   }
})

//create
skillsRouter.post('/',async (req:Request,res:Response)=>{
    const data = await controller.create(req.body)
    if(!(data as any).error){
        res.status(200).send(httpOk(data,200))
   }else{
        res.status(500).send(httpError(data,"SERVER_ERROR"))
   }
})

//delete
skillsRouter.delete('/:id',async (req:Request,res:Response)=>{ 
    if(!req.params.id)
        res.status(500).send('Missing paramas')

    const data = await controller.delete(req.params.id as string)
    if(!(data as any).error){
        res.status(200).send(httpOk({deletes:data},200))
   }else{
        res.status(500).send(httpError(data,"SERVER_ERROR"))
   }
})

//edit
skillsRouter.put('/order/:id',async (req:Request,res:Response)=>{
    if(!req.params.id || !req.body)
        res.status(500).send('Missing paramas')

   const data = await controller.changeOrder(req.params.id as string,req.body)

    if(!(data as any).error){       
        res.status(200).send(httpOk({edits:data},200))
    }else{
            res.status(500).send(httpError(data,"SERVER_ERROR"))
    }
})


skillsRouter.put('/:id',async (req:Request,res:Response)=>{
    if(!req.params.id || !req.body)
        res.status(500).send('Missing paramas')

   const data = await controller.edit(req.body,req.params.id as string)

    if(!(data as any).error){       
        res.status(200).send(httpOk({edits:(data as number[])[0],body:req.body},200))
    }else{
            res.status(500).send(httpError(data,"SERVER_ERROR"))
    }
})


export default skillsRouter;