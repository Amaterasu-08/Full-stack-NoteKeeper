import React from 'react'
import { useState, useEffect } from 'react'
import api from '../api'
import Note from '../components/Note';
import "../styles/Home.css"

const Home = () => {

  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");  

  useEffect(()=>{
    getNotes();
  },[])

  // get all the notes the user has written
  const getNotes = ()=>{
    api.get("/api/notes/")
    .then((res)=> res.data)
    .then((data)=> {setNotes(data); console.log(data)})
    .catch((error)=>console.log(error));

  }

  const deleteNotes=(id)=>{
    api.delete(`/api/notes/delete/${id}/`).then((res)=>{
      if(res.status === 204) alert("Note Deleted!!!")
      else alert("Failed to delete note")

      getNotes();

    }).catch((error) => {
      alert(error);
      console/log(error)
    })
  }

  const createNote =(e)=>{
    e.preventDefault();
    api.post("/api/notes/", {content, title}).then((res)=>{
      if(res.status === 201) alert("Note Created!")
      else alert("Failed to make notes")

      getNotes();

    }).catch((error)=>{
      alert(error);
      console.log(error)
    });

  }

  return (
    <main>
      <div>
        <h2>Notes</h2>
        {notes.map((note)=> <Note note={note} onDelete={deleteNotes} key={note.id} />
        )}
      </div>

      <div>
        <h2>Create a Note</h2>
        <form onSubmit={createNote}>
          <label htmlFor='title' >Title:</label>
          <br/>
          <input type='text' id='title' name='title' required onChange={(e)=>setTitle(e.target.value)} value={title} />

          <label htmlFor='content'>Content:</label>
          <br/>
          <textarea id='content' name='content' required value={content} onChange={(e) => setContent(e.target.value)} ></textarea>
          <br/>
          <input type='submit' value="Submit"></input>
        </form>
      </div>
    </main>
  )
}

export default Home
