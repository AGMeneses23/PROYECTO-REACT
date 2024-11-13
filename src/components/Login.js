import 'animate.css';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error] = useState('')
    const navigate = useNavigate();

    const loginValidate = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            Swal.fire({
                title: 'Campos Obligatorios',
                text: 'Por favor ingresa tanto el correo electrónico como la contraseña.',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        try {
            const response = await axios.post('https://localhost/api/login', {
                email: email,
                password: password
            });
            if (response.data.acceso == 'Ok') {
                localStorage.setItem('token', response.data.token);
                const userName = response.data.nombreUsuario;
                Swal.fire({
                    title: 'Inicio de Sesión Exitoso',
                    text: `¡Bienvenido, ${userName}!`,
                    icon: 'success',
                    confirmButtonText: 'Continuar',
                }).then(() => {

                    setIsAuthenticated(true);

                    const hasSeenPrivacyNotice = localStorage.getItem('hasSeenPrivacyNotice');

                    if (!hasSeenPrivacyNotice) {
                        Swal.fire({
                            title: 'Aviso de privacidad',
                            html: `
                                <div class="swal-scrollable-content" style="max-height: 500px; overflow-y: auto;">
                                <h3 style="font-family: 'Roboto Slab', serif; font-weight: 700; font-size: 18px;">Última actualización: 4 de Noviembre de 2024</h3>
                                <p style="font-family: 'Roboto', sans-serif; font-size: 14px;">
                                    CEO TICS se compromete a proteger la privacidad y seguridad de los datos personales de nuestros usuarios. Este aviso detalla cómo gestionamos los datos relacionados con el uso de la aplicación.
                                </p>
                                <p style="font-family: 'Roboto', sans-serif; font-size: 14px; font-weight: 500;">
                                    <strong>1. Recopilación de Datos</strong><br />
                                    Recopilamos datos personales como nombre, correo y datos financieros para personalizar la experiencia y facilitar el seguimiento de las finanzas del usuario.
                                </p>
                                <p style="font-family: 'Roboto', sans-serif; font-size: 14px; font-weight: 500;">
                                    <strong>2. Protección de Datos</strong><br />
                                    Implementamos medidas de seguridad para proteger los datos de accesos no autorizados; solo el personal autorizado tiene acceso.
                                </p>
                                <p style="font-family: 'Roboto', sans-serif; font-size: 14px; font-weight: 500;">
                                    <strong>3. Compartición de Datos</strong><br />
                                    No compartimos la información con terceros, salvo en casos legales o cuando sea necesario para el funcionamiento de la aplicación.
                                </p>
                                </div>
                          `,
                            icon: 'info',
                            confirmButtonText: 'Aceptar',
                            showClass: {
                                popup: 'animate__animated animate__fadeInUp animate__faster'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutDown animate__faster'
                            },
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: '#4CAF50',
                            width: '90%',
                            padding: '20px',
                            backdrop: 'rgba(0, 0, 0, 0.4)',
                            customClass: {
                                popup: 'swal-privacy-popup',
                                icon: "custom-icon"
                            }
                        }).then(() => {
                            localStorage.setItem('hasSeenPrivacyNotice', 'true');
                        });
                    }

                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: response.data.error || 'Credenciales incorrectas.',
                    icon: 'error',
                    confirmButtonText: 'Intentar de nuevo'
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error en el servidor. Intente de nuevo.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    }

    return (
        <Box
            sx={{
                width: 500,
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80vh',
                margin: 'auto',
                padding: 2,
                boxSizing: 'border-box'
            }}
        >
            <h1>LOGIN</h1>

            <Box
                sx={{
                    width: '100%',
                    maxWidth: { xs: 300, sm: 400, md: 500 },
                    padding: 2,
                    boxSizing: 'border-box'
                }}
            >
                <form onSubmit={loginValidate}>
                    <TextField
                        fullWidth
                        label="Usuario"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        margin='normal'
                    />
                    <TextField
                        fullWidth
                        id="outlined-password-input"
                        label="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        autoComplete="current-password"
                        margin='normal'
                    />
                    <Typography color="error">
                        {error}
                    </Typography>
                    <Button
                        variant='contained'
                        color='primary'
                        fullWidth
                        type="submit"
                        sx={{ mt: 2 }}
                    >
                        Iniciar Sesión
                    </Button>
                </form>
                <Typography
                    sx={{ mt: 2 }}
                    color='primary'
                >

                    <Box
                        component="span"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => navigate('/registro')}
                    >

                        ¿No tienes cuenta?, Regístrate

                    </Box>

                </Typography>
            </Box>
        </Box>
    )
}

export default Login
