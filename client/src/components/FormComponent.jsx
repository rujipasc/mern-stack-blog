/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "./navbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const apiUrl = import.meta.env.VITE_API_URL;

const FormComponent = () => {
    const [state, setState] = useState({
        title: '',
        author: ''
    });
    const { title, author } = state;

    const [content, setContent] = useState('');

    const inputValue = name => e => {
        setState({ ...state, [name]: e.target.value });
    };
    const submitContent = (e) => {
        setContent(e);
    };

    const submitForm = (e) => {
        e.preventDefault();
        // console.log("API URL: ", apiUrl);
        axios.post(`${apiUrl}/create`, { title, content, author })
            .then(response => {
                Swal.fire('Notification', 'Content is created successfully', 'success')
                setState({ ...state, title: '', author: '' })
                setContent('')
            })
            .catch(err => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "Oops...",
                    text: err.response.data.error,
                    showConfirmButton: true,
                });
            });
    };
    return (
        <div className="container p-5">
            <NavbarComponent />
            <h1>เขียนบทความ / Content Create</h1>
            {/* {JSON.stringify(state)} */}
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>ชื่อบทความ / Title</label>
                    <input type="text" className="form-control" value={title} onChange={inputValue('title')} />
                </div>
                <div className="form-group">
                    <label>รายละเอียด / Detail</label>
                    <ReactQuill
                        value={content}
                        onChange={submitContent}
                        theme="snow"
                        className="pb-5 mb-3"
                        placeholder="เขียนบทความของคุณที่นี่... / Write your content here..."
                        style={{ height: "300px", border: "1px solid #d6d6d6" }}
                    />
                </div>
                <div className="form-group">
                    <label>ผู้แต่ง / Author</label>
                    <input type="text" className="form-control" value={author} onChange={inputValue('author')} />
                </div>
                <div><br />
                    <input type="submit" value="Submit" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
};

export default FormComponent;