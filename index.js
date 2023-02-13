import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'

import userRoutes from './routes/userRoutes.js'
import studentsRoutes from './routes/studentsRouters.js'

const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

app.get('/', (req, res) => {

    res.send('api working properly')
})


app.use('/user', userRoutes)
app.use('/student', studentsRoutes)


const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {

    console.log('DB Connected Succesfully');
    app.listen(PORT, () => {

        console.log(`Server is running on port ${PORT}`);
    })
}).catch((error) => {

    console.log(error.message);
})
