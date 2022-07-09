import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StudentSelect } from "../userScreen/StudentSelect";

export const StudentScreen = () => {

    let params = useParams();
    let navigate = useNavigate();
    
    return (
        <div className="Screen">
            <h1>{params.studentName}</h1>
            <button onClick={() => navigate("wordList")}>Word List</button>
        </div>
    )
}
