const db = require('../../db/service');
const { v4: uuidv4 } = require("uuid");

const findAllProduct = async () => {
  const datas = await db
    .query(`
      SELECT p.*, c.name AS category_name
      FROM mst_product AS p
      JOIN mst_category AS c
      ON p.category_id = c.id 
      ORDER BY p.sn_id
    `)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw Error(error);
    });

  return datas;
};

const findProductById = async (id) => {
  const data = await db
    .query(`
      SELECT p.*, c.name AS category_name
      FROM mst_product AS p
      JOIN mst_category AS c
      ON p.category_id = c.id 
      WHERE p.id='${id}'
    `)
    .then((response) => {
      return response[0];
    })
    .catch((error) => {
      throw Error(error);
    });

  return data;
};

const findProductByName = async (name) => {
  const data = await db
    .query(`SELECT * FROM mst_product where name='${name}'`)
    .then((response) => {
      return response[0];
    })
    .catch((error) => {
      throw Error(error);
    });

  return data;
};

const insertProduct = async (newData) => {
  const { name, description, image, category_id, stock } = newData;
  const id = uuidv4();

  await db
    .query(
      `INSERT INTO mst_product (id, name, description, image, category_id, stock) 
       VALUES('${id}', '${name}', '${description}', '${image}', '${category_id}', ${stock})`
    )
    .catch((error) => {
      throw Error(error);
    });

  return id;
};

const updateProduct = async (id, newData) => {
  const { name, description, image, category_id, stock } = newData;

  await db
    .query(
      `UPDATE mst_product 
       SET name='${name}', description='${description}', image='${image}', category_id='${category_id}', stock=${stock}
       WHERE id='${id}'`
    )
    .catch((error) => {
      throw Error(error);
    });
};

const deleteProduct = async (id) => {
  await db
    .query(`DELETE FROM mst_product where id='${id}'`)
    .catch((error) => {
      throw Error(error);
    });
};

const afterDeleteProduct = async (sn_id) => {
  await db.query(`UPDATE mst_product SET sn_id = sn_id - 1 WHERE sn_id > ${sn_id}`);

  const maxSnIdResult = await db.query(`SELECT MAX(sn_id) as max_sn_id FROM mst_product`);
  const maxSnId = maxSnIdResult[0].max_sn_id || 0;
  
  await db.query(`ALTER TABLE mst_product AUTO_INCREMENT = ${maxSnId + 1}`);
};

module.exports = {
  findAllProduct,
  findProductById,
  findProductByName,
  insertProduct,
  updateProduct,
  deleteProduct,
  afterDeleteProduct,
};