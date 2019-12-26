const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// CRON runs every 3 hours 10 minutes before the top of the hour
exports.notifySubscribedUsersCron = functions.pubsub.schedule('50 2,5,8,11,14,17,20,23 * * *')
  .timeZone('America/Los_Angeles')
  .onRun(async () => {
    try {
      const querySnapshot = await db.collection('tokens').limit(500).get();

      const registrationTokens = [];
      querySnapshot.forEach(function(doc) {
        registrationTokens.push(doc.data().token);
      });
      
      console.log(`Succesfully fetched ${registrationTokens.length} tokens. Attempting to send notification`);

      const message = {
        notification: {
          title: 'Gurubashi Arena Alert',
          body : 'Gurubashi Arena starts soon. Prepare yourself!'
        },
        tokens: registrationTokens,
      };
      
      const multicast = await admin.messaging().sendMulticast(message);

      console.log(`Succesfully sent ${multicast.successCount} messages with ${multicast.failureCount} errors`);
    } catch(err) {
      console.error(err);
    }
  });
