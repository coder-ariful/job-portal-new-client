import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import AuthContext from '../Context/AuthContext/AuthContext';
import jobLogo from '../assets/images/job-logo.png'; // Assuming you have a logo image

const Navbar = () => {

    const { user, signOutUser } = useContext(AuthContext)

    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/myApplications'}>My Applications</NavLink></li>
        <li><NavLink to={'/myPostedJobs'}>My Posted Jobs</NavLink></li>
        <li><NavLink to={'/addJob'}>Add Job</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a href='/' className="btn btn-ghost text-xl">
                    <img src={jobLogo} alt="Job Logo" className="w-10 h-10 mr-2" />
                    Job Portal
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? (
                        <>
                            {/* <Link to="/profile" className="btn">Profile</Link> */}
                            <button onClick={signOutUser} className="btn">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/register" className="btn">Register</Link>
                            <Link to="/signIn" className="btn">Login</Link>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default Navbar;