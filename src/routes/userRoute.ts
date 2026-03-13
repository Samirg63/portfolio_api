import { Request, Response, Router } from "express";
import userController from "../controller/userController";
import {httpError, httpOk} from '../utils/httpResponse'


const userRouter = Router()
const controller = new userController();


//getByKey
userRouter.get('/:key',async(req:Request,res:Response)=>{
    const data = await controller.getByKey(req.params.key as string)
    if(!(data as any).error){
        res.status(200).send(httpOk(data,200))
   }else{
    res.status(500).send(httpError(data,'SERVER_ERROR'))
   }
})

//getAll
userRouter.get('/',async (req:Request,res:Response)=>{
    const data = await controller.getAll()
    if(!(data as any).error){
        res.status(200).send(httpOk(data,200))
   }else{
    res.status(500).send(httpError(data,'SERVER_ERROR'))
   }
})

//create
userRouter.post('/',async (req:Request,res:Response)=>{
    const data = await controller.create(req.body)
    if(!(data as any).error){
        res.status(200).send(httpOk(data,200))
   }else{
    res.status(500).send(httpError(data,'SERVER_ERROR'))
   }
})

//delete
userRouter.delete('/:id',async (req:Request,res:Response)=>{ 
    if(!req.params.id)
        res.status(500).send(httpError('Missing params',"MISSING_PARAMS"))

    const data = await controller.delete(req.params.id as string)
    if(!(data as any).error){
        res.status(200).send(httpOk({deletes:data},200))
   }else{
    res.status(500).send(httpError(data,'SERVER_ERROR'))
   }
})

//deleteImage
userRouter.delete('/image/:id',async (req:Request,res:Response)=>{
    if(!req.params.id)
        res.status(500).send(httpError('Missing params',"MISSING_PARAMS"))

    const data = await controller.deleteImage(req.params.id as string,req.query.image as 'primary' | 'secondary')
    if(!(data as any).error){
        res.status(200).send(httpOk({deletes:data},200))
   }else{
    res.status(500).send(httpError(data,'SERVER_ERROR'))
   }
})

//edit
userRouter.put('/:id',async (req:Request,res:Response)=>{
    if(!req.params.id || !req.body)
        res.status(500).send(httpError('Missing params',"MISSING_PARAMS"))

   const data = await controller.edit(req.body,req.params.id as string)

    if(!(data as any).error){
        res.status(200).send(httpOk(data,200))
   }else{
    res.status(500).send(httpError(data,'SERVER_ERROR'))
   }
})

export default userRouter;