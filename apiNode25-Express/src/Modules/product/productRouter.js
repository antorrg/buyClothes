import express from "express";
import MiddlewareHandler from "../../Middlewares/MiddlewareHandler.js"
import v from "./productMidd.js"

// declaracion de campos y tipos:

const productRouter = express.Router();

productRouter.post("/", MiddlewareHandler.validateFieldsWithItems(v.productCreate1, v.productCreate2, "variants"))

productRouter.get("/",)

productRouter.get("/:id",)

productRouter.put("/:id",)

productRouter.delete("/:id")

// variants
productRouter.post("/var", MiddlewareHandler.validateFields(v.productCreate2))

productRouter.get("/var",)

productRouter.get("/var/:id",)

productRouter.put("/var/:id",)

productRouter.delete("/var/:id",)

export default productRouter;