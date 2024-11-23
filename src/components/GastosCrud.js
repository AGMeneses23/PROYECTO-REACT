import { Alert, AlertTitle, Box, Button, MenuItem, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function GastosCrud() {
    const navigate = useNavigate();
    const { idGasto } = useParams(); // Para identificar si estamos editando un gasto
    const [open, setOpen] = useState(false);

    // Estados para los campos
    const [categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState('');
    const [fecha, setFecha] = useState('');
    const [monto, setMonto] = useState('');
    const [descripcion, setDescripcion] = useState('');

    // Obtener categorías desde la API
    const obtenerCategorias = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/categorias/lista", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setCategorias(response.data.data);
        } catch (error) {
            console.error("Error al obtener las categorías: ", error);
        }
    };

    const obtenerGasto = async () => {
        if (!idGasto) {
            console.log("No hay idGasto, no se obtendrá el gasto");
            return;
        }

        try {
            console.log("Obteniendo gasto con id:", idGasto);
            const response = await axios.get(`http://127.0.0.1:8000/api/gastos/${idGasto}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const { id_categoria, fecha, monto, descripcion } = response.data.data;
            setCategoria(id_categoria);
            setFecha(fecha);
            setMonto(monto);
            setDescripcion(descripcion);

        } catch (error) {
            console.error("Error al obtener el gasto: ", error);
        }
    };

    // Llamar a las funciones al cargar el componente
    useEffect(() => {
        console.log("Valor de idGasto:", idGasto); // Verifica el valor
        obtenerCategorias();
        obtenerGasto();
    }, [idGasto]);

    // Manejar cambios en el campo de categoría
    const handleCategoriaChange = (event) => {
        setCategoria(parseInt(event.target.value));
    };

    // Abrir el Snackbar
    const handleClick = () => {
        setOpen(true);
    };

    // Cerrar el Snackbar
    const handleClose = (event, reason) => {
        if (reason === "clickaway") return;
        setOpen(false);
    };

    // Manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validaciones para campos vacíos
        if (!categoria || !fecha || !monto || !descripcion) {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor llena todos los campos antes de continuar.',
            });
            return; // Detiene el envío si hay campos vacíos
        }


        const gasto = { id_categoria: categoria, fecha, monto, descripcion };
        const url = idGasto
            ? `http://127.0.0.1:8000/api/gastos/editar/${idGasto}`
            : "http://127.0.0.1:8000/api/gastos/guardar";
        const method = idGasto ? "put" : "post";

        try {
            await axios({
                method,
                url,
                data: gasto,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            // Mostrar mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: idGasto ? 'Gasto actualizado' : 'Gasto creado',
                text: idGasto
                    ? 'El gasto se actualizó correctamente.'
                    : 'El gasto se creó correctamente.',
            }).then(() => {
                navigate("/inicio");
            });

            // Limpiar los campos
            setCategoria('');
            setFecha('');
            setMonto('');
            setDescripcion('');

            // Redirigir al inicio después de cerrar el Snackbar
            setTimeout(() => {
                navigate("/inicio");
            }, 3000); // Espera 6 segundos para cerrarse automáticamente

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al guardar el gasto. Por favor, inténtalo de nuevo.',
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

            <Box
                sx={{
                    width: 400,
                    backgroundColor: "#fff",
                    padding: 4,
                    borderRadius: 4,
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >

                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontWeight: "bold",
                        color: "#1976d2",
                    }}
                >
                    {idGasto ? "Editar gastos" : "Registro de gastos"}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        marginBottom: 2,
                        color: "#555",
                    }}
                >
                    {idGasto
                        ? "Actualiza los detalles del gasto seleccionado."
                        : "Registra un nuevo gasto en tu historial."}
                </Typography>


                <Box
                    sx={{
                        width: "100%",
                        padding: 2,
                        boxSizing: "border-box",
                    }}
                >
                    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                        {/* Campo Categoría */}
                        <TextField
                            id="categoria"
                            select
                            label="Categoría"
                            value={categoria || ''}
                            onChange={handleCategoriaChange}
                            fullWidth
                            margin="normal"
                            helperText="Por favor selecciona una categoría"
                            variant="outlined"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                },
                            }}
                        >
                            {categorias.map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}>
                                    {cat.nombre}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* Campo de Fecha */}
                        <TextField
                            fullWidth
                            label="Fecha"
                            type="date"
                            value={fecha || ''}
                            onChange={(e) => setFecha(e.target.value)}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                            margin="normal"
                            variant="outlined"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                },
                            }}
                        />

                        {/* Campo de Monto */}
                        <TextField
                            fullWidth
                            label="Monto"
                            type="number"
                            value={monto || ''}
                            onChange={(e) => setMonto(e.target.value)}
                            margin="normal"
                            variant="outlined"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                },
                            }}
                        />

                        {/* Campo de Descripción */}
                        <TextField
                            fullWidth
                            label="Descripción"
                            value={descripcion || ''}
                            onChange={(e) => setDescripcion(e.target.value)}
                            multiline
                            rows={4}
                            margin="normal"
                            variant="outlined"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                },
                            }}
                        />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 2, // Espaciado horizontal entre botones
                                mt: 3, // Espaciado superior
                                flexWrap: "wrap", // Para que se ajusten si la pantalla es pequeña
                            }}
                        >

                            {/* Botón de Guardar */}
                            <Button
                                variant="contained"
                                fullWidth
                                type="submit"
                                sx={{
                                    flex: 1, // Ambos botones tomarán el mismo ancho
                                    maxWidth: 200, // Limita el ancho máximo
                                    padding: 1.5,
                                    fontWeight: "bold",
                                    background: "linear-gradient(135deg, #1976d2, #4fc3f7)",
                                    color: "#fff",
                                    "&:hover": {
                                        background: "linear-gradient(135deg, #125a9c, #3ca7d0)",
                                    },
                                }}
                            >
                                {idGasto ? "Actualizar Gasto" : "Guardar Gasto"}
                            </Button>

                            {/* Botón Regresar */}
                            <Button
                                variant='outlined'
                                fullWidth
                                onClick={() => navigate("/inicio")}
                                sx={{
                                    flex: 1, // Ambos botones tomarán el mismo ancho
                                    maxWidth: 200, // Limita el ancho máximo
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
                        </Box>
                    </form>
                </Box>

                {/* Snackbar con Alerta */}
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                        sx={{ width: "100%" }}
                    >
                        <AlertTitle>Éxito</AlertTitle>
                        {idGasto
                            ? "El gasto se actualizó correctamente."
                            : "El gasto se creó correctamente."}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
}

export default GastosCrud;
