import React, {useEffect, useState} from 'react';
import './App.css';
import CreateUserForm
 from './components/CreateUserForm';
 import axios from 'axios';

 
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

    // function start() {
    //   gapi.client.init({
    //     clientId: clientId,
    //     scope: ""
    //   })
    //   gapi.load('client:auth2', start);
    // }
  }, []);

  return (
    <div className="App">
    <CreateUserForm />
    </div>
  );
}

export default App;
