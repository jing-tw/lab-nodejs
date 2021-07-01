
const { MongoClient } = require('mongodb');
const passwd = '1234';
const uri = `mongodb+srv://jing:${passwd}@cluster0.jllg8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err:any) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log('ok')
  client.close();
});


async function insert(collection:any){
    const doc = { name: "Neapolitan pizza", shape: "round" };
    const result = await collection.insertOne(doc);
    console.log(
    `${result.insertedCount} document was inserted with the _id: ${result.insertedId}`,
    );
}