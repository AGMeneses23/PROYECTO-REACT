import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const loginValidate = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email: email,
                password: password
            });
            if (response.data.acceso == 'Ok') {
                localStorage.setItem('token', response.data.token)
                window.location.href = '/home'
            } else {

                setError(response.data.error);
            }
        } catch (error) {
            setError('Ocurrió un error');
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
            </Box>
        </Box>
    )
}

export default Login
