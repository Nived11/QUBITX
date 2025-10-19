import env from "dotenv";
import app from "./app";
import connectDB from "./config/db";

env.config();
const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
