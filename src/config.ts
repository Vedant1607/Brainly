import dotenv from 'dotenv';

dotenv.config();

if (!process.env.MONGO_URL) {
    throw new Error('MONGO_URL is not defined in the environment variables');
}

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

export const config = {
    mongoUrl:process.env.MONGO_URL,
    jwtSecret:process.env.JWT_SECRET,
    port:process.env.PORT || 3000,
}