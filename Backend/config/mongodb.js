import mongoose from "mongoose";
import dns from "node:dns";

// Fix querySrv ECONNREFUSED on Windows/ISP DNS by using reliable public DNS
try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch (e) {
  // Ignore if unable to set DNS servers
}

const connectDB = async () => {
  mongoose.connection.on("connected", () => console.log("Database Connected successfully"));
  mongoose.connection.on("error", (err) => console.error("Database connection error:", err.message));

  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error("MONGODB_URI is not defined in .env");
      return;
    }
    const dbUrl = uri.endsWith("/serviceDatabase") ? uri : `${uri}/serviceDatabase`;
    await mongoose.connect(dbUrl);
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
  }
};


export default connectDB