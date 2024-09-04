const db = require('../../db/service');
const { v4: uuidv4 } = require("uuid");

const findAllCategory = async () => {
  const datas = await db
    .query("SELECT * FROM mst_category ORDER BY sn_id")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw Error(error);
    });

  return datas;
};

const findCategoryById = async (id) => {
  const data = await db
    .query(`SELECT * FROM mst_category where id='${id}'`)
    .then((response) => {
      return response[0];
    })
    .catch((error) => {
      throw Error(error);
    });

  return data;
};

const findCategoryByName = async (name) => {
  const data = await db
    .query(`SELECT * FROM mst_category where name='${name}'`)
    .then((response) => {
      return response[0];
    })
    .catch((error) => {
      throw Error(error);
    });

  return data;
};

const insertCategory = async (newData) => {
  const { name, description } = newData;
  const id = uuidv4();

  await db
    .query(
      `INSERT INTO mst_category (id, name, description) 
       VALUES('${id}', '${name}', '${description}')`
    )
    .catch((error) => {
      throw Error(error);
    });

  return id;
};

const updateCategory = async (id, newData) => {
  const { name, description } = newData;

  await db
    .query(
      `UPDATE mst_category 
       SET name='${name}', description='${description}'
       WHERE id='${id}'`
    )
    .catch((error) => {
      throw Error(error);
    });
};

const deleteCategory = async (id) => {
  await db
    .query(`DELETE FROM mst_category where id='${id}'`)
    .catch((error) => {
      throw Error(error);
    });
};

const afterDeleteCategory = async (sn_id) => {
  await db.query(`UPDATE mst_category SET sn_id = sn_id - 1 WHERE sn_id > ${sn_id}`);

  const maxSnIdResult = await db.query(`SELECT MAX(sn_id) as max_sn_id FROM mst_category`);
  const maxSnId = maxSnIdResult[0].max_sn_id || 0;
  
  await db.query(`ALTER TABLE mst_category AUTO_INCREMENT = ${maxSnId + 1}`);
};

module.exports = {
  findAllCategory,
  findCategoryById,
  findCategoryByName,
  insertCategory,
  updateCategory,
  deleteCategory,
  afterDeleteCategory,
};