/**
 * FIT5032 Week 9 - Cloud Functions
 * countBooks: returns the total number of books
 * capitalizeBookData: capitalises all string fields of a new book
 */

const {setGlobalOptions} = require("firebase-functions/v2");
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

setGlobalOptions({maxInstances: 10});

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;

      logger.info(`Book count: ${count}`);
      res.status(200).send({count: count});
    } catch (error) {
      logger.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

exports.capitalizeBookData = onDocumentCreated(
    "books/{bookId}",
    async (event) => {
      const snapshot = event.data;
      if (!snapshot) return;

      const data = snapshot.data();
      const updatedData = {};

      for (const [key, value] of Object.entries(data)) {
        updatedData[key] =
          typeof value === "string" ? value.toUpperCase() : value;
      }

      await snapshot.ref.update(updatedData);
      logger.info(`Book ${event.params.bookId} capitalised`, updatedData);
    },
);

exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await admin.firestore().collection("books").get();
      const books = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      logger.info(`Returned ${books.length} books`);
      res.status(200).send(books);
    } catch (error) {
      logger.error("Error getting books:", error.message);
      res.status(500).send("Error getting books");
    }
  });
});
