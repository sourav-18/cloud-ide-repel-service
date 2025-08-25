import mongoose from 'mongoose';
import serverEnv from '../../config/serverEnv.config';

const mongoConn=mongoose.createConnection(serverEnv.MONGODB_URL||"");

mongoConn.on('error', console.error.bind(console, 'connection error:'));

mongoConn.once('open', () => {
  console.log('Connected to MongoDB');
});

export default mongoConn;