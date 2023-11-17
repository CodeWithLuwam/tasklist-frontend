import './Header.css';
import React from 'react';
import AddTaskIcon from '@mui/icons-material/AddTask';
const Header = () => {
    return (
        <header className="Header">
            <h1><AddTaskIcon />My Tasks and Goals</h1>
        </header>
    );
};


export default Header;