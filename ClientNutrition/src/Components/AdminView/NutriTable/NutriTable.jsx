import  { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import style from "./NutriTable.module.css";


function NutriTable() {
  const [activeNutri, setActiveNutri] = useState([]);
  const [inactiveNutri, setInactiveNutri] = useState([]);
  
  useEffect(() => {
    // Cargar nutricionistas activos e inactivos al montar el componente
    fetch( `/nutritionists/list`)
      .then((response) => response.json())
      .then((data) => {
        // Dividir los nutricionistas en listas activas e inactivas
        const activeNutriList = data.filter((nutricionista) => nutricionista.isActive);
        const inactiveNutriList = data.filter((nutricionista) => !nutricionista.isActive);
  
        setActiveNutri(activeNutriList);
        setInactiveNutri(inactiveNutriList);
      });
  }, []);
  console.log(activeNutri);

  const blockNutri = async (id) => {
    try {
      // Eliminar el nutricionista
      await axios.delete(`/nutritionists/delete/${id}`);
  
      // Esperar a que ambas operaciones asincrónicas se completen antes de actualizar las listas
      await Promise.all([
        // Actualizar la lista de nutricionistas activos
        setActiveNutri((prevActiveNutri) =>
          prevActiveNutri.filter((nutricionista) => nutricionista.id !== id)
        ),
        // Actualizar la lista de nutricionistas inactivos
        setInactiveNutri((prevInactiveNutri) =>
          prevInactiveNutri.concat(activeNutri.find((nutricionista) => nutricionista.id === id))
        ),
      ]);
    } catch (error) {
      console.error("Error al bloquear el nutricionista:", error);
    }
  };
  
  
  const restoreNutri = async (id) => {
    try {
      await axios.put(`/nutritionists/restore/${id}`);
      // Actualizar las listas de nutricionistas
      const updatedInactiveNutri = inactiveNutri.filter((nutricionista) => nutricionista.id !== id);
      const nutricionistaToRestore = inactiveNutri.find((nutricionista) => nutricionista.id === id);
      setActiveNutri([...activeNutri, nutricionistaToRestore]);
      setInactiveNutri(updatedInactiveNutri);
    } catch (error) {
      console.error("Error al restaurar el nutricionista:", error);
    }
  };

  const openNewWindow = (id) => {
    window.open(
      `http://localhost:5173/adminprofile/detail/${id}`,
      "_blank",
      "width=770, height=700"
    );
  };

  return (
    <Table striped bordered hover responsive className="shadow-sm text-center">
      <thead>
        <tr>
          <th>#</th>
          < th key={1}>Nombre</th>
          <th key={2}>Apellidos</th>
          <th key={4}>Número de citas</th>
          <th key={5}>Bloquear</th>
          <th key={6}>Desbloquear</th>
        </tr>
      </thead>
      <tbody>
        {(activeNutri.length > 0 || inactiveNutri.length > 0) &&
          [...activeNutri, ...inactiveNutri].map((nutricionista) => {
            return (
              <tr key={nutricionista.id}>
                <td>{nutricionista.id}</td>
                <td className={style.name} onClick={() => openNewWindow(nutricionista.id)}>
                  {nutricionista.name}
                </td>
                <td className={style.name} onClick={() => openNewWindow(nutricionista.id)}>
                  {nutricionista.lastName}
                </td>
                <td>{nutricionista.numberOfAppointments}</td>
                <td>
                  {activeNutri.includes(nutricionista) && (
                    < button onClick={() => blockNutri(nutricionista.id)}>X</button>
                  )}
                </td>
                <td>
                  {inactiveNutri.includes(nutricionista) && (
                    <button onClick={() => restoreNutri(nutricionista.id)}>O</button>
                  )}
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
}

export default NutriTable;
