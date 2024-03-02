import mongoose, { mongo } from 'mongoose';

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);

    if (connection.readyState == 1) {
      console.log('database connected successfully');
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectMongo;
