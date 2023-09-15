import style from "./whyComponent.module.css";

export default function WhyComponent() {

    const items = [
        "1. Planes de alimentación personalizados: Nuestros profesionales en nutrición trabajarán contigo para crear planes de alimentación personalizados que se adapten a tus necesidades, objetivos y preferencias alimentarias. Ya sea que estés buscando perder peso, ganar energía o mejorar tu salud en general, te proporcionaremos un plan alimenticio que se ajuste a ti.",
        "2. Servicios virtuales: Con la comodidad y la flexibilidad en mente, ofrecemos sesiones de asesoramiento nutricional en línea. Puedes acceder a nuestros servicios desde la comodidad de tu hogar o cualquier lugar que te resulte conveniente.",
        "3. Precios competitivos: Entendemos la importancia de hacer que los servicios de asesoramiento nutricional sean accesibles para todos. Nuestros precios competitivos te brindan una excelente relación calidad-precio sin comprometer la calidad del servicio que recibirás.",
        "4. Recetas saludables: Queremos inspirarte a incorporar hábitos alimenticios más saludables en tu vida diaria. Te proporcionaremos una variedad de recetas deliciosas y equilibradas que se ajusten a tus necesidades nutricionales y te ayuden a explorar nuevas opciones culinarias.",
        "5. Atención personalizada: En ZUCCA, no creemos en enfoques universales. Te ofrecemos atención personalizada que tiene en cuenta tus preferencias, necesidades y circunstancias individuales. Nuestros profesionales se asegurarán de que te sientas apoyado en cada paso de tu viaje hacia la salud y el bienestar."
      ];
            return (
            <div id="por-que-zucca">
               <div className={style.container}>
                    <h1 className={style.title}>¿POR QUÉ ZUCCA?</h1>
                    <h4 >Brindamos servicios centrados en tu bienestar y objetivos personales para una vida saludable y equilibrada.</h4>
                    <h4 >Nuestra misión es guiarte hacia un estilo de vida informado y energizado, apoyándote en cada paso.</h4>
                <div className={style.margin}>
                    <div className={style.columnsContainer}>
                    {items.map((item, index) => (
                    <div key={index} className={style.column}>
                    {item}
                     </div>
                     ))}
                </div>
                </div>
                </div>
                </div>
  );
}


