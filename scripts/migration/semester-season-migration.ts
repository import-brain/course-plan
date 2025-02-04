/* eslint-disable no-console */

import { semestersCollection } from '../firebase-config';

/**
 * Perform migration of semester type to semester season
 */
async function runOnUser(userEmail: string, runOnDB: boolean) {
  const semesters = await semestersCollection
    .doc(userEmail)
    .get()
    .then(it => {
      const data = it.data();
      return (data && data.semesters) || [];
    });

  // remove semester type from semesters
  const newSemesters = semesters.map(({ type: _, ...semester }) => semester);
  console.log(semesters, '=>', newSemesters);

  if (runOnDB) {
    await semestersCollection.doc(userEmail).update({ semesters: newSemesters });
  }
}

async function main() {
  let userEmail = process.argv[2];
  const runOnDB = process.argv.includes('--run-on-db');
  if (userEmail != null && userEmail !== '--run-on-db') {
    await runOnUser(userEmail, runOnDB);
    return;
  }
  const collection = await semestersCollection.get();
  const userEmails = collection.docs.map(it => it.id);
  for (userEmail of userEmails) {
    console.group(`Running on ${userEmail}...`);
    // Intentionally await in a loop to have no interleaved console logs.
    // eslint-disable-next-line no-await-in-loop
    await runOnUser(userEmail, runOnDB);
    console.groupEnd();
  }
}

main();
