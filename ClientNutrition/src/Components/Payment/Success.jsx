import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Success.module.css";
import { useEffect } from "react";
import { getAppointments, postAppointment } from "../../redux/actions/actions";
import axios from "axios";
import Card from 'react-bootstrap/Card';
const Success = () => {

    const dispatch = useDispatch();
    const infoAppointment = JSON.parse(localStorage.getItem("infoEvent"));

    const description = JSON.parse(localStorage.getItem("description"));

    const NutriId = JSON.parse(localStorage.getItem("nutriId"));

    const UserId = JSON.parse(localStorage.getItem("id"))

    const appointments =  JSON.parse(localStorage.getItem("appointmentslocal"))

    console.log('appointments', appointments);
    
    const formattedMonth = infoAppointment.month
    const formattedDate = infoAppointment.date

    const formattedDateStr = `${formattedMonth}-${formattedDate}-${infoAppointment.year}`;
    const formattedHour = infoAppointment.hour

    const infoPost = {
        date:formattedDateStr,
        hour:formattedHour,
        purpose: description,
        UserId: UserId,
        NutritionistId: NutriId
    }

    const infoPost2 = {
        day: infoAppointment.day,
        hour: infoAppointment.hour,
    }

    

    useEffect(() => {
        if(appointments.length){
            console.log('entre al primero');
            dispatch(postAppointment(infoPost))
        } else {
            console.log('entre al else');
            console.log(infoPost2);
            async function post (){
            const response =  await axios.get(`/nutritionists/myDoctor`)
            console.log( response.data.id);
            window.localStorage.setItem('nutriId', response.data.id)
        }
            post()
            dispatch(postAppointment(infoPost))
        }
      },[]);


    return (
        <div className={styles.container}>
        <div className={styles.cardContainer}>
            <Card className="h-100" style={{ width: '18rem', backgroundColor: 'lightgreen' }}>
                <Card.Body>
                    <Card.Title>EL PAGO SE HA REALIZADO CORRECTAMENTE</Card.Title>
                    <Card.Text>MUCHAS GRACIAS!</Card.Text>
                </Card.Body>
                <Link to="/">
                    <button>Volver</button>
                    </Link>
            </Card>
        </div>
        </div>  
    );
};

export default Success;
