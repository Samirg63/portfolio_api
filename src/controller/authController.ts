import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import dotenv from 'dotenv'

import userController from './userController'
import { validateEmail } from '../utils/helpers';
import { tokensModel, userModel } from "../db/models";

dotenv.config()

 interface IuserData{
    email:string,
    password:string
 }

 const user = new userController()
 

export default class authController{

    

    async login(data:IuserData){
        if(!data.email || !data.password){
            throw new Error('Missing Data')
        }
        
        const registeredUser = (await user.getAll() as any).dataValues
        const passwordCompare = await bcrypt.compare(data.password,registeredUser.password)
        
        
        if((registeredUser.email === data.email) && passwordCompare ){
            //Create a jsonWebToken
            const token = jwt.sign(data,process.env.WEBTOKEN_SECRET as string);
            return {token:token};
        }else{
            throw new Error("Credentials doesn't match!")
        }
    }

    async register(data:IuserData){
        if(!data.email || !data.password){
            throw new Error('Missing Data')
        }
        if(!validateEmail(data.email)){
            throw new Error('Invalide E-mail')
        }
        
        //Verify email
        try {
            //hash the password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password,saltRounds)


            const register = await user.create({
                email:data.email.toLowerCase(),
                password:hashedPassword,
                name:'Your name',
                subtitle:"A little description about you",
                image:""
            })
            return register;
        } catch (error) {
            throw error;
        }
        
        
    }

    decodeToken(token:string){     
        try {    
          return jwt.verify(token,process.env.WEBTOKEN_SECRET as string) as {email:string,password:string}
        } catch (error) {
            throw new Error('Invalid Token')
        }
   }

   async confirmPass(password:string){
        const registeredUser = (await user.getAll() as any).dataValues
        const passwordCompare = await bcrypt.compare(password,registeredUser.password)

        return passwordCompare;
   }

   async edit(body:{password?:string,email?:string}){
       try {
            const registeredUser = (await user.getAll() as any).dataValues
            //hash the password
            if(body.password){
                const saltRounds = 10;
                body.password = await bcrypt.hash(body.password,saltRounds)
            }
                
            const edit = await userModel.update(body,{where:{id:registeredUser.id}})
            return edit;
        } catch (error) {
            throw error;
        }

   }

   async generateToken(){
    const token = crypto.randomBytes(32).toString('hex');   
    const expire = new Date(Date.now() + 1000*60*15);
    const saltRounds = 10;
    const hashedToken = await bcrypt.hash(token,saltRounds)
    
    const insertToken = await tokensModel.create({
        token:hashedToken,
        expire:expire
    })


    return {token:token,id:insertToken.dataValues.id};
   }

   async verifyToken(body:{token:string,id:string}){
    
    const tokenData = await tokensModel.findOne({where:{id:body.id}});
    if(!tokenData){
        throw new Error('INVALID_TOKEN')
    }

    let success = false
    if(await bcrypt.compare(body.token,tokenData!.dataValues.token)  ){
        if(new Date()  <= tokenData!.dataValues.expire){
            success = true;
        }else{
            throw new Error('EXPIRED_TOKEN')
        }       
    }else{
        throw new Error('INVALID_TOKEN')
    }

    return {success:success}
   }

   async destroyToken(){
    try {
        const destroy = await tokensModel.destroy({where:{}});
        return destroy;
    } catch (error) {
        throw error;
    }
        
   }
}

