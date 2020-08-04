const express = require("express");

const router = express.Router();

const Item = require("../../models/ItemsModel");

router.get("/", async (req, res) => {
  const items = await Item.find({}).sort({ date: -1 });
  res.json(items);
});

router.post("/", (req, res) => {
  let { name } = req.body;

  let newItem = new Item({
    name,
  });

  newItem.save((err) => console.error(err));

  res.json(newItem);
});

router.delete("/:name", async (req, res) => {
  let { name } = req.params;
  const itemToDelete = await Item.find({ name: name });

  try {
    if (itemToDelete.length > 0) {
      const itemDelete = await Item.find({ name: name }).deleteOne();
      res.json({ success: "item removed" });
    } else {
      res.status(404).json({ Error: "No such item to delete" });
    }
  } catch (error) {
    res.status(204).json({ Error: "error deleting item" });
  }
});

module.exports = router;
