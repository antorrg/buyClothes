import express from "express";
import ProductRepository from "./Repositories/ProductRepository.js";
import ProductService from "./Services/ProductService.js";
import ProdHelp from "./Modules/product/helpers/prodHelp.js";
import paymentRoute from "./Modules/payment/payment.routes.js";

const tuki = new ProductRepository();
// Repository, fieldName, useCache = false, parserFunction = null, useImage = false, deleteImages = null
const service = new ProductService(
  tuki,
  "name",
  false,
  ProdHelp.parseProduct,
  false,
  null
);
const mainRouter = express.Router();

mainRouter.use(paymentRoute);

mainRouter.post("/create", async (req, res) => {
  const data = req.body;
  try {
    const response = await tuki.create(data);
    res.status(201).json(response);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});
mainRouter.get("/", async (req, res) => {
  const queryObject = {
    page: req.query.page || 1,
    size: req.query.size || 3,
    name: req.query.name || "",
    trademark: req.query.trademark || "",
    fields: req.query.fields || "",
  };
  const isAdmin = false;

  try {
    const response = await service.getAll(queryObject, isAdmin);
    res.status(200).json(response.data);
    // const response = await tuki.getProduct(queryObject, isAdmin)
    // const pepe = parsedProductGet(response.results)
    // res.status(200).json({ info: response.info, results: response })
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});
mainRouter.get("/:id", async (req, res) => {
  // page, size, name, trademark, fields
  const { id } = req.params;
  const size = req.query.size || "";
  const color = req.query.color || "";

  try {
    const response = await service.getById(id, size, color);
    const pepe = await tuki.getInfoVariants(id);
    res.status(200).json({ response, getInfoVariants: pepe });
    // const response = await tuki.getById(id, size, color)
    // const pepe = parsedProductGetById(response)
    // res.status(200).json({ info: 'Variante del producto', results: pepe })
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});
mainRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  const response = await tuki.variantUpdate(id, newData);
  res.status(200).json({ message: "Actualizacion exitosa", results: response });
});

export default mainRouter;
