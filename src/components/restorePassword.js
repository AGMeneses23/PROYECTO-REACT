import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();

        //Validacion de campos vaciós
        if (!email || !password || !passwordConfirmation) {
            Swal.fire({
                icon: "error",
                title: "Campos incompletos",
                text: 'Por favor, completa todos los campos.'
            });
            return;
        }

        //Validar la coincidencia de contraseñas
        if (password !== passwordConfirmation) {
            Swal.fire({
                icon: 'error',
                title: 'Contraseñas no coinciden',
                text: 'Asegurate de que las contraseñas sean iguales.',
            });
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/password/reset', {
                email,
                password,
                password_confirmation: passwordConfirmation,
            });

            Swal.fire({
                icon: 'success',
                title: '¡Contraseña Actualizada!',
                text: response.data.message,
            }).then(() => {
                navigate('/login');
            });



            //Limpiar los campos despues del inicio de sesión
            setEmail('');
            setPassword('');
            setPasswordConfirmation('');

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar',
                text: error.response?.data?.error || 'Ocurrió un error inesperado.',
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
                    Recuperar contraseña
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        marginBottom: 2,
                        color: '#555',
                    }}
                >
                    Ingresa tu correo y una nueva contraseña.
                </Typography>

                <form onSubmit={handleResetPassword} style={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="Correo Electrónico"
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
                        id="password"
                        label="Nueva Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
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
                        id="password_confirmation"
                        label="Confirmar Contraseña"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        type="password"
                        margin="normal"
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            },
                        }}
                    />

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
                        Recuperar Contraseña
                    </Button>
                </form>

                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 2,
                        padding: 1.5,
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, #1976d2, #4fc3f7)',
                        color: '#fff',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #125a9c, #3ca7d0)',
                        },
                    }}
                    onClick={() => navigate('/login')}
                >
                    Regresar
                </Button>

            </Box>

        </Box>
    )
};

export default ResetPassword;
