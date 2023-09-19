import {GoogleLogin} from 'react-google-login';

const clientId = "222446683679-vpec4kjicc7travev7cf7ue3hh1s2kju.apps.googleusercontent.com";

function LoginButton() {
    const onSuccess = (res) => {
        console.log("Login Success! Current user: ", res.profileObj)
    }

    const onFailure = (res) => {
        console.log("Failed Login! res: ", res)
    }
    return (
        <div>
            <GoogleLogin 
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default LoginButton;