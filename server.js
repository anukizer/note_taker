const express = require('express'); //Importing express to handle HTTP requests
const fs = require('fs'); //To handle file system modeul to read or write files
const path = require('path'); //import path module to handle file 
const { v4: uuidv4 } = require('uuid'); // Install with `npm install uuid`

const app = express(); // it initializes the express app
const PORT = process.env.PORT || 3001;  // port we use

// Middleware
app.use(express.json()); // Parse incoming JSON req bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded from data
app.use(express.static('public')); // serve static files from public directory

// API Routes
app.get('/api/notes', (req, res) => {
  // read the db.json file 
  fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Unable to read notes.' });
    } else {
      res.json(JSON.parse(data)); // send the notes as JSON
    }
  });
});

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body; // Destructure the `title` and `text` from the request body.

  if (!title || !text) {
    // return error message
    return res.status(400).json({ error: 'Title and text are required.' });
  }

  // Create a new note object with a unique ID.
  const newNote = { id: uuidv4(), title, text }; 

  // Read the existing notes from `db.json`.
  fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Unable to save note.' });
    } else {
      const notes = JSON.parse(data); // parse existing notes
      notes.push(newNote); // add the parsed note to array

      // After adding the notes to array, write the updated notes array back to `db.json`.
      fs.writeFile(
        path.join(__dirname, 'db', 'db.json'),
        JSON.stringify(notes, null, 2),
        (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Unable to save note.' });
          } else {
            // if there is no error, return newNote
            res.json(newNote);
          }
        }
      );
    }
  });
});

// Basically Delete function will be same as creating one but we have to remove it from the array and return the updated array back to DOM.
app.delete('/api/notes/:id', (req, res) => {
  //Get the unique ID
  const { id } = req.params;

  //Read the existing notes from db
  fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Unable to delete note.' });
    } else {
      // if there is no error, parse the existing notes
      let notes = JSON.parse(data);
      //then Remove the note with the matching ID.
      notes = notes.filter((note) => note.id !== id);


      // Write the updated notes array back to `db.json`.
      fs.writeFile(
        path.join(__dirname, 'db', 'db.json'),
        JSON.stringify(notes, null, 2),
        (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Unable to delete note.' });
          } else {
            res.json({ message: 'Note deleted successfully.' });
          }
        }
      );
    }
  });
});

// HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
