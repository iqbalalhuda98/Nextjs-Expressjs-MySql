const db = require('../../db/service');
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const findAllAdmin = async () => {
  const datas = await db
    .query("SELECT * FROM mst_admin ORDER BY sn_id")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw Error(error);
    });

  return datas;
};

// const findAdminByParams = async (params) => {
//   const { limit, offset, price, sort_by, open_now } = params;

//   const sqlPrice = price ? `WHERE LENGTH(price) = ${price}` : "";
//   const sqlOpenNow = open_now
//     ? sqlPrice
//       ? `AND is_closed = ${open_now}`
//       : `WHERE is_closed = ${open_now}`
//     : "";
//   const sqlSortBy = sort_by ? `ORDER BY ${sort_by} DESC` : "";
//   const sqlLimit = limit ? `LIMIT ${limit}` : "";
//   const sqlOffset = offset ? `OFFSET ${offset}` : "";

//   const datas = await db
//     .any(
//       `SELECT * FROM business
//        ${sqlPrice}
//        ${sqlOpenNow}
//        ${sqlSortBy}
//        ${sqlLimit}
//        ${sqlOffset}`
//     )
//     .then((data) => {
//       return data;
//     })
//     .catch((error) => {
//       throw Error(error);
//     });

//   return datas;
// };

const findAdminById = async (id) => {
  const data = await db
    .query(`SELECT * FROM mst_admin where id='${id}'`)
    .then((response) => {
      return response[0];
    })
    .catch((error) => {
      throw Error(error);
    });

  return data;
};

const findAdminByEmail = async (email) => {
  const data = await db
    .query(`SELECT * FROM mst_admin where email='${email}'`)
    .then((response) => {
      return response[0];
    })
    .catch((error) => {
      throw Error(error);
    });

  return data;
};

const insertAdmin = async (newData) => {
  const { first_name, last_name, email, password, date_birth, gender } = newData;
  const id = uuidv4();
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await db
    .query(
      `INSERT INTO mst_admin (id, first_name, last_name, email, password, date_birth, gender) 
       VALUES('${id}', '${first_name}', '${last_name}', '${email}', '${hashedPassword}', '${date_birth}', '${gender}')`
    )
    .catch((error) => {
      throw Error(error);
    });

  return id;
};

const updateAdmin = async (id, newData) => {
  const { first_name, last_name, email, password, date_birth, gender } = newData;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await db
    .query(
      `UPDATE mst_admin 
       SET first_name='${first_name}', last_name='${last_name}', email='${email}', 
           password='${hashedPassword}', date_birth='${date_birth}', gender='${gender}' 
       WHERE id='${id}'`
    )
    .catch((error) => {
      throw Error(error);
    });
};

const deleteAdmin = async (id) => {
  await db
    .query(`DELETE FROM mst_admin where id='${id}'`)
    .catch((error) => {
      throw Error(error);
    });
};

const afterDeleteAdmin = async (sn_id) => {
  await db.query(`UPDATE mst_admin SET sn_id = sn_id - 1 WHERE sn_id > ${sn_id}`);

  const maxSnIdResult = await db.query(`SELECT MAX(sn_id) as max_sn_id FROM mst_admin`);
  const maxSnId = maxSnIdResult[0].max_sn_id || 0;
  
  await db.query(`ALTER TABLE mst_admin AUTO_INCREMENT = ${maxSnId + 1}`);
};

module.exports = {
  findAllAdmin,
//   findAdminByParams,
  findAdminById,
  findAdminByEmail,
  insertAdmin,
  updateAdmin,
  deleteAdmin,
  afterDeleteAdmin,
};