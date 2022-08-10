import express from "express";
import routes from "./routes/index.js";

import db from "./configs/dbConnect.js";

db.on("error", (e) => console.log.bind(console, e));
db.once("open", () => console.log("🟢 Database connection successful"));

const PORT = process.env.PORT || 3000;

const app = express();
routes(app);

app.listen(PORT, () => {
  console.log(`🟢 Server is running on port ${PORT}: http://localhost:${PORT}`);
});
