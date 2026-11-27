import { useEffect,useState } from "react";

export default function Students(){
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(1);


    const perPage=2;
  
    

    useEffect(()=>{

        fetch(`http://localhost:3000/students?_page=${page}&_per_page=${perPage}`)
            .then((res)=>{
                return res.json()
            })
            .then((data)=>{
                setStudents(data.data)
            })
    },[page]);


    return (
        <div>
            <h1>Students List</h1>
            {students.map(student=>(
                <p key={student.id}>{student.name}</p>
            ))}

            <button
                onClick={()=>setPage(page-1)}
                disabled={page===1}
            >Previous</button>
            <span> Page {page} </span>

            <button
                onClick={()=>setPage(page+1)}
               disabled={students.length<perPage}
                
            >Next</button>
        </div>

    )
}
