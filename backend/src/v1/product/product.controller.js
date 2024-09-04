const express = require("express");
const router = express.Router();

const verifyToken = require("../../middleware/verify-token");
const upload = require("../../middleware/multer");
const uploadSingleImage = upload.single('image');

const {
  getAllProduct,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} = require("./product.service");

router.get("/", async (req, res) => {
  try {
    const datas = await getAllProduct();

    res.status(200).send(datas);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getProductById(id);

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", uploadSingleImage, async (req, res) => {
  try {
    const newData = req.body;

    if (req.file) {
      newData.image = req.file.filename;
    }

    const data = await createProduct(newData);

    res.status(201).send({
      message: "Create data success.",
      newData: data,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", uploadSingleImage, async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;

    if (req.file) {
      newData.image = req.file.filename;
    }

    const data = await updateProductById(id, newData);

    res.status(201).send({
      message: "Update data success.",
      updatedData: data,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteProductById(id);

    res.status(201).send({
      message: "Delete data success.",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;