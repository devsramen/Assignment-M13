const express = require('express');
const UserController=require('../controllers/UserController');
const AuthMiddleware = require('../middlewares/AuthMiddleware')
const router = express.Router();


router.post('/registration',UserController.registration);
router.post('/login',UserController.login);
router.get('/RecoverVerifyEmail/:email',UserController.verifyEmail);



//After login
router.get('/profileDetails',AuthMiddleware,UserController.profileDetails);
router.post('/profileUpdate',AuthMiddleware,UserController.profileUpdate);

router.get('/RecoverVerifyOTP/:email/:otp',UserController.verifyOTP);
router.get('/RecoverResetPass/:email/:otp/:password',UserController.passwordReset);

module.exports=router;