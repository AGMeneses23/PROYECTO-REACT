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
            if (response.data.acceso === 'Ok') {
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
                            navigate("/inicio");
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
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #87CEFA, #ffffff)',
                padding: 2,
            }}
        >
            <Box
                sx={{
                    width: 400,
                    backgroundColor: '#fff',
                    padding: 4,
                    borderRadius: 4,
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        color: '#1976d2',
                    }}
                >
                    Bienvenido
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        marginBottom: 2,
                        color: '#555',
                    }}
                >
                    Por favor, ingresa tus datos para continuar.
                </Typography>

                <form onSubmit={loginValidate} style={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="Usuario"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        margin="normal"
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            },
                        }}
                    />
                    <TextField
                        fullWidth
                        id="outlined-password-input"
                        label="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            },
                        }}
                    />
                    <Typography color="error" sx={{ marginTop: 1 }}>
                        {error}
                    </Typography>
                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        sx={{
                            mt: 3,
                            padding: 1.5,
                            fontWeight: 'bold',
                            background: 'linear-gradient(135deg, #1976d2, #4fc3f7)',
                            color: '#fff',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #125a9c, #3ca7d0)',
                            },
                        }}
                    >
                        Iniciar Sesión
                    </Button>
                </form>

                <Typography
                    variant="body2"
                    sx={{
                        marginTop: 2,
                        color: '#1976d2',
                        textAlign: 'center',
                    }}
                >
                    <Box
                        component="span"
                        sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                        onClick={() => navigate('/registro')}
                    >
                        ¿No tienes cuenta? Regístrate
                    </Box>
                </Typography>
            </Box>
        </Box>
    );
}

export default Login
