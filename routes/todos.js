const express = require('express')
const router = express.Router()
todosCtrl = require('../controllers/todos')

module.exports = router

router.use(require('../config/auth'));
router.post('/add', todosCtrl.add)
router.post('/delete', todosCtrl.del)
router.post('/search', todosCtrl.search)
router.post('/update/:id', todosCtrl.update)
router.get('/get', todosCtrl.getAll)