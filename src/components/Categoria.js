import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState } from 'react';


export default function Categoria() {
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
                    Swal.fire({
                        title: "Error",
                        text: "Hubo un problema al obtner los datos de la categoría.",
                        icon: "error",
                        confirmButtonText: "Aceptar"
                    });
                }
            };

            fetchCategoria();
        }
    }, [idCat]);


    const handleSave = async (e) => {
        e.preventDefault();

        if (!nombre.trim()) {
            Swal.fire({
                title: "Campo Obligatorio",
                text: "Por favor ingresa el nombre de la categoría",
                icon: "warning",
                confirmButtonText: "Aceptar"
            })
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

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #87CEFA, #ffffff)",
                padding: 2,
            }}
        >

            <Box component="main"
                sx={{
                    flexGrow: 1,
                    maxWidth: 400,
                    backgroundColor: "#fff",
                    padding: 4,
                    borderRadius: 4,
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}>

                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontWeight: "bold",
                        color: "#1976d2",
                        textAlign: "center",
                    }}
                >
                    {idCat ? "Actualizar Categoría" : "Agregar Categoría"}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        marginBottom: 2,
                        color: "#555",
                        textAlign: "center",
                    }}
                >
                    {idCat ? "Actualiza la categoría para organizar tus gastos." :
                        "Añade una nueva categoría para organizar tus gastos."}
                </Typography>

                <form
                    onSubmit={handleSave}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
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
                        sx={{
                            marginBottom: 2,
                            width: "100%",
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                            },
                        }}
                        error={!!error}
                        helperText={error}
                        variant='outlined'
                    />

                    <Button
                        variant='contained'
                        type='submit'
                        fullWidth
                        sx={{
                            padding: 1.5,
                            fontWeight: "bold",
                            background: "linear-gradient(135deg, #1976d2, #4fc3f7)",
                            color: "#fff",
                            "&:hover": {
                                background: "linear-gradient(135deg, #125a9c, #3ca7d0)",
                            },
                        }}
                    >
                        {idCat ? "Actualizar Categoría" : "Guardar Categoría"}
                    </Button>

                    {/* Botón Regresar */}
                    <Button
                        variant='outlined'
                        fullWidth
                        onClick={() => navigate("/categoria-lista")}
                        sx={{
                            margin: 2,
                            padding: 1.5,
                            fontWeight: "bold",
                            color: "#1976d2",
                            borderColor: "#1976d2",
                            "&:hover": {
                                backgroundColor: "#e3f2fd",
                                borderColor: "#125a9c",
                            },
                        }}
                    >
                        Regresar
                    </Button>

                </form>

            </Box>
        </Box>
    );
}
