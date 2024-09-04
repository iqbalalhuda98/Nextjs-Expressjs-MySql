const fs = require('fs');
const path = require('path');

const {
  findAllProduct,
  findProductById,
  findProductByName,
  insertProduct,
  updateProduct,
  deleteProduct,
  afterDeleteProduct
} = require("./product.repository");
const { findCategoryById } = require("../category/category.repository");

const getAllProduct = async () => {
  const datas = await findAllProduct();

  if (!datas.length) throw Error("Data is empty.");

  return datas;
};

const getProductById = async (id) => {
  const data = await findProductById(id);

  if (!data) throw Error(`Data with ID: ${id} not found.`);

  return data;
};

const createProduct = async (newData) => {
  const isNameExist = await findProductByName(newData.name);
  const isCategoryExist = await findCategoryById(newData.category_id);

  if (isNameExist) throw Error("Product name has been registered.");
  if (!isCategoryExist) throw Error("Category not found.");

  const id = await insertProduct(newData);
  const data = await getProductById(id);

  return data;
};

const updateProductById = async (id, newData) => {
  const product = await getProductById(id);
  
  if (product && product.image) {
    const oldImagePath = path.resolve(__dirname, "../../images/", product.image);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }
  }
  
  const isNameExist = await findProductByName(newData.name);
  const isCategoryExist = await findCategoryById(newData.category_id);

  if (isNameExist && isNameExist.id !== product.id) {
    throw new Error("Product name has been registered.");
  }
  if (!isCategoryExist) throw Error("Category not found.");

  await updateProduct(id, newData);
  const data = await getProductById(id);

  return data;
};

const deleteProductById = async (id) => {
  const data = await getProductById(id);

  if (data && data.image) {
    const oldImagePath = path.resolve(__dirname, "../../images/", data.image);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }
  }

  await deleteProduct(id);
  await afterDeleteProduct(data.sn_id);
};

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};