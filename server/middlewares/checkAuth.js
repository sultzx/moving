import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if (token) {
        try {
            const decoded = jwt.verify(token, "Q1w2e3r4t5y6")
            req.userId = decoded._id
            next()
        } catch (error) {
            res.status(403).json({
                message: 'Рұқсат жоқ!'
            })
        }
    } else {
        res.status(403).json({
            message: 'Рұқсат жоқ!'
        })
    }
}