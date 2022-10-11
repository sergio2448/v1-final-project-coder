const express = require("express");
const routes = require("./routes/index.js");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
app.get('*', (req, res) => {
  const { url, method } = req
  res.status(404).json({
    error: -2,
    description: `route ${url} method ${method} not implemented`
  })
});

const server = app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
});

server.on('error', error => {
  console.error(`Error: ${error}`)
})
