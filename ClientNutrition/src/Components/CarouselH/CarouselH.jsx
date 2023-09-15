import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Fondoblanco from './Fondoblanco.jpg';
import styles from "../CarouselH/CarouselH.module.css"


export default function CarouselH() {

  return (
      <div className={styles.divConAlturaViewport}>
      <div className={styles.text}>
      "TU CAMINO HACIA UNA VIDA SALUDABLE Y BALANCEADA"
      </div>
      <h4>Ofrecemos asesoramiento nutricional personalizado en línea con expertos altamente calificados centrados en la salud y el bienestar general. Trabajamos individualmente contigo para diseñar un plan adaptado a tus necesidades y objetivos.</h4>
    </div>
  )
}

