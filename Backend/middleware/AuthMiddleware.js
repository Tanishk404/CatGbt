import jwt from 'jsonwebtoken'


export const VerifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    console.log(authHeader)

    if(!authHeader){
        return res.status(401).json({
            message: 'No token provided'
        })
    }

    const token = authHeader.split(" ")[1]

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        req.userId = decoded.id

        console.log(req.userId)
        next()
    } catch (error) {
        res.status(401).json({
            message: "Invalid token"
        })
    }
}