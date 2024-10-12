import { Box, Button, TextField } from '@mui/material'
import React from 'react'

function Login() {


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

                <div>
                    <TextField
                        fullWidth
                        label="Usuario"
                        id="fullWidth"
                        margin='normal'
                    />
                    <TextField
                        fullWidth
                        id="outlined-password-input"
                        label="Contraseña"
                        type="password"
                        autoComplete="current-password"
                        margin='normal'
                    />
                    <Button
                        variant='contained'
                        color='primary'
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Iniciar Sesión
                    </Button>
                </div>

            </Box>
        </Box>

    )
}

export default Login
