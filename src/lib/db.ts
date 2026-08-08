import mongoose from "mongoose"

const mongodbURL = process.env.MONGODB_URL

if (!mongodbURL) {
    throw new Error("DB url not found!")
}



let cached = global.mongooseConn



if (!cached) {

    cached = global.mongooseConn = { conn: null, promise: null }
}


const connectDB = async () => {

    if (cached.conn) {
        return cached.conn
    }
    // new connection

    if(!cached.promise){

        cached.promise=mongoose.connect(mongodbURL).then(c=>c.connection)
    }

    // promise pending

    try {
        const conn = await cached.promise;
        cached.conn = conn
        return conn
    } catch (error) {
        console.log(error);
    }

}



export default connectDB;



























