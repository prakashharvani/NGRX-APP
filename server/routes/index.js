const express = require('express');

const router = express.Router();

const userController = require('../controller/userController');

router.post('/customers',userController.insertUser);

router.get('/customers',userController.getallUser);

router.get('/customers/:userId',userController.getUserById);

router.delete('/customers/delete/:userId',userController.deleteUserById);

router.put('/customers/update/:userId',userController.findByIdAndUpdate);

module.exports = router; 