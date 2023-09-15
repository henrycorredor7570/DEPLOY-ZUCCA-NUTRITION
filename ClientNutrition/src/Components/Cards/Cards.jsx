import styles from "./Cards.module.css";
import Card from 'react-bootstrap/Card';
import iconProfile from "./iconProfile.png";

export default function Cards() {
    return (
        <div className={styles.container} id="quienes-nos-eligen">
            <div className={styles.text}>
                <div className={styles.title}>QUIENES NOS ELIGEN</div>
            </div>
            <div className={styles.cardContainer}>
                <Card className="h-100" style={{ width: '18rem', backgroundColor: 'lightgreen' }}>
                    <Card.Body>
                    <img className={styles.profilePicture} src={iconProfile} alt="Imagen de perfil" />
                        <Card.Title>Carlos M.</Card.Title>
                        <Card.Text>
                        "Gracias a ZUCCA finalmente tengo un plan alimenticio hecho a mi medida. Me siento más energizado y apoyado en mi camino hacia el bienestar. Ha sido una experiencia transformadora. Desde que comencé a seguir el plan de nutrición personalizado de ZUCCA, he logrado perder peso de manera sostenible y mejorar mi salud en general. La atención personalizada y el seguimiento constante de los profesionales de ZUCCA me han ayudado a mantenerme motivado y enfocado en mis objetivos de salud. Estoy muy agradecido por la experiencia y los resultados que he obtenido con ZUCCA. ¡Lo recomiendo altamente a cualquiera que busque un cambio positivo en su vida!"                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className="h-100" style={{ width: '18rem', backgroundColor: 'green' }}>
                    <Card.Body>
                    <img className={styles.profilePicture} src={iconProfile} alt="Imagen de perfil" />
                        <Card.Title>Diego T.</Card.Title>
                        <Card.Text>
                        "Como deportista, ZUCCA ha tenido un impacto transformador en mi rendimiento y bienestar. Gracias a los planes de nutrición personalizados diseñados por los expertos de ZUCCA, mi energía y recuperación están en su punto máximo. Antes de unirme a ZUCCA, estaba luchando por mantener un equilibrio adecuado entre mi entrenamiento riguroso y mi dieta. Constantemente me sentía agotado y mis tiempos de recuperación eran lentos.
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className="h-100" style={{ width: '18rem', backgroundColor: "#fd7e14" }}>
                    <Card.Body>
                    <img className={styles.profilePicture} src={iconProfile} alt="Imagen de perfil" />
                        <Card.Title>Dra. Lucia G.</Card.Title>
                        <Card.Text>
                            "ZUCCA ha revolucionado mi enfoque como profesional. Facilita la comunicación y me permite concentrarme en guiar a mis pacientes hacia sus objetivos. En el tiempo que llevo en la plataforma estoy sorprendida por la facilidad que plantea este sistema integral para llevar a mis pacientes a sus metas. Claramente es una nueva forma de encarar la nutrición de la que me enorgullece ser parte"
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

