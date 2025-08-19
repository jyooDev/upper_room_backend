import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  port: number;
  nodeEnv: string;
}

const config: IConfig = {
  port: Number(process.env.PORT) || 8888,
  nodeEnv: process.env.NODE_ENV || "development"
}

export default config