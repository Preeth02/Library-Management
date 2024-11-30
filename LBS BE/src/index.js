import connectToDB from "./db/index.js";
// import "dotenv/config";
import app from "./app.js";

connectToDB()
  .then(() => {
    app.on("error", (err) => {
      console.log("Error:", err);
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed: ", err);
  });
