import React, {useEffect, useState} from 'react';
import './App.scss';
 import axios from 'axios';
import NavBar from './components/NavBar/NavBar';
import DashBoard from './components/DashBoard/DashBoard';
import LandingPage from './components/LandingPage/LandingPage';
import { Route, Routes } from 'react-router-dom';
import { gapi } from 'gapi-script'
import LoginButton from './components/LoginButton/LoginButton';
import LogoutButton from './components/LogoutButton/LogoutButton';

const clientId = "222446683679-vpec4kjicc7travev7cf7ue3hh1s2kju.apps.googleusercontent.com";

function App() {
  // const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`/api/users`) // Update with your API endpoint
      // .then((response) => response.json())
      .then((data) => {
        // setItems(data);
        console.log(data.data)
      })
      .catch((error) => console.error('Error fetching data:', error));

    // const accessToken = gapi.auth.getToken().access_token;

    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
      gapi.load('client:auth2', start);
    }
  }, []);

  return (
    <div className="App">
      <NavBar />
      {/* <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div>
        </header> */}
        <LoginButton />
        <LogoutButton />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<DashBoard />} />
              {/* <Route path="/userform" element={<CreateUserForm />} /> */}
            </Routes>
          </div>
        </main>


    </div>
  );
}

export default App;
