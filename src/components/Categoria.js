import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button, TextField } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import Swal from 'sweetalert2';
import { useState } from 'react';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

export default function Categoria({ setIsAuthenticated }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [nombre, setNombre] = React.useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { idCat } = useParams();

    React.useEffect(() => {
        if (idCat) {
            const fetchCategoria = async () => {
                try {
                    const token = localStorage.getItem("token");

                    if (token) {
                        const response = await axios.get(`https://localhost/api/categorias/${idCat}`, {
                            headers: {
                                Authorization: `Bearer ${token}` // Asegúrate de incluir el token aquí
                            }
                        });
                        setNombre(response.data.nombre);
                    } else {
                        console.error("Token no encontrado");
                    }
                } catch (error) {
                    console.error('Ocurrió un error al obtener la categoría', error);
                    setError('Hubo un problema al obtener los datos de la categoría.');
                }
            };

            fetchCategoria();
        }
    }, [idCat]);


    const handleSave = async (e) => {
        e.preventDefault();

        if (!nombre.trim()) {
            setError('Este campo es obligatorio');
            return;
        }

        setError('');

        try {
            const url = idCat
                ? `https://localhost/api/categorias/editar/${idCat}`
                : 'https://localhost/api/categorias/guardar';

            const method = idCat ? 'put' : 'post';
            const token = localStorage.getItem('token');

            if (!token) {
                console.log('Token no encontrado');
                Swal.fire({
                    title: "Error",
                    text: "No se encontró el token de autenticación.",
                    icon: "error",
                    confirmButtonText: "Aceptar"
                });
                return;
            }

            const response = await axios({
                method,
                url,
                data: { nombre },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200 || response.status === 201) {
                setNombre('');
                Swal.fire({
                    title: idCat ? "¡ Categoria Actualizada !" : "! Categoría creada !",
                    text: idCat
                        ? "La categoria ha sido actualizada correctamente."
                        : "La nueva categoría ha sido creda exitosamente.",
                    icon: "success",
                    confirmButtonText: "Aceptar"
                }).then(() => {
                    navigate('/home');
                });
            } else {
                console.error('Error en la operación:', response.data.message);
                Swal.fire({
                    title: "Error",
                    text: "Hubo un error al guardar la categoria.",
                    icon: "error",
                    confirmButtonText: "Aceptar"
                });
            }

        } catch (error) {
            console.error('Ocurrió un error en la solicitud:', error);
            Swal.fire({
                title: "Error",
                text: "No se pudo completar la solicitud.",
                icon: "error",
                confirmButtonText: "Aceptar"
            });
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post("https://localhost/api/logout", null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.status === 200) {
                localStorage.removeItem("token");
                setIsAuthenticated(false);
                Swal.fire({
                    title: "Sesión Cerrada",
                    text: "Has cerrado sesión exitosamente.",
                    icon: "success",
                    confirmButtonText: "Aceptar"
                }).then(() => {
                    navigate("/login");
                });
            }
        } catch (error) {
            console.error("Error al cerrar sesión: ", error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al intentar cerrar la sesión.",
                icon: "error",
                confirmButtonText: "Aceptar"
            });
        }
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                marginRight: 5,
                            },
                            open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Categoria
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Inicio', 'Categorias', 'Gastos', 'Cerrar Sesión'].map((text) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => {
                                    if (text === "Inicio") {
                                        navigate('/inicio');
                                    } else if (text === "Categorias") {
                                        navigate("/home");
                                    } else if (text === "Gastos") {
                                        console.log('Entrando a gastos......')
                                    } else if (text === "Cerrar Sesión") {
                                        handleLogout();
                                    }
                                }}
                                sx={[
                                    {
                                        minHeight: 48,
                                        px: 2.5,
                                    },
                                    open
                                        ? {
                                            justifyContent: 'initial',
                                        }
                                        : {
                                            justifyContent: 'center',
                                        },
                                ]}
                            >
                                <ListItemIcon
                                    sx={[
                                        {
                                            minWidth: 0,
                                            justifyContent: 'center',
                                        },
                                        open
                                            ? {
                                                mr: 3,
                                            }
                                            : {
                                                mr: 'auto',
                                            },
                                    ]}
                                >
                                    {text === "Categorias" && <CategoryIcon />}
                                    {text === "Inicio" && <HomeIcon />}
                                    {text === "Gastos" && <AttachMoneyIcon />}
                                    {text === "Cerrar Sesión" && <LogoutIcon />}
                                </ListItemIcon>
                                <ListItemText
                                    primary={text}
                                    sx={[
                                        open
                                            ? {
                                                opacity: 1,
                                            }
                                            : {
                                                opacity: 0,
                                            },
                                    ]}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
            <Box component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh'
                }}>
                <DrawerHeader />
                <form
                    onSubmit={handleSave}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >

                    <TextField
                        id="categoria"
                        label='Ingresa categoría'
                        multiline
                        maxRows={4}
                        value={nombre}
                        onChange={(e) => {
                            setNombre(e.target.value);
                            if (error) setError('');
                        }}
                        sx={{ mb: 2, width: '25ch' }}
                        error={!!error}
                        helperText={error}
                    />

                    <Button variant='contained' type='submit'>Guardar</Button>
                </form>

            </Box>
        </Box>
    );
}
