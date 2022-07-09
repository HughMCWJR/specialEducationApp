import * as React from "react";
import { useNavigate } from "react-router-dom";
import { TestUser } from "../../backend/user";

export const MainScreen = () => {

    const navigate = useNavigate();
    
    return (
        <div className="Screen">
            <button onClick={() => {navigate(TestUser.name)}}>fake-Login</button>
        </div>
        
    )
}
