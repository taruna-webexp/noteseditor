"use client";
import { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const TextEditor = () => {
  const editorRef = useRef(null);
  const [quill, setQuill] = useState(null);
  const [notes, setNotes] = useState([]);
  const [autoSavedContent, setAutoSavedContent] = useState('');
  const [editIndex, setEditIndex] = useState(null); // Track which note is  edited

  useEffect(() => {
    if (!editorRef.current) return;

    const quillInstance = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['clean']
        ]
      }
    });
    setQuill(quillInstance);

    // Load saved notes from local storage
    const savedNotes = JSON.parse(localStorage.getItem('savedNotes')) || [];
    setNotes(savedNotes);

    // Listen for changes in editor content
    quillInstance.on('text-change', () => {
      setAutoSavedContent(quillInstance.root.innerHTML);
    });

    // Clear editor content initially
    quillInstance.setContents([]);
  }, []);

  //Submit notes 
  const saveNote = () => {
    if (autoSavedContent) {
      let updatedNotes = [...notes];
      if (editIndex !== null) {
        updatedNotes[editIndex] = autoSavedContent;
        setEditIndex(null); // Reset edit index
      } else {
        updatedNotes.push(autoSavedContent);
      }
      setNotes(updatedNotes);
      localStorage.setItem('savedNotes', JSON.stringify(updatedNotes));
      clearEditor();
    }
  };
  //When Submitted notes
  const clearEditor = () => {
    if (quill) {
      quill.setContents([]);
      setAutoSavedContent('');
    }
  };

  //Edit notes
  const editNote = (index) => {
    const noteToEdit = notes[index];
    setAutoSavedContent(noteToEdit);
    setEditIndex(index);
    if (quill) {
      quill.root.innerHTML = noteToEdit;
    }
  };

  //Delete notes
  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem('savedNotes', JSON.stringify(updatedNotes));
    clearEditor();
  };

  // Auto-save to local storage every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoSavedContent) {
        localStorage.setItem('autosaveNote', autoSavedContent);
      }
    }, 5000);
    //Cleanup function
    return () => clearInterval(interval);
  }, [autoSavedContent]);
  return (
    <>
      <h1 className='text-center text-3xl'>Add Note</h1>
      <div className="max-w-2xl mt-12 mx-auto p-5 border border-gray-300 rounded-lg shadow-lg bg-white">
        <div className="!h-92 border border-gray-300 rounded-lg mb-5" ref={editorRef} />
        <button
          className="px-4 py-2 mt-2  bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={saveNote}
        >
          {editIndex !== null ? 'Update Note' : 'Save Note'}
        </button>
        <div className="mt-5">
          <h2 className="text-xl font-semibold">Saved Notes:</h2>
          {notes.length > 0 ? (
            <div className="mt-2 space-y-2">
              {notes.map((note, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-md bg-gray-100">
                  <div dangerouslySetInnerHTML={{ __html: note }} />
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => editNote(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => deleteNote(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No notes saved.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TextEditor;
