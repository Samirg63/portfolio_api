import type {IHealthFullResponse} from '../types/IHealthResponse'
import dotenv from 'dotenv'
import { connection } from '../db/connection'
import { httpOk } from '../utils/httpResponse'


dotenv.config()

export class HealthController{
    async verify(){
        let response:IHealthFullResponse = {
            backend:{success:true}
        }

        //Frontend verify
        
        await fetch(process.env.DOMAIN as string,{
            method:"GET"
        }).then(()=>{
            response = {
                ...response,
                frontend:{
                    success:true
                }
            }
        }).catch((e)=>{
            response = {
                ...response,
                frontend:{
                    success:false,
                    error:{
                        statusCode:503
                    }
                }
            }
        })

        //Database verify
        try {
            await connection();
            response = {
                ...response,
                database:{
                    success:true
                }
            }
        } catch (error:unknown) {
            response = {
                ...response,
                database:{
                    success:false,
                    error:{
                        statusCode:(error as {status:number}).status || 503
                    }
                }
            }
        }
        
        
        
        
        

        return httpOk(response,200);
    }
}