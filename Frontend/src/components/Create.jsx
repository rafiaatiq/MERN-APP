import { useState } from "react"
import {useNavigate} from "react-router-dom"

export default function Create () {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState(0);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    console.log(name, email, age);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const addUser = {name, email, age};

        const response = await fetch("http://localhost:8080/", {
            method: "POST",
            body: JSON.stringify(addUser),
            headers : {
                "Content-Type" : "application/json",
            },
        });
        const result = await response.json();


        if(!response.ok) {
            console.log(result.error);
            setError(result.error);
        }
        if(response.ok) {
            console.log(result);
            setError("");
            setName("");
            setEmail("");
            setAge(0);
            navigate("/all");
        }
    }

    return (
        <div className="container my-2">
            {error && <div className="alert alert-danger">{error}</div>}

            <h2 className="text-center">Enter data</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control"  aria-describedby="emailHelp" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control"  aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label >Age</label>
                    <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}