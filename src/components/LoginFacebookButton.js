import React from 'react';
import { FaFacebookF } from 'react-icons/fa'; // Ícono de Facebook
import ReactFacebookLogin from 'react-facebook-login';
import '../App.css';
import { Button } from '@mui/material';

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
                <Button
                    variant="contained"
                    onClick={renderProps.onClick}
                    fullWidth
                    sx={{
                        mt: 3,
                        padding: 1.5,
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, #3b5998, #8b9dc3)', // Colores estilo Facebook
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #334d84, #7391b5)',
                        },
                    }}
                >
                    <FaFacebookF className="my-facebook-icon" />
                    Continuar con Facebook
                </Button>
            )}
        />
    );
};

export default LoginFacebookButton;
