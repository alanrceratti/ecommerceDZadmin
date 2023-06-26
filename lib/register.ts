import { connectToDatabase } from "../../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const db = await connectToDatabase();
  const usersCollection = db.collection("users");

  const existingUser = await usersCollection.findOne({ email });

  if (existingUser) {
    return res.status(422).json({ message: "User already exists" });
  }

  // Create the new user in the database
  const result = await usersCollection.insertOne({ email, password });

  res.status(201).json({ message: "User created" });
}
