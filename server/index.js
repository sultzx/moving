import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import userRouter from './routes/auth.routes.js'
import uploadRouter from './routes/upload.routes.js'
import newsRouter from './routes/news.routes.js'
import orderRouter from './routes/order.routes.js'
import commentRouter from './routes/comment.routes.js'

const app = express()

const PORT = 5000

app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use('/images', express.static('images'))
app.use(cors())

const start = async () => {
    try {
        await mongoose.set('strictQuery', true)
        await mongoose.connect("mongodb+srv://bunny:hxiohRalC6rtEpcp@cluster0.ja1ehfb.mongodb.net/movingDB?authMechanism=DEFAULT")
        console.log(`database OK\tname: ${mongoose.connection.name}`)
    } catch (error) {
        console.log(`database ERROR\tcodename: ${error.message}`)
    }
    app.use('/', express.Router().get('/', (req, res) => {
        try {
            res.status(200).send('<h3 style="color: blue; margin: 24px auto;" class="text-center">Moving компаниясы сервері сәтті қосылды!</h3>')
        } catch (error) {
            res.status(500).send(error.message)
        }
    }))
    app.use('/api/auth', userRouter)
    app.use('/api/news', newsRouter)
    app.use('/api/upload', uploadRouter)
    app.use('/api/order', orderRouter)
    app.use('/api/comment', commentRouter)

    app.listen(PORT, (error) => {
        if(error) {
            console.log(`server ERROR`)
        }
        console.log(`server OK\tport: ${PORT}`)
    })
}

start()
