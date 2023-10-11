import React, { useEffect } from 'react';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import DashBoard from './pages/DashBoard/DashBoard';
import LandingPage from './pages/LandingPage/LandingPage';
import About from './pages/About/About';
import Profile from './pages/Profile/Profile';
import HomePage from './pages/HomePage/HomePage';
import MyTeam from './pages/MyTeam/MyTeam';
import PlayerSearch from './pages/PlayerSearch/PlayerSearch';
import { Route, Routes } from 'react-router-dom';
import { gapi } from 'gapi-script'
import UserProvider from './providers/UserProvider';
import ModalWrapper from './components/ModalWrapper/ModalWrapper';
import { userApi } from './api/userService';
import { useAuth } from './hooks/useAuth';
import { addData } from './store/actions/exampleActions';
import { useSelector, useDispatch } from 'react-redux';

const clientId = "222446683679-vpec4kjicc7travev7cf7ue3hh1s2kju.apps.googleusercontent.com";

function App() {
  const { isAuthenticated } = useAuth();
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();



  useEffect(() => {
    // axios.get(userApi) // Update with your API endpoint
    //   // .then((response) => response.json())
    //   .then((data) => {
    //     // setItems(data);
    //     console.log(data.data)
    //   })
    //   .catch((error) => console.error('Error fetching data:', error));

    // // const accessToken = gapi.auth.getToken().access_token;

    // function start() {
    //   gapi.client.init({
    //     clientId: clientId,
    //     scope: ""
    //   })
    //   gapi.load('client:auth2', start);
    // }

  }, []);



  // const handleAddData = () => {
  //   dispatch(addData('New Data'));
  //   console.log(data)
  // };

  return (
    <div className="App">
      <UserProvider>
        <NavBar />
        <ModalWrapper />
        {/* <button onClick={handleAddData}>Add Data</button> */}
        {/* <ul>
          {data && data.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul> */}
        {/* {isAuthenticated ?
          <Header isAuthenticated={isAuthenticated} />
          : null
        } */}
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={isAuthenticated ? <DashBoard /> : <LandingPage />}>
              <Route path="home" element={<HomePage />} />
              <Route path="myteam" element={<MyTeam />} />
              <Route path="players" element={<PlayerSearch />} />
            </Route>
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <LandingPage />} />
          </Routes>
        </main>
      </UserProvider>
    </div >
  );
}


export default App;
