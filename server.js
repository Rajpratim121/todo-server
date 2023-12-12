const express = require('express');

const app = express()
app.use(express.urlencoded({ extended: true }))

const todoList = [
  {
    id: 1,
    text: 'paint a piture',
    completed: false
  },
  {
    id: 2,
    text: 'cook food',
    completed: true
  }
];

// const ErrorHandler = (err, req, res, next) => {
//   const errStatus = err.statusCode || 500
//   const errMsg = err.message || 'something went wrong'
//   res.status(errStatus).json({
//     success: false,
//     status: errStatus,
//     message: errMsg,
//     stack: err.stack
//   })
// }
// app.use(ErrorHandler)

app.get('/todo', (req, res) => {
  res.json(todoList)
})

app.get('/todo/:id', (req, res) => {
  const todoItem = todoList.find(item => item.id === parseInt(req.params.id))
  res.json(todoItem)
})
app.post('/todo', (req, res) => {
  if (!req.body.text || req.body.text === "") {
    return res.status(404).json({ Error: "Text Field is Empty" })
  }
  const todoItem = {
    id: todoList.length + 1,
    text: req.body.text,
    completed: false
  }
  todoList.push(todoItem)
  res.status(201).json(todoList)
})

app.patch('/todo/:id', (req, res, next) => {
  const todoItem = todoList.find(item => item.id === parseInt(req.params.id))
  if (!todoItem) return res.status(404).json({ Error: "Todo Not Found" })
  if (req.body.completed !== undefined) {
    todoItem.completed = JSON.parse(req.body.completed)
  }
  if (req.body.text != undefined && req.body.text != "") {
    todoItem.text = req.body.text
  }
  res.json(todoItem)
})

app.delete('/todo/:id', (req, res) => {
  const itemIndex = todoList.findIndex(item => item.id === parseInt(req.params.id))
  todoList.splice(itemIndex, 1)
  res.json(todoList)
})

app.listen(8080)
