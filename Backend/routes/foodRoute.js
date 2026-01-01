import express from 'express'
import multer from 'multer'

import { addItem, foodList,removeItem } from '../controllers/FoodController.js'

const FoodRouter = express.Router();

//Image storage Engine -> multer
const storage = multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage});

FoodRouter.post('/add',upload.single('image'), addItem);
FoodRouter.get('/list', foodList);
FoodRouter.delete('/remove/:id', removeItem);

export default FoodRouter