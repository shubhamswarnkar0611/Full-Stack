const express = require('express');
const trackerController= require('../controller/tracker');

const router = express.Router();


router.post('/add-expense',trackerController.addExpense)
router.get('/get-expense',trackerController.getExpenses)
router.post('/delete-expense',trackerController.deleteExpense)
router.put('/edit-expense',trackerController.editExpense)

module.exports = router; 