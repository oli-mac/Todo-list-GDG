const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const app = express();
//stop crose origin errors
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/gdg-todo",{
    useNewUrlParser: true, 
	useUnifiedTopology: true
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(console.error);
//models
const Todo = require('./models/Todo');
//when we make a request to 3001 saying /todos it is going to find our todos
// using our models connectes to mongoose
app.get('/todos', async (req, res) => {
	const todos = await Todo.find();

	res.json(todos);
});

app.post('/todo/new', (req, res) => {
	const todo = new Todo({
		text: req.body.text,
		note: req.body.note,
		Collaborator: req.body.Collaborator,
		label: req.body.label,
		deadline: req.body.deadline,
	})

	todo.save();

	res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);

	res.json({result});
});


app.get('/todo/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.complete = !todo.complete;

	todo.save();

	res.json(todo);
})

// app.put('/todo/update/:id', async (req, res) => {

//  	const todo = await Todo.findById(req.params.id);
// 		todo.save({_id: {$eq: id}}, {$set:{text:req...}})
//

//  	todo.text = req.body.text;

//  	todo.save();

//  	res.json(todo);
// });

app.listen(3001, () => console.log("Server Waiting on port 3001"));
