import "./NutritionistProfile.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ClientsTable from "./ClientsTable/ClientsTable";
import NutriData from "./NutriData/NutriData";
import FutureDates from "./FutureDates/FutureDates";
import { useSelector, useDispatch } from "react-redux";
import { userNutriInfo, allEvents, eventsNutri } from "../../redux/actions/actions";
import { filterUniqueUserIds } from "../../utils/UserUtils";
import { useEffect, useState } from "react";
import axios from "axios";

const NutritionistProfile = () => {
  const dispatch = useDispatch();
  const nutriEvents = useSelector(e => e.nutriEvents); 
  const id = JSON.parse(window.localStorage.getItem("id"));
  const userInfo = useSelector(e => e.usersInfo);

  useEffect(() => {
    console.log("id:", id);
    (async () => {
      try {
        const { data } = await axios.get("/events");
        const filter = data.filter(e => e.NutritionistId == id);
        const userIds = filterUniqueUserIds(filter);
        console.log("estos son las ids:", userIds);
        dispatch(eventsNutri(filter))
        for (const userId of userIds) {
          if(userIds.length === userInfo.length){
            break;
          }
          dispatch(userNutriInfo(userId));
        }
      } catch (error) {
        console.log("algo salio mal");
      }
    })()
  },[]) 

  const nutriInfo = useSelector(e => e.nutriEvents);
  console.log("esto es nutriinfo", nutriInfo);
  console.log("estos son los usuarios:", userInfo);
  /* console.log("usersinformation", users); */
  return (
    <Container className="main">
      <Row>
        <Tabs
          defaultActiveKey="profile"
          id="fill-tab-example"
          className="myCalss"
          fill
        >
          <Tab eventKey="profile" title="Mi Perfil">
            <NutriData users />
          </Tab>
          <Tab eventKey="citasfuturas" title="Citas Futuras">
            <FutureDates />
          </Tab>
          <Tab eventKey="clientes" title="Mis Clientes">
            <ClientsTable/>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
};

export default NutritionistProfile;

