import Food from "../models/Food.js";
import fs from 'fs'

const addItem = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const food = new Food({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    })
    try {
        await food.save();
        res.json({ success: true, message: 'Food Item Added' });
    } catch (error) {
        console.log(error);
        res.json({ success: true, message: 'Error' });
    }

}

const foodList = async (req, res) => {
    try {
        const foods = await Food.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' })
    }
}

const removeItem = async (req, res) => {
    try {
        const id = req.params.id;
        const food = await Food.findById(id);
        if (food) {
            fs.unlink(`uploads/${food.image}`, () => {});
            await Food.findByIdAndDelete(id);
            res.json({ success: true, message: 'Food Item removed' })
        }
    } catch (error) {
        console.log(error);

        res.json({ success: false, message: 'Error' })
    }
}

export { addItem, foodList, removeItem }