import "./FutureDates.module.css";
import Table from "react-bootstrap/Table";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { allEvents } from "../../../redux/actions/actions";
import { useEffect, useState } from "react";
import { filterEventsAfterCurrentDateTime } from "../../../utils/UserUtils";
import dayjs from "dayjs";

const FutureDates = () => {
  const nutriInfo = useSelector(e => e.nutriEvents);
  const currentsEvents = filterEventsAfterCurrentDateTime(nutriInfo);
  return (
    <Container className="container">
      <Table>
      <thead>
        <tr>
          <th key={1}>Fecha</th>
          <th key={2}>Hora</th>
          <th key={4}>Proposito</th>
          <th key={5}>User Id</th>
        </tr>
      </thead>
      <tbody>
        {
          currentsEvents && currentsEvents.map(e => (
            <tr key={e.id}>
              <td>{e.date}</td>
              <td>{e.hour}</td>
              <td>{e.purpose}</td>
              <td>{e.UserId}</td>
            </tr>
          ))
        }
      </tbody>
      </Table>
    </Container>
  );
};

export default FutureDates;
