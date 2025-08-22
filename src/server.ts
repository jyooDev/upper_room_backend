import app from './app';
import config from './config/config';

import connectDB from './config/connect-db';

connectDB()

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
})