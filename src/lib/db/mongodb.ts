import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/design-patterns';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

type MongooseConnection = typeof mongoose;

interface CachedConnection {
    conn: MongooseConnection | null;
    promise: Promise<MongooseConnection> | null;
}

declare global {
    var mongooseCache: CachedConnection | undefined;
}

const cached: CachedConnection = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
    global.mongooseCache = cached;
}

export async function connectDB(): Promise<MongooseConnection> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}
