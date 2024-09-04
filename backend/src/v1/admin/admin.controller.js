const express = require("express");
const router = express.Router();

const verifyToken = require("../../middleware/verify-token");

const {
  getAllAdmin,
//   getAdminByParams,
  getAdminById,
  createAdmin,
  updateAdminById,
  deleteAdminById,
} = require("./admin.service");

router.get("/", async (req, res) => {
  try {
    const datas = await getAllAdmin();

    res.status(200).send(datas);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// router.get("/search", async (req, res) => {
//   try {
//     const params = req.query;
//     const admin = await getAdminByParams(params);

//     res.status(200).send(admin);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getAdminById(id);

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newData = req.body;

    const data = await createAdmin(newData);

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

    const data = await updateAdminById(id, newData);

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
    await deleteAdminById(id);

    res.status(201).send({
      message: "Delete data success.",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;