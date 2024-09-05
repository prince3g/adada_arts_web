import React from 'react';

const AdminFooter = () => {
  return (
    <footer className="Aa_site_footer">
      <div className="site-container">
        <div className='Aa_footer_content'>
        <p>© {new Date().getFullYear()} A.R.T.S</p>
        <ul>
          <li><a href="#">Privacy policy</a></li>
          <li><a href="#">Terms of service</a></li>
        </ul>
      </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
