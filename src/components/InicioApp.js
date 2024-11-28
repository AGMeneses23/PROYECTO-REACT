import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Tema personalizado con fuente
const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif', // Fuente personalizada
    },
});

export default function InicioApp() {

    // Dentro de tu componente
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #87CEFA, #ffffff)', // Fondo degradado
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Encabezado */}
                <AppBar position="static" sx={{ backgroundColor: '#21618c' }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Ceotics
                        </Typography>
                        <Box>
                            {['Regístrate', 'Inicia sesión'].map((item, index) => (
                                <Button
                                    key={item}
                                    onClick={() => {
                                        //Redireccionar según el indice
                                        if (index === 0) {
                                            navigate('/registro');
                                        } else if (index === 1) {
                                            navigate('/login');
                                        }
                                    }}
                                >
                                    {item}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Contenido Central */}
                <Container
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        color: '#000',
                    }}
                >
                    <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Bienvenido
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4 }}>
                        Esta aplicación está diseñada para ayudarte a gestionar tus ingresos y gastos de manera sencilla. Puedes crear categorías de gastos e ingresos, realizar un seguimiento de tus transacciones y obtener un resumen detallado de tu situación financiera.
                    </Typography>
                    <Typography
                        variant="body1"
                        paragraph
                        sx={{
                            textAlign: 'left', // Alineación para la lista
                            maxWidth: '600px', // Limitar ancho para que sea más legible
                            lineHeight: 1.6, // Espaciado entre líneas
                            fontSize: '1.2rem', // Tamaño de fuente ajustado para la lista
                        }}
                    >
                        <Typography
                            component="p"
                            sx={{
                                textAlign: 'center',
                                fontSize: '1.5rem', // Tamaño de fuente ajustado para el párrafo
                                fontWeight: 'bold',
                                mb: 1,
                            }}
                        >
                            Funcionalidades principales:
                        </Typography>
                        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                            <li>Administrar categorías de ingresos y gastos.</li>
                            <li>Visualizar un listado completo de las categorías.</li>
                            <li>Gestionar tus transacciones financieras de manera eficiente.</li>
                            <li>Acceder a tu historial de transacciones y generar reportes.</li>
                        </ul>
                    </Typography>
                </Container>

                {/* Pie de página */}
                <Box
                    component="footer"
                    sx={{
                        backgroundColor: '#21618c',
                        color: '#fff',
                        textAlign: 'center',
                        py: 2,
                    }}
                >
                    <Typography variant="body2">
                        © {new Date().getFullYear()} Ceotics. Todos los derechos reservados.
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
