import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registro() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlerRegister = async (e) => {
        e.preventDefault();

        //VALIDACION DE CAMPOS VACÍOS
        if (!name || !email || !password || !confirmPassword) {
            Swal.fire({
                title: "Campos incompletos",
                text: "Todos los campos deben estar llenos para continuar con el registro",
                icon: "warning"
            });
            return;
        }

        //VALIDACIÓN DE COINCIDENCIA DE CONTRASEÑAS
        if (password !== confirmPassword) {
            Swal.fire({
                title: "Contraseñas no coinciden",
                text: "Asegúrate de que ambas contraseñas sean iguales",
                icon: "error"
            });
            return;
        }

        try {

            const response = await axios.post('http://localhost:8000/api/register', {
                name,
                email,
                password,
                password_confirmation: confirmPassword,
            });

            Swal.fire({
                title: "¡Registro exitoso!",
                text: response.data.message,
                icon: 'success'
            });


            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');

            navigate('/login');

        } catch (error) {
            if (error.response) {
                const errors = error.response.data.error;
                Swal.fire({
                    title: "Error al registrar",
                    text: Object.values(errors).flat().join(", "),
                    icon: 'error'
                });
            } else {
                Swal.fire({
                    title: "Error de conexión",
                    text: "No se pudo conectar con el servidor.",
                    icon: 'error'
                });
            }
        }

    };

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
                    Registro
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        marginBottom: 2,
                        color: '#555',
                    }}
                >
                    Crea una cuenta para usar la aplicación.
                </Typography>

                <form onSubmit={handlerRegister} style={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="name"
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
                        label="Correo"
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
                        label="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        autoComplete="new-password"
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
                        label="Confirmar Contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        autoComplete="new-password"
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
                        Registrarse
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
                        onClick={() => navigate('/login')}
                    >
                        ¿Ya tienes cuenta? Inicia Sesión
                    </Box>
                </Typography>
            </Box>
        </Box>
    );


}

export default Registro;