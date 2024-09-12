const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')
const cookieParser = require('cookie-parser')
const AwlModel = require('./models/AwlModel');
const updateAwlFormDataController = require('./controller/awlForm/updateAwlFormData')

const app = express()
const allowedOrigins = ['https://66bc56186652184c2bb2efba--teal-yeot-b589c2.netlify.app','https://teal-yeot-b589c2.netlify.app','http://localhost:3001','http://localhost:3000','http://localhost:3002','https://vercel-frontend-l3j4.vercel.app'];
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));


app.use(express.json())
app.use(cookieParser())

router.post('/update-gatepass', updateAwlFormDataController);

app.use("/api", router)

const PORT = process.env.PORT || 8080


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("connect to DB")
        console.log("Server is running" + PORT)
    })
})
