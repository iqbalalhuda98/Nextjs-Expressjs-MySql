const {
  findAllCategory,
  findCategoryById,
  findCategoryByName,
  insertCategory,
  updateCategory,
  deleteCategory,
  afterDeleteCategory
} = require("./category.repository");

const getAllCategory = async () => {
  const datas = await findAllCategory();

  if (!datas.length) throw Error("Data is empty.");

  return datas;
};

const getCategoryById = async (id) => {
  const data = await findCategoryById(id);

  if (!data) throw Error(`Data with ID: ${id} not found.`);

  return data;
};

const createCategory = async (newData) => {
  const isNameExist = await findCategoryByName(newData.name);
  if (isNameExist) throw Error("Category name has been registered.");

  const id = await insertCategory(newData);
  const data = await getCategoryById(id);

  return data;
};

const updateCategoryById = async (id, newData) => {
  const category = await getCategoryById(id);
  
  const isNameExist = await findCategoryByName(newData.name);
  if (isNameExist && isNameExist.id !== category.id) {
    throw new Error("Category name has been registered.");
  }

  await updateCategory(id, newData);
  const data = await getCategoryById(id);

  return data;
};

const deleteCategoryById = async (id) => {
  const data = await getCategoryById(id);

  await deleteCategory(id);
  await afterDeleteCategory(data.sn_id);
};

module.exports = {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
};