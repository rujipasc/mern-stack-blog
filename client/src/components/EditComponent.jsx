/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import NavbarComponent from "./navbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const apiUrl = import.meta.env.VITE_API_URL;


const EditComponent = () => {
    const [state, setState] = useState({
        title: '',
        author: '',
        slug: ''
    });
    const { slug } = useParams();
    const { title, author } = state;

    const [content, setContent] = useState('');

    const submitContent = (e) => {
        setContent(e);
    };
    
    useEffect(() => {
        // Fetch blog post data when `slug` changes
        const fetchBlogPost = async () => {
            try {
                // const apiUrl = 'your_api_url'; // Replace with your actual API URL
                const response = await axios.get(`${apiUrl}/blog/${slug}`);
                const { title, content, author } = response.data;
                setState(prevState => ({ ...prevState, title, author })); // Functional update for state
                setContent(content); // Set content separately
            } catch (e) {
                console.error('There was an error fetching the blog post:', e);
                // Handle the error appropriately
            }
        };

        fetchBlogPost();
    }, [slug]);
    // useEffect(() => {
    //     // Assuming you have an API endpoint to fetch a blog by slug
    //     axios.get(`${apiUrl}/blog/${slug}`)
    //         .then(response => {
    //             const { title, content, author } = response.data;
    //             setState({ ...state, title, author, slug });
    //             setContent(content);
    //         })
    //         .catch(error => {
    //             console.error('There was an error fetching the blog post:', error);
    //             // Handle the error appropriately
    //         });
    // }, [state]);

    const showUpdateForm = () => (
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
                        style={{ height: "300px", border: "1px solid #d6d6d6" }}
                />
            </div>
            <div className="form-group">
                <label>ผู้แต่ง / Author</label>
                <input type="text" className="form-control" value={author} onChange={inputValue('author')} />
            </div>
            <div><br />
                <input type="submit" value="Update" className="btn btn-primary" />
            </div>
        </form>
    )
    const inputValue = name => e => {
        setState({ ...state, [name]: e.target.value });
    };
    const submitForm = (e) => {
            e.preventDefault();
            axios.put(`${apiUrl}/blog/${slug}`, { title, content, author })
            .then((response)=>{
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Content Updated Successfully',
                    text: response.data.message,
                    confirmButtonText: 'OK!',
                  });
                  const { title, content, author } = response.data;
                  setState({...state, title, author})
                  setContent(content);
            })
            .catch(err=>{
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
            <h1>แก้ไขบทความ / Edit Content</h1>
            {showUpdateForm()}
        </div>
    )
};

export default EditComponent;