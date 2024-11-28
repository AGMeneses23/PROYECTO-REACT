import React from 'react';
import { FaFacebookF } from 'react-icons/fa'; // Ícono de Facebook
import ReactFacebookLogin from 'react-facebook-login';
import '../App.css';

const LoginFacebookButton = ({ responseFacebook }) => {
    return (
        <ReactFacebookLogin
            appId="1350371409676994"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass="my-facebook-button-class"
            textButton="Continuar con Facebook"
            render={(renderProps) => (
                <button
                    className="my-facebook-button-class"
                    onClick={renderProps.onClick}
                >
                    <FaFacebookF className="my-facebook-icon" />
                    Continuar con Facebook
                </button>
            )}
        />
    );
};

export default LoginFacebookButton;
