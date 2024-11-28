import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Presentation = () => {
    const navigate = useNavigate();

    const goToInicio = () => {
        navigate('/inicio');
    };

    const tips = [
        {
            title: "Establece un presupuesto",
            content:
                "Controlar tus gastos empieza por tener un presupuesto mensual. Divide tus ingresos entre necesidades, ahorros y gastos opcionales.",
            image: "https://fintelhub.com/wp-content/uploads/2022/10/la-importancia-del-presupuesto-en-tus-finanzas-personales.jpg", // URL de la imagen
        },
        {
            title: "Crea un fondo de emergencia",
            content:
                "Ahorrar al menos tres meses de tus gastos básicos puede protegerte de imprevistos financieros.",
            image: "https://www.fundacionmapfre.mx/media/educacion-divulgacion/educacion-financiera/ahorro/imprevistos-fondo-emergencia-1200x600-1.png", // URL de la imagen
        },
        {
            title: "Invierte sabiamente",
            content:
                "Explora opciones de inversión como fondos indexados, bonos o cuentas de ahorro de alto rendimiento.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYMwSdK-qqcoSqWNuBQgWMV1Bb1wGQjY4eMg&s", // URL de la imagen
        },
        {
            title: "Minimiza tus deudas",
            content:
                "Paga primero las deudas con intereses altos, como las tarjetas de crédito, para reducir el costo financiero a largo plazo.",
            image: "https://accionlatina.com/wp-content/uploads/2023/08/201804201408500.fb_-e1691605779864.webp", // URL de la imagen
        },
        {
            title: "Revisa tus gastos regularmente",
            content:
                "Haz un seguimiento de tus gastos mensuales para identificar áreas donde puedas ahorrar más.",
            image: "https://seminarioiiuntref.wordpress.com/wp-content/uploads/2022/09/contabilidad-costos-gastos.webp", // URL de la imagen
        },
        {
            title: "Planifica para la jubilación",
            content:
                "Empieza a ahorrar para la jubilación lo antes posible para aprovechar el interés compuesto.",
            image: "https://www.grupoprogedsa.com/wp-content/uploads/freshizer/d8bb9d2d641a9f6f32ff5be3e7ba8671_jubilacion-600-c-90.png", // URL de la imagen
        },
    ];

    useEffect(() => {
        document.body.style.background = 'linear-gradient(135deg, #87CEFA, #ffffff)'; // Mantener el fondo original
        document.body.style.margin = "0";
        document.body.style.fontFamily = "Arial, sans-serif";

        return () => {
            document.body.style.background = '';
        };
    }, []);


    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div style={styles.container}>
            <button onClick={goToInicio} style={styles.backButton}>⬅️</button> {/* Botón de regresar a la página anterior */}
            <div style={styles.headerContainer}>
                <h1 style={styles.header}>Consejos Financieros Básicos</h1>
                <p style={styles.subHeader}>
                    Aprende a manejar tus finanzas con estos consejos prácticos.
                </p>
                <img src="https://media.gq.com.mx/photos/61fa8978247e703ee62fca7d/16:9/w_2240,c_limit/AHORRO.jpg" alt="Header" style={styles.headerImage} /> {/* Imagen decorativa en el encabezado */}
            </div>
            <div style={styles.tipsContainer}>
                {tips.map((tip, index) => (
                    <div key={index} style={styles.tipCard}>
                        <h2 style={styles.tipTitle}>{tip.title}</h2>
                        <p style={styles.tipContent}>{tip.content}</p>
                        <img src={tip.image} alt={tip.title} style={styles.tipImage} />
                    </div>
                ))}
            </div>
            <button onClick={scrollToTop} style={styles.topButton}>⬆️</button> {/* Botón de regresar arriba a la derecha */}
        </div>
    );
};

const styles = {
    container: {
        margin: "0 auto",
        padding: "20px",
        maxWidth: "800px",
        color: "#ffffff",
        position: "relative",
    },
    headerContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.9)", // Fondo blanco translúcido
        padding: "20px",
        borderRadius: "8px",
        textAlign: "center",
        marginBottom: "20px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        color: "#2c3e50", // Color del texto para mejor contraste
    },
    headerImage: {
        width: "50%", // Ajustar el tamaño de la imagen 
        height: "auto",
        borderRadius: "8px",
        marginBottom: "10px",
        marginTop: "20px", // Añadir espacio entre la imagen y el texto
    },
    header: {
        margin: "0",
        fontSize: "2rem",
        fontWeight: "bold",
    },
    subHeader: {
        margin: "10px 0 0",
        fontSize: "1.2rem",
        color: "#2c3e50",
    },
    tipsContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    tipCard: {
        backgroundColor: "rgba(255, 255, 255, 0.9)", // Fondo blanco translúcido
        padding: "15px",
        borderRadius: "5px",
        border: "1px solid #e1e1e1",
        color: "#2c3e50",
        textAlign: "center", // Alinear el contenido al centro
    },
    tipTitle: {
        color: "#1976d2",
        marginBottom: "5px",
        textAlign: "center", // Alinear el título al centro
    },
    tipContent: {
        color: "#2c3e50",
    },
    tipImage: {
        width: "50%",
        height: "auto",
        borderRadius: "5px",
        marginTop: "10px",
    },
    footerImage: {
        width: "50%", // Ajustar el tamaño de la imagen 
        height: "auto",
        borderRadius: "8px",
        marginBottom: "10px",
        display: "block",
        margin: "0 auto", // Centrar la imagen
    },
    backButton: {
        position: "fixed",
        left: "20px",
        top: "20px",
        backgroundColor: "#1976d2",
        color: "#ffffff",
        border: "none",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        cursor: "pointer",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    },
    topButton: {
        position: "fixed",
        right: "20px",
        bottom: "20px",
        backgroundColor: "#1976d2",
        color: "#ffffff",
        border: "none",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        cursor: "pointer",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    },
};

export default Presentation;
