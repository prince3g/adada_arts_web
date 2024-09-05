import React, { useState, lazy, Suspense } from 'react';

const Navbar = lazy(() => import('./Navbar'));
const SubNavbar = lazy(() => import('./SubNavbar'));

const NavbarWrapper = () => {
  const [isSubNavVisible, setIsSubNavVisible] = useState(true);

  const toggleSubNav = () => {
    setIsSubNavVisible(!isSubNavVisible);
  };

  return (
    <div className='Navbar_Wrapper'>
      <Suspense fallback={<div></div>}>
        <Navbar toggleSubNav={toggleSubNav} isSubNavVisible={isSubNavVisible} />
      </Suspense>
      <Suspense fallback={<div></div>}>
        <SubNavbar isSubNavVisible={isSubNavVisible} />
      </Suspense>
    </div>
  );
};

export default NavbarWrapper;
