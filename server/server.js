require("dotenv").config();
const morgan = require("morgan");

const express = require("express");
const app = express();

app.use(express.json())

//Get all Restaurants
app.get("/api/v1/restaurants", (req, res) => {
  console.log("route handler");
  res.json({
    status: "success",
    data: {
      restaurant: ["mcdonalds", "wendys"],
    },
  });
});

//GET A Restaurant
app.get("/api/v1/restaurants/:restaurantid", (req, res) => {
  console.log(req.params);
});

//Create a Restaurant
app.post("/api/v1/restaurants", (req, res) => {
  console.log(req.body);
});

//update a Restaurant



const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
