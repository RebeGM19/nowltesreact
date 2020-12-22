import React, { Fragment, useState } from 'react';
import './App.css';

type FormElement = React.FormEvent<HTMLFormElement>
interface INote {
  name: string;
  done: boolean;
}

function App(): JSX.Element {

  const [newNote, setNewNote] = useState<string>('')
  const [notes, setNotes] = useState<INote[]>([])

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addNote(newNote)
    console.log(notes)
    setNewNote('')
  }

  const addNote = (name: string) => {
    const newNotes: INote[] = [...notes, { name: name, done: false }]
    setNotes(newNotes)
  }

  const toggleDoneNote = (index: number): void => {
    const newNotes: INote[] = [...notes];
    newNotes[index].done = !newNotes[index].done;
    setNotes(newNotes);
  }

  const removeNote = (index: number): void => {
    const allNotes: INote[] = [...notes];
    allNotes.splice(index,1);
    setNotes(allNotes);
  }

  return (
    <div className="container p4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input type="text" onChange={e => setNewNote(e.target.value)} value={newNote} className="form-control" autoFocus />
                <button className="btn btn-success btn-block mt-2">Save</button>
              </form>
            </div>
          </div>

          {
            notes.map((t: INote, i: number) => (
              <div className = "card card-body mt-2" key={i}>
                <h2 style={{textDecoration: t.done ? 'line-through' : ''}}>{t.name}</h2>
                <div>
                  <button className="btn btn-secondary" onClick={() => toggleDoneNote(i)}>
                    {t.done ? '✓' : '✗'}
                  </button>
                  <button className="btn btn-danger" onClick={() => removeNote(i)}>
                    🗑
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
