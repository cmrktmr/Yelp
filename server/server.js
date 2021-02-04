require("dotenv").config();
const db = require("./db");
const morgan = require("morgan");

const express = require("express");
const app = express();

app.use(express.json());

//Get all Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("select * from restaurants");
    console.log(results);
    res.json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurant: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//GET A Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const results = await db.query("select * from restaurants where id=$1", [
      req.params.id,
    ]);
    console.log(results.rows[0]);
    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Create a Restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  console.log(req.body);

  try {
    const result = await db.query(
      "INSERT INTO restaurants (name,location,price_range) values ($1,$2,$3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    console.log(result);
    res.status(201).json({
      status: "success",
      data: {
        restaurant: result.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//update a Restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const result = await db.query(
      "UPDATE restaurants SET name=$1,location=$2,price_range=$3 where id =$4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    console.log(result);
    res.status(200).json({
      status: "success",
      data: {
        restaurant: ["mcdonalds", "angara"],
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});

//Delete Restaurant

app.delete("/api/v1/restaurants/:id", async (req, res) => {
  res.status(204).json({
    status: "success",
  });
});




//PORT LISTEN
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
