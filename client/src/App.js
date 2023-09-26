import React, { useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import NavBar from './components/NavBar/NavBar';
import DashBoard from './pages/DashBoard/DashBoard';
import LandingPage from './pages/LandingPage/LandingPage';
import About from './pages/About/About';
import { Route, Routes } from 'react-router-dom';
import { gapi } from 'gapi-script'
import UserProvider from './providers/UserProvider';
import ModalWrapper from './components/ModalWrapper/ModalWrapper';
import { fetchUsers } from './api/userService';
import { useAuth } from './hooks/useAuth';
import { addData } from './store/actions/exampleActions';
import { useSelector, useDispatch } from 'react-redux';
import { getJwt } from './utils/jwt';
import PrivateRoute from './pages/PrivateRoute/PrivateRoute';

const clientId = "222446683679-vpec4kjicc7travev7cf7ue3hh1s2kju.apps.googleusercontent.com";

function App() {
  const { isAuthenticated } = useAuth();
  // const data = useSelector((state) => state.example.data);
  // console.log(data);
  const dispatch = useDispatch();

  const fetchNbaNewsData = async () => {
    const options = {
      method: 'GET',
      params: { limit: '5' },
      url: 'https://nba-latest-news.p.rapidapi.com/articles',
      headers: {
        'X-RapidAPI-Key': '97b3d67fd7msh8ae0214eedae588p157a2cjsn1de270448a3e',
        'X-RapidAPI-Host': 'nba-latest-news.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    // axios.get(fetchUsers) // Update with your API endpoint
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
    // fetchNbaNewsData();
    // fetchNbaTeamData();

  }, []);

  // const handleAddData = () => {
  //   dispatch(addData('New Data'));
  //   console.log(data)
  // };

  const checkAuthentication = (page) => isAuthenticated ? page : <LandingPage />;

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
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div>
        </header>

        {/* <LoginButton />
        <LogoutButton /> */}
        {/* <Form /> */}


        <main>
          <div>
            {/* <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"> */}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<About />} />


              <Route path="/dashboard" element={isAuthenticated ? <DashBoard /> : <LandingPage />} />
            </Routes>
          </div>
        </main>
      </UserProvider>


    </div>
  );
}


export default App;
