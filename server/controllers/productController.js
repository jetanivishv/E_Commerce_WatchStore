import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import braintree from 'braintree'
import dotenv from 'dotenv';
import { response } from "express";

dotenv.config()
// payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MARCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.send({
          success: false,
          message: "Name is Required",
        });
      case !description:
        return res.send({
          success: false,
          message: "Description is Required",
        });
      case !price:
        return res.send({
          success: false,
          message: "Price is Required",
        });
      case !category:
        return res.send({
          success: false,
          message: "Category is Required",
        });
      case !quantity:
        return res.send({
          success: false,
          message: "Quantity is Required",
        });
      case !photo || photo.size > 1000000:
        return res.send({
          success: false,
          message: "photo is Required and should be less then 1mb",
        });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

export const getProductsController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalCount: products.length,
      message: "All Products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting Products",
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting a Single Product",
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error while getting a Photo",
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting a product",
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;

    //validation
    switch (true) {
      case !name:
        return res.status(400).send({
          success: false,
          message: "Name is Required",
        });
      case !description:
        return res.status(400).send({
          success: false,
          message: "Description is Required",
        });
      case !price:
        return res.status(400).send({
          success: false,
          message: "Price is Required",
        });
      case !category:
        return res.status(400).send({
          success: false,
          message: "Category is Required",
        });
      case !quantity:
        return res.status(400).send({
          success: false,
          message: "Quantity is Required",
        });
      case photo && photo.size > 1000000:
        return res.status(400).send({
          success: false,
          message: "photo is Required and should be less then 1mb",
        });
    }
    const oldPhoto = await productModel.findOne(
      { _id: req.params.pid },
      { photo: 1 }
    );
    const product = await productModel.findByIdAndUpdate(
      { _id: req.params.pid },
      { $set: { ...req.fields, slug: slugify(name) } },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    } else {
      product.photo.data = oldPhoto.photo.data;
      product.photo.contentType = oldPhoto.photo.contentType;
    }
    await product.save();
    // console.log(product)
    res.status(201).send({
      success: true,
      message: "Product updated Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error in updating Product",
    });
  }
};

export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    console.log(checked);
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    return res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error while filtering Products",
    });
  }
};

// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

//product list baded on Page
export const productListController = async (req, res) => {
  try {
    const perpage = 4;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perpage)
      .limit(perpage)
      .sort({ createdAt: "DESC" });
      res.status(200).send({
        success: true,
        products,
      });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in per page ctrl",
      error,
      success: false,
    });
  }
};

export const searchProductController = async (req, res) => {
  try{
    const {keyword} = req.params;
    const result = await productModel.find({
      $or:[
        {
          name : {
            $regex : keyword,
            $options : "i"
          }
        },
        {
          description : {
            $regex : keyword,
            $options : "i"
          }
        }
      ]
    }).select("-photo");
    res.json(result);
  }catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in Search Product API",
      error,
      success: false
    });
  }
};

// similar products
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get product by catgory
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

//payment gateway api

export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};


//payment
export const brainTreePaymentController = async(req,res) =>{
  try{
    const {cart,nonce} = req.body;
    let total=0;
    cart.map((i)=>{
      total+=i.price
    }
    )
    let newTransaction = gateway.transaction.sale({
      amount: total,
      paymentMethodNonce:nonce,
      options:{
        submitForSettlement:true
      }
    },
    function(error,result){
      if(result){
        const order = new orderModel({
          products : cart,
          payment:result,
          buyer:req.user._id, 
        }).save();
        res.json({ok:true})
      }
      else{
        res.status(500).send(error);
      }
    }
    )
  }
  catch (error) {
    console.log(error);
}
}