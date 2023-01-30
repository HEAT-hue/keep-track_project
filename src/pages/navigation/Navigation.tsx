// jshint esversion:6
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
function Navigation() {
    return (
        <>
            <header className="sticky">
                <span className="logo">
                    <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
                </span>
                <NavLink to="/" className="button rounded">
                    <span className="icon-home"></span>
                    Home
                </NavLink>
                <NavLink to="/projects" className="button rounded">
                    Projects
                </NavLink>
            </header>
            <Outlet />
        </>
    )
}

export { Navigation };