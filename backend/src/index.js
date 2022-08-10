import express from "express";
import routes from "./routes/index.js";

const PORT = 3000;

const app = express();
routes(app);

app.listen(PORT, () => {
  console.log(`🟢 Server is running on port ${PORT}`);
});
