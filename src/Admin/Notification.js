import React, { useState } from 'react';
import SubAaNav from './SubAaNav';
import AllIcon from './Img/all-arrow.svg';
import DailyUsage from './DailyUsage'; 

function Notification() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Health And Social Care Accredited Courses',
      date: '8/18/2024',
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    },
    {
      id: 2,
      title: 'Adult Care Mandatory Courses',
      date: '8/30/2024',
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    },
    {
      id: 3,
      title: 'Supply Chain And Contract Management',
      date: '9/2/2024',
      description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    },
  ]);

  const [sortOrder, setSortOrder] = useState('mostRecent');

  const sortedNotifications = notifications.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'mostRecent' ? dateB - dateA : dateA - dateB;
  });

  const handleFilterClick = (order) => {
    setSortOrder(order);
  };

  const handleRemoveNotification = (id) => {
    const confirmation = window.confirm('Are you sure you want to remove this notification?');
    if (confirmation) {
      const updatedNotifications = notifications.filter(notification => notification.id !== id);
      setNotifications(updatedNotifications);
    }
  };

  return (
    <div className='Main_AA_Page'>
      <div className='Page_Top'>
        <div className='site-container'>
          <div className='Main_Page_Top'>
            <div className='Left_AA_Pp_Sec'>
              <h2>Notification</h2>
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
                <h3>Uploaded notifications <img src={AllIcon} alt="All" /> <span>{notifications.length}</span></h3>
                <div className='filter_oo'>
                  <p>Filter:</p>
                  <ul>
                    <li><label><input type="checkbox" checked={sortOrder === 'mostRecent'} onChange={() => handleFilterClick('mostRecent')} className='ChooseInput' /> Most Recent</label></li>
                    <li><label><input type="checkbox" checked={sortOrder === 'old'} onChange={() => handleFilterClick('old')} className='ChooseInput' /> Old</label></li>
                  </ul>
                </div>
              </div>
              <div className='Tabel_SecOo_main'>
                <div className='Nottice_Sec'>
                  {sortedNotifications.map(notification => (
                    <div className='Notice_Box' key={notification.id}>
                      <div className='Tt_nN_BbOx'>
                        <div className='Tt_nN_BbOx_1'>
                          <p>New course notice</p>
                          <h3>{notification.title}</h3>
                        </div>
                        <div className='Tt_nN_BbOx_2'>
                          <div className="action-btns">
                            <a
                              href="javascript:void(0);"
                              style={{ background: '#6FD96F' }}
                              className="edit-courses-Btn"
                            >
                              <i className="icon-user"></i> Edit
                            </a>
                            <button onClick={() => handleRemoveNotification(notification.id)}> Remove</button>
                          </div>
                        </div>
                      </div>
                      <div className='Bb_auys'>
                        <p>{notification.description}</p>
                      </div>
                      <div className='hga_slla'>
                        <span>{notification.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
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

export default Notification;
