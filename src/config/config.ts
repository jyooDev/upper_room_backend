import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  port: number;
  nodeEnv: string;
  mongoUri: string;

  livekitApikey: string;
  livekitSecret: string;
  livekitUri: string;
}

const config: IConfig = {
  port: Number(process.env.PORT) || 8888,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri:
    (process.env.NODE_ENV === 'development'
      ? process.env.DEV_MONGO_URI
      : process.env.PROD_MONGO_URI) || 'mongodb://localhost:27017/upper-room',

  livekitApikey:
    (process.env.LIVEKIT_ENV === 'development'
      ? process.env.DEV_LIVEKIT_API_KEY
      : process.env.PROD_LIVEKIT_API_KEY) || 'devkey',
  livekitSecret:
    (process.env.LIVEKIT_ENV === 'development'
      ? process.env.DEV_LIVEKIT_API_SECRET
      : process.env.PROD_LIVEKIT_API_SECRET) || 'secret',
  livekitUri:
    (process.env.LIVEKIT_ENV === 'development'
      ? process.env.DEV_LIVEKIT_URI
      : process.env.PROD_LIVEKIT_URI) || '',
};

export default config;
