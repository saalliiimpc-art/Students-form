import axios from "axios"
import { useState,useEffect } from "react"
import "./axios.css"


export default function Ax(){
    
    const [students,setStudents]=useState([]);

    const[name,setName]=useState("");
    const[age,setAge]=useState("");
    
    
    const[edit,setEdit]=useState(null);
    
    useEffect(()=>{
        axios.get("http://localhost:3000/students")
            .then((res)=>{
                setStudents(res.data);
            })
    },[]);


    // add student:-
    function addStudent(e){
        e.preventDefault();

        if(name.trim() === ""){
            alert("pls enter your name")
        }else if(age===""){
            alert("pls enter your age")
        }else{
          
            axios.post("http://localhost:3000/students",{
                name: name,
                age: age
            })
            .then((res)=>{
                setStudents([...students, res.data])
                setAge("")
                setName("")
            })
            .catch((err) => {
                alert(err);
            });
        }
    }

    function handleEdit(student) {
        setEdit(student);
        setName(student.name);
        setAge(student.age);
    }
    // update student:-
    async function updateStudent(e){
        e.preventDefault();
        try{
            const responce=await axios.put(`http://localhost:3000/students/${edit.id}`,
                {
                    name: name,
                    age: age
                }

            )
            setStudents(
                students.map((student)=>
                     student.id === edit.id ? responce.data : student
                )
            );
            setName("")
            setAge("")
            setEdit(null);
            alert("Student updated successfully!");
        }catch (error) {
            alert("Update failed!");
        }
    }


    //Delete student:-
    async function handleDelete(id){
        try{
            await axios.delete(`http://localhost:3000/students/${id}`)
            setStudents(
                students.filter((student)=> student.id !== id)

            );
            alert("data deleted")

        }catch(error){
            alert(error.message)

        }
     
        
    }


    return (
        <div className="container">
            <div className="form-card">
                <h1>ADMISSION</h1>

                <form onSubmit={edit ? updateStudent : addStudent}>

                    <input
                        type="text"
                        placeholder="Enter Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value.toLocaleUpperCase())}
                    />

                    <input
                        type="number"
                        placeholder="Enter Your Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />

                    <button type="submit">{edit ? "Update Student" : "Add Student"}</button>

                </form>
            </div>

            <div className="list-card">
                <h1>Students List</h1>

                <ul>
                    {students.map((student) => (
                        <li key={student.id}>
                            <span>{student.name}</span>
                            <span>{student.age} years</span>

                            <button onClick={() => handleEdit(student)}>Edit</button>
                            <button onClick={()=>handleDelete(student.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}