const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/testdb")
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
    });

const User = mongoose.model("User", userSchema);


app.post("/api/data", async (req, res) => {
    try {
        const { email, body } = req.body;

        if (!email || !body) {
            return res.status(400).json({
                message: "Email and body are required"
            });
        }
        const newData = new User({email, body});
        await newData.save();

        res.status(201).json({
            message: "Data stored sucessfully",
            data: newData
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
});

app.listen(3000, () => {
    console.log("server is running");
});

