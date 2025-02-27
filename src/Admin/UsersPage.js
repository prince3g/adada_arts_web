import React, { useState, useEffect } from 'react';
import SubAaNav from './SubAaNav';
import AllIcon from './Img/all-arrow.svg';
import DailyUsage from './DailyUsage';
import UsersTable from './UsersTable'; // Assuming you have a UsersTable component
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles

function UsersPage() {
  const API_HOST = process.env.REACT_APP_API_HOST;
  const [allMarked, setAllMarked] = useState(false);
  const [sortOrder, setSortOrder] = useState('mostRecent'); // Default sorting
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [userCount, setUserCount] = useState(0); // State to store the number of users

  // Fetch the number of users from the API when the component mounts
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch(`${API_HOST}api/register/users/`);
        if (response.ok) {
          const data = await response.json();
          setUserCount(data.length); // Assuming the response is an array of users
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserCount();
  }, []);

  const handleDeleteTable = () => {
    if (window.confirm('Are you sure you want to delete all rows?')) {
      document.querySelector('.Tabel_SecOo_main').innerHTML = '';
    }
  };

  const handleMarkAll = () => {
    const rows = document.querySelectorAll('.Tabel_SecOo_main table tr');
    rows.forEach(row => {
      row.style.backgroundColor = allMarked ? '#FFFFFF' : '#F0F5FF';
    });
    setAllMarked(!allMarked);
  };

  const handleFilterClick = (order) => {
    setSortOrder(order);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setShowCalendar(false);
  };

  return (
    <div className='Main_AA_Page'>
      <div className='Page_Top'>
        <div className='site-container'>
          <div className='Main_Page_Top'>
            <div className='Left_AA_Pp_Sec'>
              <h2>Users</h2>
              <p>You have about <b>{userCount}</b> registered users</p>
            </div>
            <div className='Right_AA_Pp_Sec'>
              <SubAaNav />
            </div>
          </div>
        </div>
      </div>

      <div className='site-container'>
        <div className='DD_Ccs'>
          <div className='DD_Ccs_1'>
            <div className='Tabel_SecOo'>
              <div className='Tabel_SecOo_Top'>
                <h3>Registered Users <img src={AllIcon} alt="All" /> <span>{userCount}</span></h3>
                <div className='filter_oo'>
                  <p>Filter:</p>
                  <ul>
                    <li><label><input type="checkbox" checked={sortOrder === 'mostRecent'} onChange={() => handleFilterClick('mostRecent')} className='ChooseInput' /> Most Recent</label></li>
                    <li><label><input type="checkbox" checked={sortOrder === 'old'} onChange={() => handleFilterClick('old')} className='ChooseInput' /> Old</label></li>
                  </ul>
                </div>
              </div>
              <div className='Tabel_SecOo_main'>
                <UsersTable sortOrder={sortOrder} />
              </div>
            </div>
          </div>
          <div className='DD_Ccs_2'>
            <DailyUsage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
