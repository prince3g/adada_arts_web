import React, { useState, useEffect } from 'react';
import AllIcon from './Img/all-arrow.svg';
import AdminAd from './Img/adminAd.png';

function DailyUsage() {
  const API_HOST = process.env.REACT_APP_API_HOST;
  const [instructorsCount, setInstructorsCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [registeredUsers, setRegisteredUsers] = useState(0); // State to store registered users count

  // Define target value
  const targetUsers = 100;
  
  // Calculate performance percentage
  const performancePercentage = (registeredUsers / targetUsers) * 100;

  useEffect(() => {
    const fetchInstructorsCount = async () => {
      try {
        const response = await fetch(`${API_HOST}api/courses/instructors/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInstructorsCount(data.length);
      } catch (error) {
        console.error('Failed to fetch instructors count:', error);
      }
    };

    const fetchCoursesCount = async () => {
      try {
        const response = await fetch(`${API_HOST}api/courses/courses/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCoursesCount(data.length);
      } catch (error) {
        console.error('Failed to fetch courses count:', error);
      }
    };

    const fetchCategoriesCount = async () => {
      try {
        const response = await fetch(`${API_HOST}api/courses/category/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategoriesCount(data.length);
      } catch (error) {
        console.error('Failed to fetch categories count:', error);
      }
    };

    const fetchRegisteredUsersCount = async () => {
      try {
        const response = await fetch(`${API_HOST}api/register/users/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRegisteredUsers(data.length); // Assuming the API returns an array of users
      } catch (error) {
        console.error('Failed to fetch registered users count:', error);
      }
    };

    fetchInstructorsCount();
    fetchCoursesCount();
    fetchCategoriesCount();
    fetchRegisteredUsersCount(); // Fetch registered users count
  }, []);

  return (
    <div className='Usage_Box'>
      <h3>Daily Site Usage</h3>
      <ul className='Tt_ul'>
        <li>
          <p>Categories</p>
          <span><img src={AllIcon} alt="Icon" />{categoriesCount}</span>
        </li>
        <li>
          <p>Courses</p>
          <span><img src={AllIcon} alt="Icon" />{coursesCount}</span>
        </li>
        <li>
          <p>Instructors</p>
          <span><img src={AllIcon} alt="Icon" />{instructorsCount}</span>
        </li>
      </ul>
      <img src={AdminAd} className='Add_Banner' alt="Admin Advertisement" />
      <h4>Performance</h4>

      {/* Registered Users Performance */}
      <div className='PfmN_BOx'>
        <div className='Top_PfmN_BOx'>
          <div className='hhG_1'>
            <h6>Registered Users</h6>
            <span className='All_Bar'>
              <span
                className='Main_bar'
                style={{ width: `${performancePercentage}%` }} // Adjust width based on performance percentage
              ></span>
            </span>
          </div>
          <ul>
            <li>
              <p>Target</p>
              <span>{targetUsers}</span>
            </li>
            <li>
              <p>Performance</p>
              <span>{registeredUsers} / {performancePercentage.toFixed(2)}%</span> {/* Display percentage with 2 decimal places */}
            </li>
          </ul>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className='PfmN_BOx'>
        <div className='Top_PfmN_BOx'>
          <div className='hhG_1'>
            <h6>Enrolled Courses</h6>
            <span className='All_Bar'>
              <span className='Main_bar low_percent ten_pec'></span>
            </span>
          </div>
          <ul>
            <li>
              <p>Target</p>
              <span>100</span>
            </li>
            <li>
              <p>Performance</p>
              <span>10 / 10%</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Visitors */}
      <div className='PfmN_BOx'>
        <div className='Top_PfmN_BOx'>
          <div className='hhG_1'>
            <h6>Visitors</h6>
            <span className='All_Bar'>
              <span className='Main_bar high_percent eith_pec'></span>
            </span>
          </div>
          <ul>
            <li>
              <p>Target</p>
              <span>100</span>
            </li>
            <li>
              <p>Performance</p>
              <span>80 / 80%</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DailyUsage;
