import * as path from 'path';
import * as dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'dev';
const dotenv_path = path.resolve(process.cwd(), `.${env}.env`);
dotenv.config({ path: dotenv_path });

const DefaultConfig = {
  authUrl: process.env.AUTH_URL,
  dhlUrl: process.env.DHL_URL,
  port: process.env.PORT || 3001,
  httpTimeout: 5000,
};

export default DefaultConfig;
