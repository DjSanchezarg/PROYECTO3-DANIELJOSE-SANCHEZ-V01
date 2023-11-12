import { useState } from "react";
import { Link } from "react-router-dom";

export default function Historial() {
  // Captura dato de localStorage
  const [historialCotizaciones, sethistorialCotizaciones] = useState(
    JSON.parse(localStorage.getItem("historialCotizaciones")) ?? {
      fechaCotizacion: "",
      propiedad: "",
      ubicacion: "",
      metrosCuadrados: "",
      poliza: "",
    }
  );

  // Función para borrar el historial del localStorage y del estado
  const borrarHistorial = () => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que quieres borrar el historial?\nLa información se borrará permantemente y no podrá recuperarla"
    );

    if (confirmacion) {
      localStorage.removeItem("historialCotizaciones"); // Borra del localStorage
      sethistorialCotizaciones([]); // Borra del estado
    }
  };

  return (
    <div>
      <div className="div-heatheHis">
        <Link to="/index">
          {" "}
          <button className="button button-outline">VOLVER</button>{" "}
        </Link>
      </div>
      <h1 className="center separador">Ver Historial📋</h1>



      <div className=" center div-cotizador">
        <table>
          <thead>
            <tr>
              <th>Fecha de cotización</th>
              <th>Propiedad</th>
              <th>Ubicación</th>
              <th>Metros cuadrados</th>
              <th>Póliza mensual</th>
            </tr>
          </thead>
          <tbody>
            {historialCotizaciones.map((historialCotizaciones, id) => (
              <tr key={id}>
                <td>{historialCotizaciones.fechaCotizacion}</td>
                <td>{historialCotizaciones.propiedad}</td>
                <td>{historialCotizaciones.ubicacion}</td>
                <td>{historialCotizaciones.metrosCuadrados}</td>
                <td>{historialCotizaciones.poliza}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="center separador">
          <button onClick={borrarHistorial} className="button button-outline">
            {" "}
            Borrar Historial{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
