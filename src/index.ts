import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { HealthController } from './controller/healthController'

//Routers
import aboutRouter from './routes/aboutRoute'
import contactRouter from './routes/contactRoute'
import skillsRouter from './routes/skillsRoute'
import skillsGroupRouter from './routes/skillsGroupRoute'
import projectsRouter from './routes/projectsRoute'
import tagsRouter from './routes/tagsRoute'
import tagsGroupsRouter from './routes/tagsGroupRoute'
import userRouter from './routes/userRoute'
import authRouter from './routes/authRoute'
import filesRouter from './routes/filesRoute'

const app = express()
const port = 3000
const health = new HealthController();

let domain:string[] | string;

if((process.env.DOMAIN as string).includes('<>')){
    domain = (process.env.DOMAIN as string).split('<>')
}else{
    domain = process.env.DOMAIN as string
}

//middlewares
app.use(cors({origin:domain}))
app.use(bodyParser.json())

//Database
import { connection } from './db/connection'
  
(
    async()=>{
        try {
    await connection();
  } catch (err) {
    console.error(err);
  }
    }
)





//test Route
app.get('/',(req,res)=>{
    res.send('Hello World!')
})



//routes
app.use('/about',aboutRouter)
app.use('/contact',contactRouter)
app.use('/skills',skillsRouter)
app.use('/skillsGroup',skillsGroupRouter)
app.use('/projects',projectsRouter)
app.use('/tags',tagsRouter)
app.use('/tagsGroups',tagsGroupsRouter)
app.use('/user',userRouter)
app.use('/auth',authRouter)
app.use('/files',filesRouter)

//Health check

    app.get('/health',async (req: Request, res:Response)=>{
        try {
            let response = await health.verify();
            res.status(response.status).send(response.body)
        } catch (error) {
            res.status(200).send({
                backend:{
                    success:false
                }
            })
        }
    })

app.listen(port,()=>{
    console.log(`Server working on PORT ${port}`)
})

