import React, {useState} from "react";

export default function App(){
  const [title, setTitle] = useState("");
  const [type, setType] = useState("docx");
  const [createdId, setCreatedId] = useState(null);

  const createProject = async () => {
    const res = await fetch("http://localhost:8000/projects", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({title, doc_type: type, outline: type==="docx"?["Introduction","Conclusion"]:[], slides: type==="pptx"?["Slide 1","Slide 2"]:[]})
    });
    const j = await res.json();
    setCreatedId(j.project_id || null);
  }

  return (
    <div style={{padding:20,fontFamily:"sans-serif"}}>
      <h1>AI-Assisted Doc Platform (scaffold)</h1>
      <div style={{marginBottom:10}}>
        <input placeholder="Project title" value={title} onChange={e=>setTitle(e.target.value)} />
        <select value={type} onChange={e=>setType(e.target.value)} style={{marginLeft:10}}>
          <option value="docx">Word (.docx)</option>
          <option value="pptx">PowerPoint (.pptx)</option>
        </select>
        <button onClick={createProject} style={{marginLeft:10}}>Create Project</button>
      </div>
      {createdId && <div>Created project ID: {createdId} — visit backend to generate/export (see README)</div>}
      <hr />
      <p>This is a minimal scaffold. Connect it to the backend to continue development.</p>
    </div>
  )
}