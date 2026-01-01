import express from 'express';
import cors from 'cors';
import { dbConnection } from './config/db.js';
import FoodRouter from './routes/foodRoute.js';
import userRouter from './routes/UserRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import dotenv from "dotenv";
dotenv.config();


const app = express();


//middlewares
app.use(express.json());
app.use(cors());


//DB 
dbConnection();

//api Endpoints
app.use('/api/food', FoodRouter)
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter)
app.get('/', (req, res) => {
    res.send('API Working :)')

})
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server started on port ${port}`)
)

