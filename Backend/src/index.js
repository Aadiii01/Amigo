import connectDB from "./Database/index.js";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running at Port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection FAILED: ", error);
});
