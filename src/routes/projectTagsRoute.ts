import { Request, Response, Router } from "express";
import projectTagsController from "../controller/projectTagsController";
import { httpOk,httpError } from "../utils/httpResponse";


const projectTagsRouter = Router()
const controller = new projectTagsController()

//getAll
projectTagsRouter.get('/',async (req:Request,res:Response)=>{
    const data = await controller.getAll()
    if(!(data as any).error){
        res.status(200).send(httpOk(data,200))
           }else{
                res.status(500).send(httpError(data,"SERVER_ERROR"))
           }
})

//create
projectTagsRouter.post('/',async (req:Request,res:Response)=>{
    const data = await controller.create(req.body)
    if(!(data as any).error){
        res.status(200).send(httpOk(data,200))
           }else{
                res.status(500).send(httpError(data,"SERVER_ERROR"))
           }
})

//delete
projectTagsRouter.delete('/:id',async (req:Request,res:Response)=>{ 
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
projectTagsRouter.put('/:id',async (req:Request,res:Response)=>{
    if(!req.params.id || !req.body)
        res.status(500).send('Missing paramas')

   const data = await controller.edit(req.body,req.params.id as string)

    if(!(data as any).error){
        
        res.status(200).send(httpOk({edits:(data as number[])[0],body:req.body},200))
    }else{
        res.status(500).send(httpError(data,"SERVER_ERROR"))
    }
})



export default projectTagsRouter;