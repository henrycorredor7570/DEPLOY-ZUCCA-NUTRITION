import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import {getSchedules, getNutritionistSchedule} from "../../redux/actions/actions";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./custom-calendar.css";
import { saveInfoEvent } from "../../redux/actions/actions";
import Example from "./Modal";
import { red } from "@cloudinary/url-gen/actions/adjust";
import { start } from "@cloudinary/url-gen/qualifiers/textAlignment";

const localizer = dayjsLocalizer(dayjs);

const Calendar = () => {

  const customSlots = {
    '2023-08-16': [14], 
  };
  /* const customSlots = [
    {
      date:"2023-09-06",
      hour:13
    }

  ] */

  const [show, setShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [view, setView] = useState("month");
  const dispatch = useDispatch();

  const appointments = useSelector(e => e.appointments);
  const schedules = useSelector(e => e.schedules);

  window.localStorage.setItem('appointmentslocal', JSON.stringify(appointments));
  const appointmentslocal =  JSON.parse(localStorage.getItem("appointmentslocal"));
  console.log(appointmentslocal);

  

  useEffect(() => {
    if(!appointments.length){
      dispatch(getSchedules())
    } else {
      const id = window.localStorage.getItem("nutriId");
      dispatch(getNutritionistSchedule(id))
    }
  },[]);

  const handleSelectC = ({ start }) => {
    const day = dayjs(start).day();
    const date = dayjs(start).date();
    const hour = dayjs(start).hour();
    const month = dayjs(start).month() + 1;
    const year = dayjs(start).year();
    const currentDate1 = dayjs(start);
    // Horarios ocupados

    const currentDate = dayjs(start).format('YYYY-MM-DD');

    // Horarios pasados
    
    const currentDateL = dayjs();
    const selectedDate = dayjs(start);
    
    const info = { hour, date, month, year, day };
    window.localStorage.setItem('infoEvent', JSON.stringify(info));
    const infoAppointment = JSON.parse(localStorage.getItem('infoEvent'));
    console.log(infoAppointment);
    console.log(month);
    let isHourAvailable = false;
    let isCustomSlotAvailable = true; 
  
    if (day === 0 || day === 6) {
      return window.alert('Día no disponible');
    }
  
    if (selectedDate.isBefore(currentDateL, 'day')) {
      return window.alert('Fecha pasada');
    }
    
    if (schedules[day]) {
      for (const [horaInicio, horaFin] of schedules[day]) {
        if (hour >= horaInicio && hour < horaFin) {
          isHourAvailable = true;
          break;
        } 
        if (customSlots[currentDate] && customSlots[currentDate].includes(hour) ) {
          isCustomSlotAvailable = false; 
        }
      }
    }
    
    if (isHourAvailable && isCustomSlotAvailable) {
      setFullscreen(true);
      setShow(true);
    } else {
      if (!isHourAvailable) {
        return window.alert('Hora no disponible');
      } 
      if (!isCustomSlotAvailable) {
        return window.alert('Horario ocupado');
      }
    }
  };

  const closedButton = () => {
    setShow(false);
  };

  const dayPropGetter = (date) => {
    const dateToCompare = dayjs(date);
    const dayWeek = dateToCompare.day(); 
    const dayStyle = {};
    const currentDate = dayjs();
  
    if (dateToCompare.isBefore(currentDate, 'day')) {
      dayStyle.backgroundColor = "#C6C4C4";
    }
  
    if (dayWeek === 0 || dayWeek === 6) {
      dayStyle.backgroundColor = "#E39C8E";
    }
  
    return {
      style: dayStyle
    };
  };

  const slotPropGetter = (date) => {
    const slotStyle = {};
    const currentSlot = dayjs(date);
    const currentDate = dayjs(currentSlot).format('YYYY-MM-DD');
    const hour = currentSlot.hour();
    const diaSemana = dayjs(date).day();

    if (schedules[diaSemana]){
      for (const [horaInicio, horaFin] of schedules[diaSemana]) {
        if (dayjs(date).hour() >= horaInicio && dayjs(date).hour() < horaFin) {
          slotStyle.backgroundColor = "#B5E38E"; 
          break; 
        }
        if(customSlots[currentDate] && customSlots[currentDate].includes(hour)){
          slotStyle.backgroundColor = "#9F7ECB";
          break;
        }
      }
    }

    return {
      style: slotStyle,
    };
  };

  return (
    <div>
      <div className="container">
        <BigCalendar
          localizer={localizer}
          selectable
          startAccessor="start"
          endAccessor="end"
          style={{ height: 700, width: 800 }}
          views={["month", "week", "day"]} 
          view={view} 
          onView={setView} 
          onSelectSlot={handleSelectC}
          dayPropGetter={dayPropGetter}
          slotPropGetter={slotPropGetter}
        />
        <Example
          show={show}
          fullscreen={fullscreen}
          closedButton={closedButton}
          
        />
      </div>
    </div>
  );
};

export default Calendar