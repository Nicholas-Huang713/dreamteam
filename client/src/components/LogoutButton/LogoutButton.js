import {GoogleLogout} from 'react-google-login';

const clientId = "798778873798-seceoqhfukvss64t2o7u5iufrb9ckn0m.apps.googleusercontent.com";

function LogoutButton() {
    const onSuccess = () => {
        console.log("Logout Success")
    }

    return (
        <div>
            <GoogleLogout 
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}

            />
        </div>
    )
}

export default LogoutButton;