import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import jsonUbicacion from "../ubicacion.json";
import jsonPropiedad from "../propiedad.json";

export default function Index() {
  // -----------------Obtenemos datos desde Json
  const [datosPropiedad, setDatosPropiedad] = useState([]);
  const [datosUbicacion, setdatosUbicacion] = useState([]);

  //----------------- Cargamos  los datos obtenidos desde Json para selector de propiedad y ubicacion
  useEffect(() => {
    setDatosPropiedad(jsonPropiedad);
    setdatosUbicacion(jsonUbicacion);
  }, []);

  // ---------------Captura datos de propiedad del desplegable-----------------
  const [selectedPropiedad, setSelectedPropiedad] = useState(""); // Estado para almacenar el valor seleccionado
  const [selectedTextPropiedad, setselectedTextPropiedad] = useState(""); // Estado para almacenar el texto seleccionado
  const propiedadSelectChange = (e) => {
    //Valor factor Selector

    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.value; // Obtener el valor seleccionado del evento
    setSelectedPropiedad(selectedOption); // Actualizar el estado con el valor seleccionado
    //Texto tipo  Selector
    const selectedTextPropiedad = e.target.options[selectedIndex].text; // Obtener el texto seleccionado del evento
    setselectedTextPropiedad(selectedTextPropiedad); // Actualizar el texto seleccionado
    console.log(selectedTextPropiedad);
  };

  // -------------------Captura datos de ubicacion del desplegable
  const [selectedUbicacion, setSelectedUbicacion] = useState(""); // Estado para almacenar el valor seleccionado
  const [selectedTextUbicacion, setselectedTextUbicacion] = useState(""); // Estado para almacenar el texto seleccionado
  const ubicacionSelectChange = (e) => {
    //Valor factor Selector
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.value; // Obtener el valor seleccionado del evento
    setSelectedUbicacion(selectedOption); // Actualizar el estado con el valor seleccionado
    //Texto tipo  Selecto
    const selectedTextUbicacion = e.target.options[selectedIndex].text; // Obtener el texto seleccionado del evento
    setselectedTextUbicacion(selectedTextUbicacion); // Actualizar el texto seleccionado
    console.log(selectedTextUbicacion);
  };

  // -----------------------Captura datos de los metros cuadraddos del input
  const [selectMetros2, setSelectMetros2] = useState("");
  const metrosSeleccionados = ({ target }) => {
    setSelectMetros2(target.value);
  };
  const [data, setData] = useState({
    //-Captura Factor de multiplicacion y datos de poliza
    costoM2: 35.86,
    poliza: 0,
  });

  const datosCompletos = () =>
    selectedPropiedad !== "" &&
    selectedUbicacion !== "" &&
    parseFloat(selectMetros2) >= 20
      ? true
      : false;

  // -------------------------Consulta si los datos estan completos
  const cotizarPoliza = () => (datosCompletos() ? cotizo() : alarma());

  // -------------------------Determina si falta cargar datos
  const [faltaDatos, setFaltaDatos] = useState(true);
  const alarma = () => {
    // Envia cambio de bordes selectores vacio
    setFaltaDatos();
  };
  const cotizo = () => {
    // -genera la cotizacion
    setFaltaDatos(true); //Si puede cotizar quita alarma de selector vacio

    const poliza =
      data.costoM2 *
      parseFloat(selectedPropiedad) *
      parseFloat(selectedUbicacion) *
      parseFloat(selectMetros2);
    setData({ ...data, poliza: poliza });
  };

  // ---------------------Captura datos para  historial
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
    window.location.reload(); //resetea datos
  };

  return (
    <div className="div-ContePricipal">
      <h1 className="center separador">Seguros del hogar 🏛️🏡🏢⛺</h1>

      <div className=" imagenVentana">
        <div className=" center div-cotizador">
          {/* <img src={marco} alt="Marco" /> */}
          <h2 className="center separador">Completa los datos solicitados</h2>

          {/* Selector tipo de propiedad */}
          <label htmlFor="propiedad">
            <span className="list-item-circle">1</span>Selecciona el tipo de
            propiedad
          </label>

          <select
            value={selectedPropiedad}
            onChange={propiedadSelectChange}
            id="propiedad"
            className={
              faltaDatos || !selectedPropiedad == "" ? "" : "bordeRojo"
            }
          >
            {faltaDatos || !selectedPropiedad == "" ? (
              <option value="" disabled>
                ...
              </option>
            ) : (
              <option value="" disabled>
                Cargar Datos por favor
              </option>
            )}
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
          <label htmlFor="ubicacion">
            <span className="list-item-circle">2</span>Selecciona su ubicación
          </label>

          <select
            value={selectedUbicacion}
            onChange={ubicacionSelectChange}
            id="ubicacion"
            className={
              faltaDatos || !selectedUbicacion == "" ? "" : "bordeRojo"
            }
          >
            {faltaDatos || !selectedUbicacion == "" ? (
              <option value="" disabled>
                {" "}
                ...{" "}
              </option>
            ) : (
              <option className="mensajeVacio" value="" disabled>
                {" "}
                Cargar Datos por favor{" "}
              </option>
            )}

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

          <div className="Div-SelectorNumero">
            {!(faltaDatos || parseFloat(selectMetros2) >= 20) ? (
              <p className="mensajeVacio">Cargar Datos por favor</p>
            ) : (
              ""
            )}

            <label htmlFor="metros2">
              <span className="list-item-circle">3</span>Ingresa los Metros
              cuadrados:
            </label>
            <input
              className={
                faltaDatos || parseFloat(selectMetros2) >= 20 ? "" : "bordeRojo"
              }
              type="number"
              id="metros2"
              value={selectMetros2}
              onChange={metrosSeleccionados}
              min="20"
              max="500"
              required
            />
          </div>

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
                title="Guardar en historial"
                className={data.poliza.toFixed(2) > 0 ? "guardar" : "ocultar "}
              >
                💾 Guardar
              </span>
            </p>
          </div>

          <div className="historial">
            <Link to="/historial">
              <button className="historial button button-outline">
                Ver Historia<span>📋</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
