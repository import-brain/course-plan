const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');
const filteredAllCourses = require('./filtered-all-courses.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://cornelldti-courseplan-dev.firebaseio.com'
});

const db = admin.firestore();
const userDataCollection = db.collection('userData');

userDataCollection.get().then(userData => {
  Promise.all(
    userData.docs.map(userDataDocument => {
      const data = userDataDocument.data();
      return userDataDocument.ref.set({
        ...data,
        semesters: data.semesters.map(semester => ({
          ...semester,
          courses: semester.courses.map(course => {
            const { code, lastRoster } = course;
            const [subject, number] = code.split(' ');
            const crseId = filteredAllCourses[lastRoster].find(
              it => it.subject === subject && it.catalogNbr === number
            ).crseId;
            if (crseId == null) throw new Error(`${lastRoster}, ${subject}, ${number}, ${crseId}`);
            return { ...course, crseId };
          })
        }))
      });
    })
  );
});
