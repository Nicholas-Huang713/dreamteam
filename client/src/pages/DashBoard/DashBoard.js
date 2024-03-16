import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../api/userService';
import { updateUserData } from '../../store/actions/userActions';
import Header from '../../components/Header/Header';
import { NavLink, Outlet } from 'react-router-dom';

const activeLink = {
  fontWeight: 'bold',
  textDecoration: 'underline'
}

const Dashboard = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user);
  const teamAffil = userData.affiliation
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (Object.keys(userData).length === 0) {
      const getUserInfo = async () => {
        const info = await getUser();
        dispatch(updateUserData(info))
      }
      getUserInfo()
    }
  }, [dispatch, userData])

  return (
    <>
      <Header teamAffil={teamAffil} currentPage="Dashboard" />
      <div className="flex mx-auto max-w-7xl">
        {isLargeScreen && (
          <div className="text-orange-500 h-screen w-1/5 p-4 border-r-2">
            <ul className="mt-4">
              <li className="mb-2">
                <NavLink
                  to="home"
                  className="flex items-center hover:text-orange-500"
                  style={({ isActive }) =>
                    isActive ? activeLink : null
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                  &nbsp;Home
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="myteam"
                  className="flex items-center hover:text-orange-500"
                  style={({ isActive }) =>
                    isActive ? activeLink : null
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                  &nbsp;MyTeam
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink
                  to="players"
                  className="flex items-center hover:text-orange-500"
                  style={({ isActive }) =>
                    isActive ? activeLink : null
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="11" />
                    <path d="M4 12 C8 16 16 16 20 12" />
                    <path d="M4 12 C8 8 16 8 20 12" transform="rotate(180 12 12)" />
                  </svg>
                  &nbsp;Players
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        <div
          className={`p-4 ${isLargeScreen ? 'w-full md:w-4/5' : 'w-full'} overflow-hidden`}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
