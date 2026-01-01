import mongoose from "mongoose";

export const dbConnection = async () => {
    await mongoose.connect('mongodb+srv://khandurisakshi30:SakshiKhanduri3011@cluster0.hoops.mongodb.net/Zwiggy').then(() => console.log('DB connected'));
}

