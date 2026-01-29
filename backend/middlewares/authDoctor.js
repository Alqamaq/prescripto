import jwt from 'jsonwebtoken'

// Doctor authetication middleware

const authDoctor = async (req, res, next) => {
    try {
        const { dtoken } = req.headers

        if (!dtoken) {
            return res.json({ success: false, message: "Not Authorized Login" })
        }

        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
       // console.log(token_decode);
       if (!req.body) {
            req.body = {}
        }
        
        req.body.docId = token_decode.id
        
        next()


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export default authDoctor;