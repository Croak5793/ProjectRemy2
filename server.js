const admin = require('firebase-admin');
const express = require('express');
const app = express();

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

app.get('/recipes/:id', async (req, res) => {
  // code to fetch a specific recipe from Firestore
});

app.get('/users/:id/preferences', async (req, res) => {
  // code to fetch a user's preferences from Firestore
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
