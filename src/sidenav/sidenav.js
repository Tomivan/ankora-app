import React from 'react';
import Logo from '../assets/images/logo.svg';
import Add from '../assets/images/add.svg';
import Calender from '../assets/images/calender.svg';
import Patients from '../assets/images/patients.svg';
import Profile from '../assets/images/profile.svg';
import Search from '../assets/images/search.svg';
import Settings from '../assets/images/settings.svg';
import { Link } from '@reach/router';
import './sidenav.css';

const Sidenav = () => {
    return(
        <div className="nav">
            <img src={Logo} alt="The official ankora logo" className="logo"/>
            <ul>
                <p>Quick actions</p>
                <li><img src={Search} alt="" className="nav-icon" />Search Anything</li>
                <li><img src={Add} alt="" className="nav-icon" />Add a New Patient</li>
                <p>Manage</p>
                <li className="active"><img src={Calender} alt="" className="nav-icon" />Calender</li>
                <li><img src={Patients} alt="" className="nav-icon" />Manage Patients</li>
                <li><img src={Settings} alt="" className="nav-icon" />Settings</li>
            </ul>
            <div className="profile-section">
                <img src={Profile} alt="" className="profile-picture" />
                <div className="profile-details">
                    <p>Acme clinic,Inc.</p>
                    <p>Marvin Tunji-ola</p>
                    <Link to="#"className="link">View Profile</Link>
                </div>
            </div>
        </div>
    )
}

export default Sidenav;