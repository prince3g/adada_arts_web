import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function SubAaNav() {
  const location = useLocation();
  const isOverviewActive = location.pathname === '/admin/' || location.pathname === '/admin';

  return (
    <div className='Sub_Aa_Nav'>
      <ul>
        <li>
          <NavLink 
            to="/admin/" 
            end 
            className={isOverviewActive ? 'active_Aa_NV_Icn' : ''}
          >
            Overview
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/a-courses" 
            className={({ isActive }) => isActive ? 'active_Aa_NV_Icn' : ''}
          >
            Courses
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/a-categories" 
            className={({ isActive }) => isActive ? 'active_Aa_NV_Icn' : ''}
          >
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/a-instructors" 
            className={({ isActive }) => isActive ? 'active_Aa_NV_Icn' : ''}
          >
            Instructors
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/a-users" 
            className={({ isActive }) => isActive ? 'active_Aa_NV_Icn' : ''}
          >
            Users
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/a-notification" 
            className={({ isActive }) => isActive ? 'active_Aa_NV_Icn' : ''}
          >
            Notification
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/a-settings" 
            className={({ isActive }) => isActive ? 'active_Aa_NV_Icn' : ''}
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SubAaNav;
