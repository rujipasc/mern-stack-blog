const NavbarComponent = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <ul className="nav nav-tab text-start">
                    <li className="nav-item pr-3 pt-3 pt-3">
                        <a href="/"  className="nav-link">Home</a>
                    </li>
                    <li className="nav-item pr-3 pt-3 pt-3">
                        <a href="/create" className="nav-link">Blogs</a>
                    </li>
                    <li className="nav-item pr-3 pt-3 pt-3">
                        <a href="/login" className="nav-link">Login</a>
                    </li>
                </ul>
            <hr/>
            </div>
        </nav>
    )
};

export default NavbarComponent;