import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async(req,res) =>{ 
    try{
        const {name} = req.body;
        console.log(name);
        if(!name){
            return res.status(200).send({
                message:"Name is required"
            })
        }
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success:false,
                message : 'Category already exists'
            })
        }
        const category = await new categoryModel({name,slug:slugify(name)}).save();
        return res.status(201).send({
            success:true,
            message : 'new Category created',
            category
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            error,
            message : 'Error in Creating Category'
        })
    }
}

export const updateCategoryController = async(req,res) => {
    try{
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        return res.status(200).send({
            success:true,
            message : 'Category updated successfully',
            category
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            error,
            message : 'Error while updating Category'
        })
    }
}

export const categoryController = async(req,res) =>{
    try{
        const category = await categoryModel.find();
        return res.status(200).send({
            success:true,
            message:'All Category List',
            category
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            error,
            message : 'Error while getting all categories'
        })
    }
}

export const singleCategoryController =  async(req,res) =>{
    try{
        const category = await categoryModel.findOne({slug : req.params.slug});
        return res.status(200).send({
            success:true,
            message : 'Get Single Category Successfully ',
            category
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            error,
            message : 'Error while getting single category'
        })
    }
}

export const deleteCategoryController = async(req,res) =>{
    try{
        const {id}=req.params;
        await categoryModel.findByIdAndDelete(id);
        return res.status(200).send({
            success:true,
            message : 'Category deleted successfully'
        })
    }
    catch(error){
        console.log(error);
       return res.status(500).send({
            success:false,
            error,
            message : 'Error while deleting category'
        })
    }
}