import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import jsonUbicacion from "../ubicacion.json";
import jsonPropiedad from "../propiedad.json";

export default function Index() {
  // Obtenemos datos desde Json
  const [datosPropiedad, setDatosPropiedad] = useState([]);
  const [datosUbicacion, setdatosUbicacion] = useState([]);

  // Cargamos  los datos obtenidos desde Json para selector de propiedad y ubicacion
  useEffect(() => {
    setDatosPropiedad(jsonPropiedad);
    setdatosUbicacion(jsonUbicacion);
  }, []);

  // Captura datos de propiedad del desplegable
  const [selectedPropiedad, setSelectedPropiedad] = useState(""); // Estado para almacenar el valor seleccionado
  const [selectedTextPropiedad, setselectedTextPropiedad] = useState(""); // Estado para almacenar el texto seleccionado
  const propiedadSelectChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.value; // Obtener el valor seleccionado del evento
    const selectedTextPropiedad = e.target.options[selectedIndex].text; // Obtener el texto seleccionado del evento
    setSelectedPropiedad(selectedOption); // Actualizar el estado con el valor seleccionado
    setselectedTextPropiedad(selectedTextPropiedad); // Actualizar el texto seleccionado
    console.log(selectedTextPropiedad);
  };

  // Captura datos de ubicacion del desplegable
  const [selectedUbicacion, setSelectedUbicacion] = useState(""); // Estado para almacenar el valor seleccionado
  const [selectedTextUbicacion, setselectedTextUbicacion] = useState(""); // Estado para almacenar el texto seleccionado
  const ubicacionSelectChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.value; // Obtener el valor seleccionado del evento
    const selectedTextUbicacion = e.target.options[selectedIndex].text; // Obtener el texto seleccionado del evento
    setSelectedUbicacion(selectedOption); // Actualizar el estado con el valor seleccionado
    setselectedTextUbicacion(selectedTextUbicacion); // Actualizar el texto seleccionado
    console.log(selectedTextUbicacion);
  };

  // Captura datos de los metros cuadraddos del input
  const [selectMetros2, setSelectMetros2] = useState("");
  const metrosSeleccionados = ({ target }) => {
    setSelectMetros2(target.value);
  };

  //Captura Factor de multiplicacion y datos de poliza
  const [data, setData] = useState({
    metros2: 20,
    costoM2: 35.86,
    poliza: 0,
  });

  // genera la cotizacion
  const cotizarPoliza = () => {
    const poliza =
      data.costoM2 *
      parseFloat(selectedPropiedad) *
      parseFloat(selectedUbicacion) *
      parseFloat(selectMetros2);
    setData({ ...data, poliza: poliza });
  };

  // Captura datos para  historial
  const guardaHistorial = () => {
    const cotizacion = {
      fechaCotizacion: new Date().toLocaleString(),
      propiedad: selectedTextPropiedad,
      ubicacion: selectedTextUbicacion,
      metrosCuadrados: selectMetros2,
      poliza: data.poliza.toFixed(2),
    };

    //Envia Datos al localStore para generar historial
    const historialCotizaciones =
      JSON.parse(localStorage.getItem("historialCotizaciones")) || [];
    historialCotizaciones.push(cotizacion);
    localStorage.setItem(
      "historialCotizaciones",
      JSON.stringify(historialCotizaciones)
    );
  };

  return (
    <div>
      <div className="historial">
        <Link to="/historial">
          {" "}
          <span title="Ver Historial">📋</span>{" "}
        </Link>
      </div>

      <h1 className="center separador">Seguros del hogar 🏡</h1>

      <div className=" center div-cotizador">
        <h2 className="center separador">Completa los datos solicitados</h2>

        {/* Selector tipo de propiedad */}
        <label htmlFor="propiedad">Selecciona el tipo de propiedad</label>
        <select
          value={selectedPropiedad}
          onChange={propiedadSelectChange}
          id="propiedad"
        >
          <option value="" disabled>
            ...
          </option>
          {datosPropiedad.map(({ factor, tipo }, id) => (
            <option key={id} value={factor}>
              {" "}
              {tipo}{" "}
            </option>
          ))}
        </select>

         {/* //Verificador de informacion no borrar*/}
        {/* <p>Factor segun Propiedad: {selectedPropiedad}</p>
        <p>Texto seleccionado: {selectedTextPropiedad}</p> */}

        {/* Selector ubicacion */}
        <label htmlFor="ubicacion">Selecciona su ubicación</label>
        <select
          value={selectedUbicacion}
          onChange={ubicacionSelectChange}
          id="ubicacion"
        >
          <option value="" disabled>
            ...
          </option>
          {datosUbicacion.map(({ factor, tipo }, id) => (
            <option key={id} value={factor}>
              {" "}
              {tipo}{" "}
            </option>
          ))}
        </select>

         {/* //Verificador de informacion no borrar*/}
        {/* <p>Factor segun Ubicacion: {selectedUbicacion}</p>
        <p>Texto seleccionado: {selectedTextUbicacion}</p> */}

        {/* Registramos los metros cuadradoss */}
        <label htmlFor="metros2">Ingresa los Metros cuadrados:</label>
        <input
          type="number"
          id="metros2"
          value={selectMetros2}
          onChange={metrosSeleccionados}
          min="20"
          max="500"
          required
        />

        <div className="center separador">
          <button onClick={cotizarPoliza} className="button button-outline">
            {" "}
            Cotizar{" "}
          </button>
        </div>

        <div className="center separador">
          <p className="importe">
            Precio estimado: ${" "}
            <span id="valorPoliza">{data.poliza.toFixed(2)}</span>
            <span
              onClick={guardaHistorial}
              className="guardar ocultar"
              title="Guardar en historial"
            >
              💾
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
