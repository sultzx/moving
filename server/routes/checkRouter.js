import express from 'express'

const checkRouter = express.Router()

checkRouter.get('/', (req, res) => {
    try {
        res.status(200).json({
            message: 'Hello, Nazerke'
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
})

export default checkRouter