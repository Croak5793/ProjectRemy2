const functions = require("firebase-functions");
const axios = require("axios");
const admin = require("firebase-admin");
admin.initializeApp();

const runtimeOpts = {
  timeoutSeconds: 300,
  memory: "1GB",
};

exports.scheduledFunction = functions
    .runWith(runtimeOpts)
    .pubsub
    .schedule("every 24 hours")
    .onRun(async (context) => {
      const response = await axios.get("https://api.spoonacular.com/recipes/random?apiKey=f7bd372fb17f4b48b50aa5d50db6f726&number=150");

      const data = response.data;

      const batch = admin.firestore().batch();

      data.recipes.forEach((recipe) => {
        const docRef = admin.firestore().collection("recipes").doc();
        batch.set(docRef, recipe);
      });

      return batch.commit()
          .then(() => {
            console.log("Successfully fetched and saved recipes.");
          })
          .catch((error) => {
            console.error("Error fetching and saving recipes: ", error);
          });
    });
