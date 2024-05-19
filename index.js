const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const datas = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));

// GET METHOD
app.get("/api", (req, res) => {
  res.status(200).json({
    status: "success",
    results: datas.length,
    data: {
      datas,
    },
  });
});

// POST METHOD
app.post("/api", (req, res) => {
  const newId = datas[datas.length - 1].id + 1;
  const newData = Object.assign({ id: newId }, req.body);

  datas.push(newData);
  fs.writeFile(`${__dirname}/data.json`, JSON.stringify(datas), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        data: newData,
      },
    });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
