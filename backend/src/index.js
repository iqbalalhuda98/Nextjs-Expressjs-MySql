const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(cors());

app.use(express.json());

const apiVer = process.env.API_VERSION;
const auth = require(`./${apiVer}/auth`);
const adminController = require(`./${apiVer}/admin/admin.controller`);
const categoryController = require(`./${apiVer}/category/category.controller`);
const productController = require(`./${apiVer}/product/product.controller`);

app.use('/', auth);
app.use(`/${apiVer}/admin`, adminController);
app.use(`/${apiVer}/category`, categoryController);
app.use(`/${apiVer}/product`, productController);

const middlewareNotFound = require("./middleware/not-found");
app.use(middlewareNotFound);

const port = process.env.API_PORT;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});