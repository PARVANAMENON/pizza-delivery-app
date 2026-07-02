const express=require("express");

const router=express.Router();

const{

addPizza,
getPizzas,
getPizza,
updatePizza,
deletePizza

}=require("../controllers/pizzaController");


router.post("/",addPizza);

router.get("/",getPizzas);

router.get("/:id",getPizza);

router.put("/:id",updatePizza);

router.delete("/:id",deletePizza);

module.exports=router;
