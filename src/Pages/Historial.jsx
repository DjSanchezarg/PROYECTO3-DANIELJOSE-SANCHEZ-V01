import { useState } from "react";
import { Link } from "react-router-dom";

export default function Historial() {
  const [historialCotizaciones, sethistorialCotizaciones] = useState(
    JSON.parse(localStorage.getItem("historialCotizaciones")) ?? {
      fechaCotizacion: "",
      propiedad: "",
      ubicacion: "",
      metrosCuadrados: "",
      poliza: "",
    }
  );

  const cotizando = [
    {
      fechaCotizacion: "4/11/2023, 17:59:02",
      propiedad: "P.H.",
      ubicacion: "Tandil",
      metrosCuadrados: "25",
      poliza: "978.98",
    },
  ];

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
          {/* <p> hola {historialCotizaciones.fechaCotizacion}</p> */}
        </div>
      </div>
    </div>
  );
}
