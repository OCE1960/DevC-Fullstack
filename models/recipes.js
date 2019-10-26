const mongoose = require('mongoose');

//USER SCHEMA
const RecipeSchema  = mongoose.Schema({
    title: {
        type: String, required: true, index: { unique: true }
    },
    ingredients: {
        type: String, required: true 
    },
    instructions: {
        type: String, required: true
    },
    difficulty: {
        type: Number, required: true
    },
    time: {
        type: Number, required: true
    }

})

module.exports = mongoose.model('Recipe', RecipeSchema);