import { Request, Response, Router } from "express";
import { httpError, httpOk } from "../utils/httpResponse";
import upload from "../middlewares/multer";
import cloudinary from "../db/cloudinary";

const filesRouter = Router()

const maximumFileSize:number = 10485760


filesRouter.post('/upload',upload.single('file'),(req:Request,res:Response)=>{
    if(req.file!.size > maximumFileSize){
        res.status(500).send(httpError('File size is too large','FILE_TOO_LARGE'))
        return;
    }

    cloudinary.uploader.upload(req.file!.path,{asset_folder:'portfolio',resource_type:'auto'},(err,result)=>{
        if(err){ 
            res.status(500).send(httpError(err,'UPLOAD_ERROR'))
        }else{
            res.status(200).send(httpOk({url:result!.secure_url,id:result!.public_id},200))
        }
    })
})

filesRouter.post('/uploadMany',upload.any(),async (req:Request,res:Response)=>{
    try {
        const resultData:Promise<{url:string,id:string} | {error:string}>[] = (req.files as []).map(async (file:{path:string,size:number})=>{
            if(file.size < maximumFileSize){
                const result = await cloudinary.uploader.upload(file.path,{asset_folder:'portfolio'})
                return {url:result!.secure_url,id:result!.public_id}
            }else{
                return {error:'FILE_TOO_LARGE'}
            }
            
        })
        res.status(200).send(httpOk(await Promise.all(resultData),200))
    } catch (err:unknown) {
        
        res.status(500).send(httpError(err,'UPLOAD_ERROR'))
    }
})

filesRouter.post('/destroy/:id',async (req:Request,res:Response)=>{
    //check the file type
    let type;
    if((req.params.id as string).split('.').length > 1){
        type = 'raw'
    }else{
        type = 'image'
    }

    

    cloudinary.uploader.destroy(req.params.id as string,{resource_type:type}).then((result)=>{
        if(result.result == 'not found'){
            throw new Error('FILE_NOT_FOUND')
        }
        res.status(200).send(httpOk(result,200))
    })
    .catch((err)=>{
        if(typeof err.message == 'string'){
             res.status(500).send(httpError(err,err.message))
        }else{
            res.status(500).send(httpError(err,'DESTROY_ERROR'))
        }
    })
})

filesRouter.post('/destroyMany',async (req:Request,res:Response)=>{
    const filesToDestroy:{url:string,id:string}[] = req.body.files;

    
    
    

    try {
        const promisses:Promise<any>[] = []
        filesToDestroy.map((file)=>{
            
            promisses.push(cloudinary.uploader.destroy(file.id))
        })
        
        await Promise.all(promisses)
        .then((result)=>{
                result.map((response)=>{
                    if(response.result == 'not found'){
                    throw new Error('FILE_NOT_FOUND')
                }
            })    
            res.status(200).send(httpOk(result,200))
        })
        .catch((err)=>{          
            throw err
        })
    } catch (error:any) {
        if(typeof error.message == 'string'){
                res.status(500).send(httpError(error,error.message))
            }else{
                res.status(500).send(httpError(error,'DESTROY_ERROR'))
            }
    }
        
    

})




export default filesRouter;