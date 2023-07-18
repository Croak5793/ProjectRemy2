const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser'); // new line
const app = express();

// setup body-parser
app.use(bodyParser.json()); // for parsing application/json

admin.initializeApp({
  credential: admin.credential.cert({
    "type": process.env.type,
    "project_id": process.env.project_id,
    "private_key_id": process.env.private_key_id,
    "private_key": process.env.private_key.replace(/\\n/g, '\n'),
    "client_email": process.env.client_email,
    "client_id": process.env.client_id,
    "auth_uri": process.env.auth_uri,
    "token_uri": process.env.token_uri,
    "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
    "client_x509_cert_url": process.env.client_x509_cert_url
  })
});

const db = admin.firestore();

app.get("/recipes", async (req, res) => {
  let recipeList = [];

  const snapshot = await db.collection("recipes").limit(100).get();

  snapshot.forEach((doc) => {
    recipeList.push(doc.data());
  });

  res.json(recipeList);
});

app.post('/create-preferences', async (req, res) => {  // New block of code to handle preferences
  let userPreferences = db.collection('preferences').doc(req.body.userId);

  let setWithOptions = userPreferences.set({
    vegan: req.body.vegan,
    vegetarian: req.body.vegetarian,
    glutenFree: req.body.glutenFree,
    whole30: req.body.whole30,
    pescetarian: req.body.pescetarian,
    dislikedIngredients: req.body.dislikedIngredients,
    dislikedCuisines: req.body.dislikedCuisines,
    // add other preferences here
  }, {merge: true});

  res.send('Preferences created successfully');
});

app.get('/get-preferences/:userId', async (req, res) => {  
  let docRef = db.collection('preferences').doc(req.params.userId);

  let doc = await docRef.get();
  if (!doc.exists) {
    res.status(404).send('No preferences found');
  } else {
    res.send(doc.data());
  }
});


app.get('/recipes/:id', async (req, res) => {
  // code to fetch a specific recipe from Firestore
});

app.get('/users/:id/preferences', async (req, res) => {
  const { id } = req.params;
  
  console.log(`Received request for preferences of user: ${id}`);
  
  try {
    const doc = await db.collection('Preferences').doc(id).get();
    
    if (!doc.exists) {
      console.log('No such document!');
      res.status(404).send('No such document!');
    } else {
      console.log('Document data:', doc.data());
      res.json(doc.data());
    }
  } catch (error) {
    console.error('Error getting document:', error);
    res.status(500).send('Error getting document');
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
