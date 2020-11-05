var webPush = require('web-push');
 
// web-push generate-vapid-keys --json
const vapidKeys = {
   "publicKey": "BK47ZQM8ECqd26EM5qc7vM9G5C-pLJeqSJYV24gdefb_SAle7F6lNhBv6X7EehmmIn73QXjfAud3JhXNPY4UH68",
   "privateKey": "vh9KJ3T8xM_edVmZguvDGjHZbxSH4KfYEJ_3Au1Wibs"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eXYYzyNZk4I:APA91bG4uPiP8usLUg8IQMza8OGJx23sc4LCGaDkCh-2Om_5MJxXgEaIgLFjN-CWtMk8jldXdeyqZ7fh83fye2jhpKePxrqQH3ece7aKKgH_2xvWuBgGdBzmOV8K0uQHFUKF4FP4IdSu",
   "keys": {
       "p256dh": "BNkmJr4JstB/yffVRZEXTcqPA8XQDJWkcoTobXZ/bbkWLEE373f8BTyImLk1YH8L+Zr27bXVWZXW0c1YIXi1Kec=",
       "auth": "EoosyghmpwYPCI7hiVsGtQ=="
   }
};
var payload = 'Testing Push Notification API with FCM';
 
var options = {
   gcmAPIKey: '1074959444692',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);