const serverEnv = {
    SERVER_ENVIRONMENT: process.env.SERVER_ENVIRONMENT,
    SERVER_PORT: Number(process.env.SERVER_PORT),
    MONGODB_URL: process.env.MONGODB_URL
};

export default serverEnv;
