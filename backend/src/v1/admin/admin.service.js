const {
  findAllAdmin,
//   findAdminByParams,
  findAdminById,
  findAdminByEmail,
  insertAdmin,
  updateAdmin,
  deleteAdmin,
  afterDeleteAdmin
} = require("./admin.repository");

const getAllAdmin = async () => {
  const datas = await findAllAdmin();

  if (!datas.length) throw Error("Data is empty.");

  return datas;
};

// const getAdminByParams = async (params) => {
//   const data = await findAdminByParams(params);

//   if (!data) throw Error(`Data tidak ditemukan.`);

//   return data;
// };

const getAdminById = async (id) => {
  const data = await findAdminById(id);

  if (!data) throw Error(`Data with ID: ${id} not found.`);

  return data;
};

const createAdmin = async (newData) => {
  const isAdminExist = await findAdminByEmail(newData.email);
  if (isAdminExist) throw Error("Email has been registered.");

  const id = await insertAdmin(newData);
  const data = await getAdminById(id);

  return data;
};

// TO DO : update password
const updateAdminById = async (id, newData) => {
  const admin = await getAdminById(id);
  
  const isAdminExist = await findAdminByEmail(newData.email);
  if (isAdminExist && isAdminExist.id !== admin.id) {
    throw new Error("Email has been registered.");
  }

  await updateAdmin(id, newData);
  const data = await getAdminById(id);

  return data;
};

const deleteAdminById = async (id) => {
  const data = await getAdminById(id);

  await deleteAdmin(id);
  await afterDeleteAdmin(data.sn_id);
};

module.exports = {
  getAllAdmin,
//   getAdminByParams,
  getAdminById,
  createAdmin,
  updateAdminById,
  deleteAdminById,
};