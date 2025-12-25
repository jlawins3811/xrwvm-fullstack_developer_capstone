const { MongoClient } = require('mongodb');

// Replace with your MongoDB connection string
const uri = "mongodb://mongodb-service:27017"; // Use your service name and port
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    // Create or switch to database named "dealership"
    const database = client.db("dealership");

    // Create or switch to collection named "dealers"
    const collection = database.collection("dealers");

    // Insert a sample document
    const result = await collection.insertOne({
      name: "Sample Dealer",
      state: "CA",
      address: "123 Main St",
      city: "Los Angeles"
    });

    console.log(`New dealer created with the following id: ${result.insertedId}`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();