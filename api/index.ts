import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

//Routers
import aboutRouter from './routes/aboutRoute'
import contactRouter from './routes/contactRoute'
import hardskillsRouter from './routes/hardskillsRoute'
import hardskillsGroupsRouter from './routes/hardskillsGroupsRoute'
import projectsRouter from './routes/projectsRoute'
import tagsRouter from './routes/tagsRoute'
import tagsGroupsRouter from './routes/tagsGroupsRoute'
import userRouter from './routes/userRoute'
import authRouter from './routes/authRoute'
import filesRouter from './routes/filesRoute'

const app = express()
const port = 3000
const domain:string = 'http://localhost:5173'

//middlewares
app.use(cors({origin:domain}))
app.use(bodyParser.json())

//Database
import { connection } from './db/sqlite'
connection()



//test Route
app.get('/',(req,res)=>{
    res.send('Hello World!')
})

//routes
app.use('/about',aboutRouter)
app.use('/contact',contactRouter)
app.use('/hardskills',hardskillsRouter)
app.use('/hardskillsGroups',hardskillsGroupsRouter)
app.use('/projects',projectsRouter)
app.use('/tags',tagsRouter)
app.use('/tagsGroups',tagsGroupsRouter)
app.use('/user',userRouter)
app.use('/auth',authRouter)
app.use('/files',filesRouter)

app.listen(port,()=>{
    console.log(`Server working on PORT ${port}`)
})

