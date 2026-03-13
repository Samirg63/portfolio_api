import { Request, Response, Router } from "express";
import aboutController from "../controller/aboutController";
import { httpError, httpOk } from "../utils/httpResponse";


const aboutRouter = Router()
const controller = new aboutController()

//getAll
aboutRouter.get('/',async (req:Request,res:Response)=>{
    const data = await controller.getAll()
    if(!(data as any).error){
        res.status(200).send(httpOk(data,200))
    }else{
        res.status(500).send(httpError(data,'SERVER_ERROR'))
    }
})

//getByKey
aboutRouter.get('/:key',async(req:Request,res:Response)=>{
    const data = await controller.getByKey(req.params.key as string)
    if(!(data as any).error){
        res.status(200).send(httpOk(data,200))
   }else{
    res.status(500).send(httpError(data,'SERVER_ERROR'))
   }
})

//create
aboutRouter.post('/',async (req:Request,res:Response)=>{
    const data = await controller.create(req.body)
    if(!(data as any).error){
        res.status(200).send(httpOk(data,200))
    }else{
        res.status(500).send(httpError(data,'SERVER_ERROR'))
    }
})

//delete
aboutRouter.delete('/:id',async (req:Request,res:Response)=>{ 
    if(!req.params.id)
        res.status(500).send('Missing paramas')

    const data = await controller.delete(req.params.id as string)
    if(!(data as any).error){
        res.status(200).send(httpOk({deletes:data},200))
    }else{
        res.status(500).send(httpError(data,'SERVER_ERROR'))
    }
})

//deleteImage
aboutRouter.delete('/image/:id',async (req:Request,res:Response)=>{
    if(!req.params.id)
        res.status(500).send(httpError('Missing params',"MISSING_PARAMS"))

    const data = await controller.deleteImage(req.params.id as string)
    if(!(data as any).error){
        res.status(200).send(httpOk({deletes:data},200))
   }else{
    res.status(500).send(httpError(data,'SERVER_ERROR'))
   }
})

//edit
aboutRouter.put('/:id',async (req:Request,res:Response)=>{
    if(!req.params.id || !req.body)
        res.status(500).send('Missing paramas')

   const data = await controller.edit(req.body,req.params.id as string)

    if(!(data as any).error){     
        res.status(200).send(httpOk({edits:(data as number[])[0],body:req.body},200))
    }else{
        res.status(500).send(httpError(data,'SERVER_ERROR'))
    }
})



export default aboutRouter;