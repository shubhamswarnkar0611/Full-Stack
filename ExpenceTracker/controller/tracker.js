const Expenses = require('../models/tracker')
 
exports.addExpense=async(req,res,next)=>{
    try{
   let  expense = req.body.expense;
   let  description = req.body.description;
   let  category = req.body.category;

    let data=await Expenses.create({expense,description,category})
    res.json(data);
    }catch(err){
        console.log(err);
    }

}
exports.getExpenses=async(req,res,next)=>{
    try{
    let data =await Expenses.findAll()
    res.json(data);
    }catch(err){
        console.log(err);
    }
}
exports.deleteExpense=async(req,res,next)=>{
    let id = req.body.Id
    console.log(id);
    try{
        let data =await Expenses.findByPk(id)
         let result=await data.destroy();
         res.json(result);
        }catch(err){
            console.log(err);
        }
}
exports.editExpense=async(req,res,next)=>{
    try{
    let id = req.body.objId
    let expense = req.body.newExpense
    let description = req.body.newDescription
    let category = req.body.newCategory

    let data = await Expenses.findByPk(id)
    data.expense = expense;
    data.description = description;
    data.category = category;
    let result=await data.save();
    res.json(result);
    }catch(err){
        console.log(err)
    }
}