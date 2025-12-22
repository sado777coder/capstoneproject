require("dotenv").config();
const connectDB = require("./src/config/connectdb");
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB(); // DB first
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
};

startServer();