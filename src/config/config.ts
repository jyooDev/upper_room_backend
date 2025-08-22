import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  port: number;
  nodeEnv: string;
  mongoUri: string
}

const config: IConfig = {
  port: Number(process.env.PORT) || 8888,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: (process.env.NODE_ENV === 'development' ? process.env.DEV_MONGO_URI : process.env.PROD_MONGO_URI) || "mongodb://localhost:27017/upper-room"
}

export default config