const express = require("express");
const router = express.Router();

const verifyToken = require("../../middleware/verify-token");

const {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
} = require("./category.service");

router.get("/", async (req, res) => {
  try {
    const datas = await getAllCategory();

    res.status(200).send(datas);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getCategoryById(id);

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newData = req.body;

    const data = await createCategory(newData);

    res.status(201).send({
      message: "Create data success.",
      newData: data,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;

    const data = await updateCategoryById(id, newData);

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
    await deleteCategoryById(id);

    res.status(201).send({
      message: "Delete data success.",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;