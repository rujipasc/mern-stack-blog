/* eslint-disable no-unused-vars */
import NavbarComponent from "./components/navbarComponent"
import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import DOMPurify from 'dompurify';

const apiUrl = import.meta.env.VITE_API_URL;


function App() {
  const [blogs, setBlogs] = useState([]); // สร้าง state ชื่อ blogs และ function ชื่อ setBlogs ขึ้นมา  และกำหนดค่าเริ่มต้นเป็น array ว่าง ๆ 
  const fetchData = () => {
    axios.get(`${apiUrl}/blogs`)
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  //render HTML content
  const createMarkup = (htmlContent) => {
    return { __html: DOMPurify.sanitize(htmlContent) };
  };
  
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
    <div className="container p-5">
      <NavbarComponent />
      {blogs.map((blog, index) => (
        <div className="row" key={index} style={{ borderBottom: '1px solid silver' }}>
          <div className="col pt-3 pb-2">
            <Link to={`/blog/${blog.slug}`}>
              <h2> {blog.title} </h2>
            </Link>
          </div>
          <div className="pt-3" dangerouslySetInnerHTML={createMarkup(blog.content.substring(0, 300))}></div>
          <div>
            <p className="text-muted">ผู้เขียน / Author: {blog.author}, เผยแพร่ / Published: {new Date(blog.createdAt).toLocaleString()} </p>
          </div>
          <p>
            <Link className="btn btn-outline-success" to={`/blog/edit/${blog.slug}`}>Edit Content</Link> &nbsp;
            <button className="btn btn-outline-danger" onClick={() => deleteBlog(blog.slug)}>Remove Content</button>
          </p>
        </div>

      ))}
    </div>
  )
}

export default App;
