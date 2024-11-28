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
import { Button, Fab, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CategoryIcon from '@mui/icons-material/Category';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add'
import Swal from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import { Info } from '@mui/icons-material';
const drawerWidth = 240;



const paginationModel = { page: 0, pageSize: 5 };

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

export default function CategoriasCrud({ setIsAuthenticated }) {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const navigate = useNavigate();

  // Sirve para listar las cátegorias
  React.useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await axios.get('https://localhost/api/categorias/lista', {
            headers: {
              Authorization: `Bearer ${token}` // Agrega el token al encabezado
            }
          });
          setRows(response.data.data);
        } else {
          console.error("Token no encontrado");
        }
      } catch (error) {
        console.error('Ocurrió un error', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleEdit = (id) => {

    navigate('/categoria/' + id)

  }
  const handleAddNew = () => {

    navigate('/categoria')

  }
  const handleDelete = async (id) => {
    try {

      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token no encontrado');
        Swal.fire({
          title: "Error",
          text: "No se encontró el token de autenticación.",
          icon: "error",
          confirmButtonText: "Aceptar"
        });
        return;
      }

      const response = await axios.delete(`https://localhost/api/categorias/eliminar/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response.data.message);
      setRows(rows.filter(row => row.id !== id));
      Swal.fire({
        title: "! Eliminado !",
        text: "La categoria ha sido eliminada exitosamente.",
        icon: "success",
      });
    } catch (error) {
      console.error('Ocurrio un error al intentar eliminar la categoría:', error);
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar la categoría",
        icon: "error",
      });
    }
  }

  const confirmDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  const handleLogout = async () => {
    try {
      // Verifica si el usuario inició sesión con Facebook
      const isFacebookLogin = localStorage.getItem('isFacebookLogin') === "true";

      if (isFacebookLogin) {
        console.log('Llamando a FB.logout...');
        // Llamar a FB.logout para cerrar sesión de Facebook
        window.FB.logout((response) => {
          console.log('Sesión cerrada en Facebook:', response);

          if (response.status === 'unknown') {
            console.log('La sesión se cerró correctamente en Facebook');
          }
        });
      } else {
        console.log("El usuario no inició sesión con Facebook");
      }

      // Continuar con el cierre del BackEnd
      await axios.post("https://localhost/api/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      // Limpiar token local y estado de autenticación
      localStorage.removeItem("token");
      localStorage.removeItem("isFacebookLogin");
      setIsAuthenticated(false);

      // Notificar al usuario
      Swal.fire({
        title: "Sesión Cerrada",
        text: "Has cerrado sesión exitosamente.",
        icon: "success",
        confirmButtonText: "Aceptar"
      }).then(() => {
        navigate("/inicio-page");
      });

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
    { field: 'nombre', headerName: 'Nombre', width: 130 },
    {
      field: 'editar',
      headerName: 'Editar',
      width: 160,
      renderCell: (params) => (
        <Button
          variant='contained'
          color='primary'
          onClick={() => handleEdit(params.row.id)}
          sx={{ marginRight: 1 }}
          startIcon={<EditIcon />}>
          Editar
        </Button>
      )
    },
    {
      field: 'eliminar',
      headerName: 'Eliminar',
      width: 160,
      renderCell: (params) => (
        <Button
          variant='contained'
          color='error'
          onClick={() => confirmDelete(params.row.id)} className='delete-button'
          startIcon={<DeleteIcon />}>
          Eliminar
        </Button>
      )
    }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" open={open} >
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
            Categorias
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
          {['Gastos', 'Categorias', 'Información', 'Cerrar Sesión'].map((text) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => {
                  if (text === "Gastos") {
                    navigate('/inicio');
                  } else if (text === "Categorias") {
                    navigate("/categorias-lista");
                  } else if (text === "Información") {
                    navigate('/info-page');
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
                  {text === "Información" && <Info />}
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
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
          />
        </Paper>

        <Fab color='primary' sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={handleAddNew}>
          <AddIcon></AddIcon>
        </Fab>

      </Box>
    </Box>
  );
}
