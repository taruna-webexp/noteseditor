# Next.js Note-Taking Application

A simple note-taking application built with Next.js 15 and Quill text editor. This project allows users to create, edit, delete, and auto-save notes to local storage. The application provides a rich text editing experience and stores all notes locally, allowing users to retain their data even after refreshing the page.

## Features

- Rich Text Editing: Use Quill for formatting notes with support for headings, bold, italic, underline, lists, images, and code blocks.
- Create, Edit, and Delete Notes: Save new notes, edit existing ones, and delete notes as needed.
- Auto-Save: Automatically save content every 5 seconds to prevent data loss.
- Local Storage: All notes are stored in the browser’s local storage for persistent data retention.

### Technologies Used

- Next.js 15 - Framework for building the application.
- Quill.js - A powerful, customizable rich-text editor.
- Local Storage - For saving notes locally in the browser.
- Tailwind CSS - Utility-first CSS framework for styling.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 18.17.0 or later) and npm/yarn installed.
- Familiarity with React, Next.js, and basic knowledge of CSS.

## Installation

Clone the repository:

git clone <repository-url>
cd your-project-directory

## Install the dependencies

### Using npm:

```bash
npm install
or if you are using yarn:

yarn install
Start the development server:

npm run dev
or if you are using yarn:

yarn dev
```

## Usage:

- Adding Notes: Enter your text in the Quill editor and click "Save Note" to add it to the list of saved notes.
- Editing Notes: Click "Edit" on a saved note, make changes, and click "Update Note" to save changes.
- Deleting Notes: Click "Delete" to remove a note from the list.
- Auto-Saving: The editor will automatically save content to local storage every 5 seconds.

## Project Structure

- components: Contains the TextEditor component for the note-taking interface.
- styles: Holds the global CSS and Tailwind configurations.
- public: Assets like icons, images, and additional static files.

### Contributing

- Fork the repository
- Create a new branch (git checkout -b feature-branch)
- Make your changes
- Commit your changes (git commit -m 'Add feature')
- Push to the branch (git push origin feature-branch)
- Open a pull request

🛠 Skills

Next.js, Quill, Tailwind CSS, JavaScript, HTML, CSS
