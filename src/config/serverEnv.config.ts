import dotenv from "dotenv";
dotenv.config();
const serverEnv = {
    //server
    SERVER_ENVIRONMENT: process.env.SERVER_ENVIRONMENT,
    SERVER_PORT: Number(process.env.SERVER_PORT),

    //db
    MONGODB_URL: process.env.MONGODB_URL,

    //s3
    AWS_ENDPOINT: process.env.AWS_ENDPOINT,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME


};

export default serverEnv;
