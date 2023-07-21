import express from "express";
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import {brainTreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductsController, getSingleProductController, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from "../controllers/productController.js";
import formiddable from 'express-formidable';
const router = express.Router();

//routes

//create category
router.post('/create-product',requireSignIn,isAdmin,formiddable(),createProductController);

//get Products
router.get('/get-products',getProductsController);

//single Product
router.get('/get-product/:slug',getSingleProductController);

//get photo
router.get('/product-photo/:pid',productPhotoController);

//delete product
router.delete('/delete-product/:pid',requireSignIn,isAdmin,deleteProductController);

//update product
router.put('/update-product/:pid',requireSignIn,isAdmin,formiddable(),updateProductController);

//filter products
router.post('/filter-products',productFilterController);

//product count
router.get('/product-count',productCountController);

//product-per page
router.get('/product-list/:page',productListController);

//search product
router.get('/search/:keyword',searchProductController);

//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//Category wise prouct
router.get('/product-category/:slug',productCategoryController);

//payments routes
//token
router.get('/braintree/token',braintreeTokenController);

//payments
router.post('/braintree/payment',requireSignIn,brainTreePaymentController);


export default router;

