import { Request, Response, Router } from "express";
import authController from "../controller/authController";
import { httpOk,httpError } from "../utils/httpResponse"; 
import dotenv from 'dotenv'
dotenv.config();


const authRouter = Router()
const controller = new authController()

//login
authRouter.post('/login',async (req:Request,res:Response)=>{
    
    const token = req.headers.authorization?.split(' ')[1]
    console.log(req.headers.authorization)

    if((req.body?.email && req.body?.password) || token){
        
        try {
            let log;
            if(token){
                const decode = controller.decodeToken(token)   
                log = await (controller.login({
                    email:decode.email,
                    password:decode.password
                }))
                
            }else{
                log = await controller.login(req.body)
            }
            res.status(200).send(httpOk(log,200))
            
        } catch(e:any){
            res.status(500).send(httpError(e.message,"CREDENTIALS_DOESN'T_MATCH"))
        }
    }else{
     res.status(400).send({statusCode:"MISSING_DATA",message:'Missing Data'})   
    }
})

//register
authRouter.post('/register',async (req:Request,res:Response)=>{
    if(!req.body.email || !req.body.password){
        res.status(400).send(httpError('Missing data','MISSING_DATA'))
    }

    try {
        const log = await controller.register(req.body)
        res.status(200).send(httpOk(log,200))
        
    } catch(e:any){
        res.status(500).send(httpError(e.message,"SERVER_ERROR"))
    }
})

//confirmPassword
authRouter.post('/confirmPass',async (req:Request,res:Response)=>{
    try {
        const log = await controller.confirmPass(req.body.password)
        res.status(200).send(httpOk(log,200))
        
    } catch(e:any){
        res.status(500).send(httpError(e.message,"WRONG_PASSWORD"))
    }
})

//EditUser
authRouter.put('/edit',async (req:Request,res:Response)=>{
    try {
        const edit = await controller.edit(req.body)
        res.status(200).send(httpOk(edit,200))
        
    } catch(e:any){
        res.status(500).send(httpError(e.message,"SERVER_ERROR"))
    }
})

//Forgot Password
authRouter.post('/forgotPassword',async (req:Request,res:Response)=>{
    try {
        if(req.body.secretCode !== process.env.ADMIN_SECRET_CODE){
            throw new Error('WRONG_CODE')
        }

        const token = await controller.generateToken()
        res.status(200).send(httpOk(token,200))
        
    } catch(e:any){
        if(e.message == 'WRONG_CODE'){
            res.status(500).send(httpError('Wrong admin code',e.message))
        }else{
            res.status(500).send(httpError(e.message,"SERVER_ERROR"))
        }
    }
})

//verifyToken
authRouter.post('/verifyToken',async (req:Request,res:Response)=>{
    try {
        const token = await controller.decodeToken(req.body)
        res.status(200).send(httpOk(token,200))
        
    } catch(e:any){
        if(e.message == 'INVALID_TOKEN'){
            
            res.status(500).send(httpError("Token inválido!",e.message))
        }else if(e.message == 'EXPIRED_TOKEN'){
            
            res.status(500).send(httpError("Token expirou!",e.message))
        }else{
            res.status(500).send(httpError(e.message,'SERVER_ERROR'))
        }

    }
})

//destroyToken
authRouter.delete('/token',async (req:Request,res:Response)=>{
    try {
        const token = await controller.destroyToken()
        res.status(200).send(httpOk(token,200))      
    } catch(e:any){
            res.status(500).send(httpError(e.message,'SERVER_ERROR'))
    }
})






export default authRouter;