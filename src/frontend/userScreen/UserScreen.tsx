import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StudentSelect } from "./StudentSelect";

export const UserScreen = () => {

    const params = useParams();
    const navigate = useNavigate();
    
    return (
        <div className="Screen">
            <h1>{params.userName}</h1>
            <StudentSelect />
            <button onClick={() => {navigate("addStudent")}}>Add Student</button>
        </div>
    )
}
