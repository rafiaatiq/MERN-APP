import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Read () {
    const [data, setData] = useState();
    const [error, setError] = useState("");

    let getData = async () => {
        const response = await fetch("http://localhost:8080", {

        })
        const result = await response.json();

        if(!response.ok) {
            console.log(result.error);
            setError(result.error);
        }
        if(response.ok) {
            console.log(result);
            setData(result);
        }
    }

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:8080/${id}`, {
            method : "DELETE"
        })
        const result = await response.json();

        if(!response.ok) {
            console.log(result.error);
            setError(result.error);
        }
        if(response.ok) {
            setError("Deleted Successfully");
            setTimeout(()=> {
                setError("");
                getData();
            }, 2000)
        }
    }

    useEffect(()=>{
        getData();
    }, [])

    // console.log(data);

    return (
        <div className="container my-2">
            {error && <div className="alert alert-danger">{error}</div>}

            <h1 className="text-center">Show all Data</h1>

            <div className="row">
                {data?.map((el)=> (  //optional rendering
                    <div key={el._id} className="col-3">
                        <div className="card" >
                            <div className="card-body">
                                <h5 className="card-title">{el.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{el.email}</h6>
                                <p className="card-text">{el.age}</p>
                                <a href="#" className="card-link" onClick={() => handleDelete(el._id)}>Delete</a>
                                <Link to={`/${el._id}`} className="card-link">Edit</Link>
                            </div>
                        </div>
                    </div>
                ))}
                

            </div>
        </div>
    )
}