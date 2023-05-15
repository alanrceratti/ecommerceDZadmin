import mongoose from "mongoose";

// Function to establish a connection to MongoDB using Mongoose
export function mongooseConnect() {
	// Check if the mongoose connection is already connected and ready
	if (mongoose.connection.readyState === 1) {
		// If connected and ready, return a Promise that resolves to the connection object
		return mongoose.connection.asPromise();
	} else {
		// If not connected, retrieve the MongoDB URI from the environment variable
		const uri = process.env.MONGODB_URI;
		// Connect to the MongoDB server using the obtained URI
		return mongoose.connect(uri as string);
	}
}
