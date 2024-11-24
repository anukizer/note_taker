### LINK TO RECORDING --> https://youtu.be/RUaWapg6noM

# Note Taker Application

## Description

The **Note Taker** application allows users to write, save, and manage notes. It provides a simple, user-friendly interface to organize thoughts and keep track of tasks. This application uses an **Express.js** back end to manage API routes and stores note data in a `db.json` file. The app is deployed on **Render**, making it accessible online.

## Table of Contents

- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## User Story

As a **small business owner**,  
I want to be able to **write and save notes**  
So that I can **organize my thoughts and keep track of tasks**.

## Acceptance Criteria

1. When the user opens the Note Taker, they are presented with a landing page containing a link to the notes page.
2. When the user clicks the link to the notes page, they see:
   - Existing notes listed in the left-hand column.
   - Empty fields to enter a new note title and the note's text in the right-hand column.
3. When the user enters a new note title and text, a **Save Note** button and **Clear Form** button appear.
4. Clicking **Save Note**:
   - Saves the note and displays it in the left-hand column.
   - Hides the navigation buttons.
5. Clicking an existing note displays it in the right-hand column with a **New Note** button in the navigation.
6. Clicking the **New Note** button clears the form to create a new note and hides the button.
7. Bonus functionality:
   - Deleting a note removes it from the list and the `db.json` file.

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd note-taker
   npm install
   http://localhost:3000

## Features
View Notes: List all existing notes on the left column.
Create Notes: Add new notes with a title and content.
Save Notes: Persist notes to the db.json file.
Delete Notes: Remove notes from the list and db.json.
Dynamic Navigation: Update navigation buttons based on user actions.

## API Endpoints
Method	Endpoint	Description
GET	/api/notes	Retrieves all saved notes from db.json.
POST	/api/notes	Saves a new note and returns the saved note.
DELETE	/api/notes/:id	Deletes a note with the specified ID.

## Technologies Used
Node.js
Express.js
File System (fs) Module
Render Deployment
