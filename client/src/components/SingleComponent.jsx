import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarComponent from './navbarComponent';
import Swal from 'sweetalert2';
import DOMPurify from 'dompurify';

const apiUrl = import.meta.env.VITE_API_URL;

const SingleComponent = () => {
    const navigate = useNavigate();
    const { slug } = useParams(); // Extract the slug from the URL
    const [blog, setBlog] = useState(''); // State to hold the fetched blog data

    const createMarkup = (htmlContent) => {
      return { __html: DOMPurify.sanitize(htmlContent) };
    };

    useEffect(() => {
        // Assuming you have an API endpoint to fetch a blog by slug
        const apiUrl = import.meta.env.VITE_API_URL; // Adjust if your environment variable is different
        axios.get(`${apiUrl}/blog/${slug}`)
            .then(response => {
                setBlog(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the blog post:', error);
                // Handle the error appropriately
            });
    }, [slug]); // Re-run this effect if the slug changes

    const deleteBlog = (slug) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`${apiUrl}/blog/${slug}`)
              .then((response) => {
                Swal.fire(
                  'Deleted!',
                  response.data.message,
                  'success'
                );
              })
              .then((result) => {
                if (result.isConfirmed) {
                  navigate('/');
                }
              })
              .catch((error) => {
                console.error('Deletion error:', error);
                Swal.fire(
                  'Error!',
                  error.response.data,
                  'error'
                );
              });
          }
        });
      }
    return (
        <div className='container p-5'>
            <NavbarComponent />
            {blog && 
            <div>
              <h1>{blog.title}</h1>
              <div className="pt-3" dangerouslySetInnerHTML={createMarkup(blog.content)}></div>
              <p className='text-muted'>ผู้แต่ง / Author: {blog.author}, เผยแพร่ / Published: {new Date(blog.createdAt).toLocaleString()}</p>
           </div>}
             <p>
                <button className="btn btn-outline-success">Edit Content</button> &nbsp;
                <button className="btn btn-outline-danger" onClick={() => deleteBlog(blog.slug)}>Remove Content</button>
            </p>
        </div>
    );
}
export default SingleComponent;
