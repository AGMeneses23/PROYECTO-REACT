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

            <h1>REGISTRO</h1>

            <Box
                sx={{
                    width: '100%',
                    maxWidth: { xs: 300, sm: 400, md: 500 },
                    padding: 2,
                    boxSizing: 'border-box'
                }}
            >

                <form onSubmit={handlerRegister}>
                    <TextField
                        fullWidth
                        label="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        autoComplete="new-password"
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="Confirmar Contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        autoComplete="new-password"
                        margin="normal"
                    />

                    <Typography color="error">
                        {error}
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        sx={{ mt: 2 }}
                    >

                        Registrarse

                    </Button>

                </form>

                <Typography
                    sx={{ mt: 2 }}
                    color='primary'
                >

                    <Box
                        component="span"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => navigate('/login')}
                    >

                        ¿Ya tienes cuenta?, Inicia Sesión

                    </Box>

                </Typography>

            </Box>

        </Box>
    );

}

export default Registro;