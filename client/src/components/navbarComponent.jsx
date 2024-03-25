// const NavbarComponent = () => {
//     return (
//         <nav className="navbar navbar-light bg-light">
//             <div className="container">
//                 <ul className="nav nav-tab text-start">
//                     <li className="nav-item pr-3 pt-3 pt-3">
//                         <a href="/"  className="nav-link">Home</a>
//                     </li>
//                     <li className="nav-item pr-3 pt-3 pt-3">
//                         <a href="/create" className="nav-link">Blogs</a>
//                     </li>
//                     <li className="nav-item pr-3 pt-3 pt-3">
//                         <a href="/login" className="nav-link">Login</a>
//                     </li>
//                 </ul>
//             <hr/>
//             </div>
//         </nav>
//     )
// };

// export default NavbarComponent;

import { Link } from 'react-router-dom';

const NavbarComponent = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> {/* Navbar dark theme */}
            <div className="container-fluid">
                <Link className="navbar-brand text-red" to="/">HRIS</Link> {/* Custom brand color */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active text-white" aria-current="page" to="/">Home</Link> {/* Text white */}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-gray" to="/create">Blogs</Link> {/* Custom text color for gray */}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/login">Login</Link> {/* Text white */}
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-primary" type="submit">Search</button> {/* Button with red outline */}
                    </form>
                </div>
            </div>
        </nav>
    )
};

export default NavbarComponent;

