import { useEffect, useState } from "react";
import "./NotesApp.css";

function NotesApp() {
  const [folders, setFolders] = useState({});
  const [selectedFolder, setSelectedFolder] = useState("");
  const [selectedNote, setSelectedNote] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [newNoteName, setNewNoteName] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("myNotesApp");
    if (saved) setFolders(JSON.parse(saved));
  }, []);

  // Save to localStorage
  const saveFolders = (updatedFolders) => {
    setFolders(updatedFolders);
    localStorage.setItem("myNotesApp", JSON.stringify(updatedFolders));
  };

  // Create new folder
  const createFolder = () => {
    if (!newFolderName) return;
    if (folders[newFolderName]) {
      alert("Folder already exists!");
      return;
    }
    const updated = { ...folders, [newFolderName]: {} };
    saveFolders(updated);
    setNewFolderName("");
  };

  // Create new note
  const createNote = () => {
    if (!selectedFolder || !newNoteName) return;
    const folderNotes = folders[selectedFolder];
    if (folderNotes[newNoteName]) {
      alert("Note already exists!");
      return;
    }
    const updated = {
      ...folders,
      [selectedFolder]: { ...folderNotes, [newNoteName]: "" },
    };
    saveFolders(updated);
    setNewNoteName("");
    setSelectedNote(newNoteName);
    setNoteContent("");
  };

  // Select note to edit
  const selectNote = (noteName) => {
    setSelectedNote(noteName);
    setNoteContent(folders[selectedFolder][noteName]);
  };

  // Save note content
  const saveNote = () => {
    if (!selectedFolder || !selectedNote) return;
    const updated = {
      ...folders,
      [selectedFolder]: {
        ...folders[selectedFolder],
        [selectedNote]: noteContent,
      },
    };
    saveFolders(updated);
    alert("Note saved!");
  };

  // Rename note
  const renameNote = () => {
    const newName = prompt("Enter new note name:");
    if (!newName) return;
    if (folders[selectedFolder][newName]) {
      alert("Note with this name already exists!");
      return;
    }
    const folderNotes = folders[selectedFolder];
    const updatedFolder = { ...folderNotes };
    updatedFolder[newName] = updatedFolder[selectedNote];
    delete updatedFolder[selectedNote];
    const updated = { ...folders, [selectedFolder]: updatedFolder };
    saveFolders(updated);
    setSelectedNote(newName);
  };

  return (
    <div className="notes-app">
      {/* Sidebar: folders & notes */}
      <div className="sidebar">
        <h2>Folders</h2>
        <div className="folder-create">
          <input
            placeholder="New folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <button onClick={createFolder}>Add Folder</button>
        </div>

        <ul className="folders-list">
          {Object.keys(folders).map((folder) => (
            <li key={folder}>
              <strong
                className={`folder-name ${selectedFolder === folder ? "active-folder" : ""}`}
                onClick={() => setSelectedFolder(folder)}
              >
                {folder}
              </strong>
              <ul className="notes-list">
                {selectedFolder === folder &&
                  Object.keys(folders[folder]).map((note) => (
                    <li
                      key={note}
                      onClick={() => selectNote(note)}
                      className={selectedNote === note ? "active-note" : ""}
                    >
                      {note}
                    </li>
                  ))}
              </ul>
              {selectedFolder === folder && (
                <div className="note-create">
                  <input
                    placeholder="New note name"
                    value={newNoteName}
                    onChange={(e) => setNewNoteName(e.target.value)}
                  />
                  <button onClick={createNote}>Add Note</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Editor */}
      <div className="editor">
        {selectedNote ? (
          <div>
            <h2>
              Editing: {selectedNote}{" "}
              <button className="rename-btn" onClick={renameNote}>
                Rename Note
              </button>
            </h2>
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            />
            <br />
            <button className="save-btn" onClick={saveNote}>
              Save Note
            </button>
          </div>
        ) : (
          <p>Select a note to edit</p>
        )}
      </div>
    </div>
  );
}

export default NotesApp;
