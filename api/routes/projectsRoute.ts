import { Request, Response, Router } from "express";
import projectsController from "../controller/projectsController";
import { projectTagsModel } from "../db/models";
import { httpOk,httpError } from "../utils/httpResponse";


const projectsRouter = Router()
const controller = new projectsController()

//getAll
projectsRouter.get('/',async (req:Request,res:Response)=>{
    const data = await controller.getAll()
    if(!(data as any).error){
        res.status(200).send(httpOk(data,200))
           }else{
                res.status(500).send(httpError(data,"SERVER_ERROR"))
           }
})

//GetByTags
projectsRouter.post('/byTags',async (req:Request,res:Response)=>{
    const data = await controller.getProjectByTags(req.body.ids)
    if(!(data as any).error){
        res.status(200).send(httpOk(data,200))
    }else{
        res.status(500).send(httpError(data,"SERVER_ERROR"))
    }
})

//create
projectsRouter.post('/',async (req:Request,res:Response)=>{
    const data = await controller.create(req.body)

    console.log(data)
    if(!(data as any).error){
        res.status(200).send(httpOk(data,200))
    }else{
        res.status(500).send(httpError(data,"SERVER_ERROR"))
    }
})

//delete
projectsRouter.delete('/:id',async (req:Request,res:Response)=>{ 
    if(!req.params.id)
        res.status(500).send('Missing paramas')

    const destroy = await controller.delete(req.params.id as string)
    let destroyChildrens = 0;
    if(destroy){
        destroyChildrens = await projectTagsModel.destroy({where:{projectId:req.params.id}})
    }
    if(!(destroy as any).error){  
        res.status(200).send(httpOk({deletes:destroy,chidrends:destroyChildrens},200))
    }else{
        res.status(500).send(httpError({deletes:destroy,chidrends:destroyChildrens},"SERVER_ERROR"))
    }
})

//edit
projectsRouter.put('/:id',async (req:Request,res:Response)=>{
    if(!req.params.id || !req.body)
        res.status(500).send('Missing paramas')

   const data = await controller.edit(req.body,req.params.id as string)

    if(!(data as any).error){
        
        res.status(200).send(httpOk({edits:(data as number[])[0],body:req.body},200))
    }else{
        res.status(500).send(httpError(data,"SERVER_ERROR"))
    }
})

export default projectsRouter;