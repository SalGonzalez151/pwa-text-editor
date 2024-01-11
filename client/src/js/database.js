import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// logic to accept some content and add it to the database
export const putDb = async (content) => {
  console.log('Add to database');
  const jatedb = await openDB('jate', 1);
  const tx = jatedb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.add({  jate: content });
  const result = await request;

  // checks result
  if (result) {
    console.log('Data saved to the database', result);
  } else {
    console.error('putDb not implemented')
  }
};

// logic for the method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;

  // check result
  if (result) {
    console.log('result.value', result);
  } else {
    console.error('getDb not implemented');
  }
};

initdb();