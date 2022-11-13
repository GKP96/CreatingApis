let express = require('express');
let app = express();
const { MongoClient } = require('mongodb');
let bodyParser = require("body-parser");
// first api what I need to create is a git api.
app.use(bodyParser.json());
// Connection URL
const url = 'mongodb+srv://Gautama:Gaunik%401234@cluster1.txuuzz9.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

async function connection() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents1');
  
  return 'done.';
}
connection()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

// This will start the server.
app.listen('8080',()=>{
  console.log('app start listening on port 2020');
})

app.post('/api/v3/app/events',async(req,res)=>{
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');
  const insertResult = await collection.insertMany([{id:req.body.unique_id,name:req.body.name,link:req.body.link,tagline:req.body.tagline,shedule:req.body.shedule,description:req.body.description,moderator:req.body.moderator,category:req.body.category,sub_category:req.body.sub_category,rigor_rank:req.body.rigor_rank}]);
  
  console.log('Inserted documents =>', insertResult);
  res.send(insertResult);
})
// This is fine yet.

app.get('/path',async(req,res)=>{
  
})

app.get('/api/v3/app/events',async(req,res)=>{
 await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');
  const filteredDocs = await collection.find({name: req.query.uniuqe_id}).toArray();
  console.log('Found documents filtered by { a: req.query.id } =>', filteredDocs);
  res.send(req.query.id);
})

app.get('/api/v3/app/events',async(req,res)=>{
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');
  const blogQuery = Blog.find({type:req.query.type=latest})
    .where('page').gt(1)
    .limit(5)
    .exec((err,result)=>{
        if(err){
            response.send(err);
        } else {
            response.send(result);
        }

    });
})

app.put('/api/v3/app/events/:id',async(req,res)=>{
   await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');
  const result = await collection.find({ a: req.params.id }).toArray();
  const updateResult = await collection.updateOne({ a: req.query.id }, { $set: { b: req.body } });
  console.log('Updated documents =>', updateResult);
})

app.delete('/api/v3/app/events/:id',async(req,res)=>{
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');
  const deleteResult = await collection.deleteMany({ id: req.params.id });
console.log('Deleted documents =>', deleteResult);
  res.send(deleteResult);
})

// app.get('/some',(req,res)=>{
//   res.send("what is this");
// })

// app.get('/path/call',(req,res)=>{
//   res.send(req.body);
// })
// app.get('/path/q',(req,res)=>{
//   console.log(req.query);
//   res.send(req.query.name);  
// })

// app.get('/parameter/:name',(req,res)=>{
//   res.send(req.params);
// })

