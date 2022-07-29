const Todo = require('../models/todo')
const mongoose = require('mongoose')

module.exports = {
    add,
    del,
    search,
    getAll,
    update
}

async function add(req, res){
    try {
        let newTodo = await Todo.create({ task: req.body.task, user: req.user._id });
        res.status(200).json(newTodo);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function del(req, res){
    try {
        let result = await Todo.deleteMany({ _id: req.body.deleteTodos });
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function search(req, res){
    try {
        let todos= await Todo.find({})
        todos = todos.filter(s=>~s.task.toUpperCase().indexOf(req.body.search.toUpperCase()))
        res.status(200).json(todos);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function update(req, res){
    try {
        let updateTodo= await Todo.updateOne({_id: req.params.id}, {task: req.body.task})
        res.status(200).json(updateTodo);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function getAll(req, res){
    try {
        let todos= await Todo.find({user: req.user._id})
        res.status(200).json(todos);
    } catch (err) {
        res.status(400).json(err);
    }
}