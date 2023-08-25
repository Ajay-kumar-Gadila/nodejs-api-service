const express = require("express");
const app = express();
const mongoose = require("mongoose");
const BrandName = require("./model/schema");

// middleware
app.use(express.json());

mongoose
  .connect("mongodb+srv://root:1234@cluster0.nv0hpjx.mongodb.net/task", {
    useNewUrlParser: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Data base connected"))
  .catch((err) => console.log(err));
// post method
app.post("/user", async (req, res) => {
  const { brandname } = req.body;
  try {
    const newData = new BrandName({ brandname });
    await newData.save();
    console.log("new record is created...");
    return res.json(newData);
  } catch (err) {  
    console.log(err);
  }
});
// get method
app.get("/getuser/:id", async (req, res) => {
  try {
    const data = await BrandName.findById(req.params.id);
    return res.json(data);
  } catch (err) {
    console.log(err);
  }
});
// put method
app.put("/update/:id", async (req, res) => {
  const { brandname } = req.body;
  try {
    const updatedData = await BrandName.findByIdAndUpdate(
      req.params.id,
      { brandname }, // Update the 'brandname' field with the new value
      { new: true } // Return the updated document
    );

    return res.json(updatedData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update data" });
  }
});
// delete method
app.delete("/delete/:id", async (req, res) => {
  try {
    const deletedData = await BrandName.findByIdAndDelete(req.params.id);
    if (!deletedData) {
      return res.status(404).json({ error: "User not found" });
    }
    //   return res.json(deletedData);
    res.send("deleted successfully");
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("server running on 3000 port");
});
