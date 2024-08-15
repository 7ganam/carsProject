import mongoose from "mongoose";
import { env } from "@/common/utils/envConfig";
import { logger } from "@/server";

let cachedConnection: typeof mongoose | null = null;

const connectDB = async (): Promise<typeof mongoose> => {
  if (cachedConnection) {
    return cachedConnection;
  }
  logger.info("Connecting to MongoDB...");
  try {
    const conn = await mongoose.connect(env.MONGO_DB_URI);
    await conn.connection.asPromise(); //wait for the connection to be established

    cachedConnection = conn;
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);

    logger.error(`Error connecting to MongoDB: ${error}`);
    throw error;
  }
};

export default connectDB;
