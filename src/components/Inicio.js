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
import CategoryIcon from '@mui/icons-material/Category';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button, Fab } from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';


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


const paginationModel = { page: 0, pageSize: 5 };

export default function Inicio({ setIsAuthenticated }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        //Realizar la solicitu a la APIpara obtener los gastos
        axios.get("http://127.0.0.1:8000/api/gastos/lista", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    //MAPEAR LOS DATOS DE LA RESPUESTA A LA ESTRUCTURA DE LA TABLA
                    const gastos = response.data.data.map((gasto) => ({
                        id: gasto.id,
                        categoria: gasto.categoria.nombre,
                        fecha: gasto.fecha,
                        monto: gasto.monto,
                        descripcion: gasto.descripcion,
                    }));
                    setRows(gastos);
                }
            })
            .catch((error) => {
                console.error("Error al obtener los gastos: ", error);
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al obtener los gastos.",
                    icon: "error",
                    confirmButtonText: "Aceptar",
                });
            });
    }, []);

    const handleAddGasto = () => {
        navigate('/gastos');
    }

    const handleEdit = (id) => {
        navigate(`/gastos/${id}`);
    };

    const handleDelete = (id) => {

        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: "#d33",
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                //REALIZAMOS LA SOLICITUD DELETE A LA API
                axios.delete(`http://127.0.0.1:8000/api/gastos/eliminar/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                    .then((response) => {
                        if (response.status === 200) {
                            //EL GASTO FUE ELIMINADO CORRECTAMENTE
                            Swal.fire('¡Eliminado!', 'El gasto ha sido eliminado.', 'success');

                            //ACTUALIZA EL ESTADO PARA ELIMINAR EL GASTO DE LA LISTA LOCAL
                            setRows((prevRows) => prevRows.filter((gasto) => gasto.id !== id));
                        }
                    }).catch((error) => {
                        console.error("Error al eliminar el gasto: ", error);
                        Swal.fire({
                            title: "Error",
                            text: "Hubo un problema al eliminar el gasto.",
                            icon: "error",
                            confirmButtonText: "Aceptar",
                        });
                    });
            }
        });

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

    const columns = [
        // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'categoria', headerName: 'Categoria', width: 130 },
        { field: 'fecha', headerName: 'Fecha', width: 130 },
        {
            field: 'monto',
            headerName: 'Monto',
            type: 'number',
            width: 90,
        },
        {
            field: 'descripcion',
            headerName: 'Descripción',
            width: 190,
        },
        {
            field: 'editar',
            headerName: 'Editar',
            renderCell: (params) => (
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => handleEdit(params.row.id)}
                    sx={{ marginRight: 1 }}
                    startIcon={<EditIcon />}
                >
                    Editar
                </Button>
            ),
            width: 160,
        },
        {
            field: 'eliminar',
            headerName: 'Eliminar',
            renderCell: (params) => (
                <Button
                    variant='contained'
                    color='error'
                    onClick={() => handleDelete(params.row.id)}
                    sx={{ marginRight: 1 }}
                    startIcon={<DeleteIcon />}
                >
                    Eliminar
                </Button>
            ),
            width: 160,
        }
    ];



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
                        Tus Gastos
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
                    {['Gastos', 'Categorias', 'Cerrar Sesión'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => {
                                    if (text === "Gastos") {
                                        navigate('/inicio');
                                    } else if (text === "Categorias") {
                                        navigate("/categorias-lista");
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
            </Drawer>
            <Box component="main" sx={{
                flexGrow: 1,
                bgcolor: 'background.default',
                p: 3,
                width: '100%',
                height: '100vh',
                overflow: 'auto',
            }}>
                <DrawerHeader />
                <Paper sx={{ p: 2 }}>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10]}
                            sx={{ border: 0 }}
                        />
                    </div>
                </Paper>

                <Fab color='primary' sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={handleAddGasto}>
                    <AddIcon />
                </Fab>

            </Box>
        </Box>
    );
}
