import { connect } from 'mongoose'

import config from './config'

const connectDB = async () => {
  try {
    const mongoURI: string = config['mongoUri'];
    await connect(mongoURI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error('src/config/connect-db.ts: err =', err);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;