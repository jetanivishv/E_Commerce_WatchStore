import express from 'express';
import {forgotPasswordController,loginController, testController,registerController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

//router object
const router = express.Router();

//routing

//REGISTER || METHOD POST
router.post('/register',registerController);

//lOGIN || METHOD POST
router.post('/login',loginController);

//test routes
router.get('/test',requireSignIn,isAdmin,testController);

//protected user-route auth
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});

//protected Admin-route auth
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
});

//Forgot password || POST
router.post('/forgot-password',forgotPasswordController);

router.put('/profile',requireSignIn,updateProfileController)

router.get("/orders", requireSignIn, getOrdersController);

router.get('/all-orders', requireSignIn,isAdmin, getAllOrdersController);

router.put('/order-status/:orderId',requireSignIn,isAdmin, orderStatusController);

export default router;
