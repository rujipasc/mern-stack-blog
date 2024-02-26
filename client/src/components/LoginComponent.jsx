import NavbarComponent from "./navbarComponent";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate } from "../../services/authorize";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;


const LoginComponent = () => {
    const [state, setState] = useState({
        username: '',
        password: ''
    })
    const { username, password } = state;
    const navigate = useNavigate();

    const inputValue = name => e => {
        setState({ ...state, [name]: e.target.value });
    };

    const submitForm = (e) => {
        e.preventDefault();
        console.table({ username, password });
        axios
        .post(`${apiUrl}/login`, { username, password })
        .then(response=> {
            authenticate(response, () => navigate('/') );
        })
        .catch(err => {                
            Swal.fire({
            position: 'center',
            icon: 'error',
            title: "Notification",
            text: err.response.data.error,
            showConfirmButton: true,
        });
    });
    };
    return (
        <div className="container p-5">
            <NavbarComponent />
            <h1>เข้าสู่ระบบ / Login</h1>
            {/* {JSON.stringify(state)} */}
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" 
                        value={username} 
                        onChange={inputValue('username')} 
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" 
                        value={password} 
                        onChange={inputValue('password')} 
                    />
                </div>
                <div><br />
                    <input type="submit" value="Login" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
};

export default LoginComponent;