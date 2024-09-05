import React from 'react';
import SubAaNav from './SubAaNav';
import AllIcon from './Img/all-arrow.svg';
import DailyUsage from './DailyUsage';

function ProfileSettings() {
  return (
    <div className='Main_AA_Page'>
      <div className='Page_Top'>
        <div className='site-container'>
          <div className='Main_Page_Top'>
            <div className='Left_AA_Pp_Sec'>
              <h2>Settings</h2>
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
                <h3>
                  Profile settings <img src={AllIcon} alt="All" /> 
                  <span>{/* Assuming notifications count to be added here */}</span>
                </h3>
              </div>
              <div className='Tabel_SecOo_main'>
                {/* ProfileSettings Development */}
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

export default ProfileSettings;
