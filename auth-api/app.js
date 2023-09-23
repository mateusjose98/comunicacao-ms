import express from "express";
const app = express();
const env = process.env;
const PORT = env.port || 8080;

app.get("/api/status", (req, res) => {
  return res.status(200).json({
    service: "UP",
  });
});

app.listen(PORT, () => {
  console.log(` --> Listening on port ${PORT}`);
});
