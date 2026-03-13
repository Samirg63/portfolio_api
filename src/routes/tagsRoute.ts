import { Request, Response, Router } from "express";
import tagsController from '../controller/tagsController'
import {httpError, httpOk} from '../utils/httpResponse'


const tagsRouter = Router()
const controller = new tagsController()

//getAll
tagsRouter.get('/',async (req:Request,res:Response)=>{
    const data = await controller.getAll()
    if(!(data as any).error){
        res.status(200).send(httpOk(data,200))
   }else{
    res.status(500).send(httpError(data,"SERVER_ERROR"))
   }
})

//search
tagsRouter.post('/search',async (req:Request,res:Response)=>{
    if(!req.body.search){
        res.status(500).send(httpError('Missing params',"MISSING_PARAMS"))
    }
    const data = await controller.searchTag(req.body.search)
    if(!(data as any).error){
        res.status(200).send(httpOk(data,200))
   }else{
    res.status(500).send(httpError(data,"SERVER_ERROR"))
   }
})

//getByGroupId
tagsRouter.get('/:groupId',async (req:Request,res:Response)=>{
    const data = await controller.getByGroupId(req.params.groupId as string)
    if(!(data as any).error){
        res.status(200).send(httpOk(data,200))
   }else{
    res.status(500).send(httpError(data,"SERVER_ERROR"))
   }
})

//create
tagsRouter.post('/',async (req:Request,res:Response)=>{
    const data = await controller.create(req.body)
    if(!(data as any).error){
        res.status(200).send(httpOk(data,200))
   }else{
    res.status(500).send(httpError(data,"SERVER_ERROR"))
   }
})

//delete
tagsRouter.delete('/:id',async (req:Request,res:Response)=>{ 
    if(!req.params.id)
        res.status(500).send('Missing paramas')

    const data = await controller.delete(req.params.id as string)
    if(!(data as any).error){
        res.status(200).send(httpOk(data,200))
   }else{
    res.status(500).send(httpError(data,"SERVER_ERROR"))
   }
})

//edit
tagsRouter.put('/:id',async (req:Request,res:Response)=>{
    if(!req.params.id || !req.body)
        res.status(500).send('Missing paramas')

   const data = await controller.edit(req.body,req.params.id as string)

    if(!(data as any).error){
        res.status(200).send(httpOk({edits:(data as number[])[0],body:req.body},200))
   }else{
    res.status(500).send(httpError(data,"SERVER_ERROR"))
   }
})

export default tagsRouter;