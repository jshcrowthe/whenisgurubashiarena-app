const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

exports.notifySubscribedUsersCron = functions.pubsub.schedule('every 3 hours from 02:50 to 23:59')
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
          body : 'Gurubashi Arena starts in 10 minutes. Prepare yourself!'
        },
        tokens: registrationTokens,
      }
      
      const multicast = await admin.messaging().sendMulticast(message);

      console.log(`Succesfully sent ${multicast.successCount} messages with ${multicast.failureCount} errors`);
    } catch(err) {
      console.error(err);
    }
  });
