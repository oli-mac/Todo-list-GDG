
const mongoose = require('mongoose');
const {Schema} = mongoose;

const TodoSchema = new Schema({
    text:{
        type: String,
        required: true
    },
    complete:{
        type: Boolean,
        required: false
    },
    note:{
        type: String,
        required: true
    },
    Collaborator:{
        type: String,
        required: false
    },
    label:{
        type: String,
        required: false
    },
    deadline:{
        type: String,
        required: false
    },
    timestamp:{
        type: String,
        default: Date.now()
    }
});

const Todo = mongoose.model('Todo', TodoSchema);
//  
module.exports = Todo;