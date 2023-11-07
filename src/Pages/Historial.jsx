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

  return (
    <div>
      <h1 className="center separador">Ver Historial 📋</h1>

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
          <Link to="/index">
            {" "}
            <button className="button button-outline">VOLVER</button>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
