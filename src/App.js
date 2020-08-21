import React, { useState } from 'react';
// import logo from './logo.svg';
import './assets/Styles/App.css';



//IMPORTACIÓN DE LIBRERÍA DE ESTILOS BOOTSTRAP Y REACTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';



function App() {


  // DATA DE USUARIOS REGISTRADOS EN LA TABLA
  const dataUsuarios = [
    { id: 1, Nombre: "Claudia", Edad: 30 },
    { id: 2, Nombre: "Roberto", Edad: 44 },
    { id: 3, Nombre: "Felipe", Edad: 24 },
    { id: 4, Nombre: "Martín", Edad: 25 },
    { id: 5, Nombre: "Alejandra", Edad: 36 },
  ];



  //HOOKS DE ESTADO PARA ASIGNARLE A LA CONSTANTE DATA-USUARIOS
  const [data, setData] = useState(dataUsuarios);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);

  // OBJETO USUARIO DE ESTADO
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
    id: ' ',
    NOMBRE: ' ',
    Edad: ''
  });



  // FUNCION PARA ELIMINAR O EDITAR
  const seleccionarUsuario = (elemento, caso) => {
    setUsuarioSeleccionado(elemento);
    (caso === 'Editar') ? setModalEditar(true) : setModalEliminar(true)
  }



  //FUNCIÓN PARA ASIGNAR AL ESTADO LO QUE EL USUARIO ESTA ESCRIBIENDO EN BASE AL NOMBRE DEL INPUT
  const handleChange = e => {
    const { name, value } = e.target;
    setUsuarioSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }



  // FUNCIÓN EDITAR EN MODAL
  const editar = () => {
    var dataNueva = data;
    dataNueva.map(usuario => {
      if (usuario.id === usuarioSeleccionado.id) {
        usuario.Nombre = usuarioSeleccionado.Nombre;
        usuario.Edad = usuarioSeleccionado.Edad;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }



  // FUNCIÓN PARA ELIMINAR EN MODAL
  const eliminar = () => {
    setData(data.filter(usuario => usuario.id !== usuarioSeleccionado.id));
    setModalEliminar(false);
  }



  // FUNCIÓN PARA LIMPIAR USUARIO SELECCIONADO HE INSERTAR USUARIO
  const abrirModalInsertar = () => {
    setUsuarioSeleccionado(null);
    setModalInsertar(true);
  }



  //MÉTODO PARA INSERTAR EN EL ESTADO
  const insertar = () => {
    var valorInsertar=usuarioSeleccionado;
    valorInsertar.id=data[data.length-1].id+1;
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
  }





  return (

    <div className="App">
      <h2 className="tope">USUARIOS REGISTRADOS</h2>

      <br />

      {/* BOTON PARA AGREGAR */}
      <div className="boton">
        <h3>Agregar Usuario</h3>
        <button className="btn btn-success" onClick={() => abrirModalInsertar()}>Agregar</button>
      </div>

      {/* CREACIÓN DE LA TABLA CON ESTILOS */}
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>EDAD</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.Nombre}</td>
              <td>{elemento.Edad}</td>
              <td>
                <button className="btn btn-primary" onClick={() => seleccionarUsuario(elemento, 'Editar')}>Editar</button>{"  "}
                <button className="btn btn-danger" onClick={() => seleccionarUsuario(elemento, 'Eliminar')}>Eliminar</button>
              </td>
            </tr>
          ))
          }
        </tbody>
      </table>




      {/* MODAL PARA  EDITAR */}
      <Modal isOpen={modalEditar}>


        {/* CABECERA DEL MODAL */}
        <ModalHeader>
          <div>
            <h2>Editar Usuario</h2>
          </div>
        </ModalHeader>


        {/* CUERPO DEL MODAL */}
        <ModalBody>
          <div className="form-group">

            {/* INPUT ID */}
            <label>Id</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={usuarioSeleccionado && usuarioSeleccionado.id}
            />


            <br />
            
            {/* INPUT NOMBRE */}
            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="Nombre"
              value={usuarioSeleccionado && usuarioSeleccionado.Nombre}
              onChange={handleChange}
            />


            <br />

            {/* INPUT EDAD */}
            <label>Edad</label>
            <input
              className="form-control"
              type="text"
              name="Edad"
              value={usuarioSeleccionado && usuarioSeleccionado.Edad}
              onChange={handleChange}
            />


            <br />

          </div>
        </ModalBody>

        {/* PIE DEL MODAL */}
        <ModalFooter>

          {/* BOTON DE MODAL PARA ACTUALIZAR */}
          <button className="btn btn-primary" onClick={() => editar()}>Actualizar</button>

          {/* BOTON DE MODAL PARA CANCELAR */}
          <button className="btn btn-danger" onClick={() => setModalEditar(false)}>Cancelar</button>
        </ModalFooter>

      </Modal>



      {/* MODAL PARA ELIMINAR */}
      <Modal isOpen={modalEliminar}>


        {/* CABECERA DEL MODAL */}
        <ModalHeader>
          <div>
            <h2>Eliminar</h2>
          </div>
        </ModalHeader>


        {/* CUERPO DEL MODAL */}
        <ModalBody>
          <div className="texto">
            <h4>Estas seguro que deseas eliminar a: </h4>
            <h3> {usuarioSeleccionado && usuarioSeleccionado.Nombre}</h3>
          </div>
        </ModalBody>


        {/* PIE DEL MODAL */}
        <ModalFooter>

          {/* BOTON PARA ACEPTAR */}
          <button className="btn btn-primary" onClick={() => eliminar()}>Aceptar</button>

          {/* BOTON PARA CANCELAR */}
          <button className="btn btn-danger" onClick={() => setModalEliminar(false)}>Cancelar</button>

        </ModalFooter>

      </Modal>



      {/* MODAL PARA INSERTAR */}
      <Modal isOpen={modalInsertar}>


        {/* CABECERA DEL MODAL */}
        <ModalHeader>
          <div>
            <h2>Insertar Usuario</h2>
          </div>
        </ModalHeader>


        {/* CUERPO DEL MODAL */}
        <ModalBody>
          <div className="form-group">

            {/* INPUT ID */}
            <label>Id</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={data[data.length-1].id+1}
            />


            <br />


            {/* INPUT NOMBRE */}
            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="Nombre"
              value={usuarioSeleccionado ? usuarioSeleccionado.Nombre: ' '}
              onChange={handleChange}
            />


            <br />


            {/* INPUT EDAD */}
            <label>Edad</label>
            <input
              className="form-control"
              type="text"
              name="Edad"
              value={usuarioSeleccionado ? usuarioSeleccionado.Edad: ' '}
              onChange={handleChange}
            />


            <br />

          </div>
        </ModalBody>


        {/* PIE DEL MODAL */}
        <ModalFooter>

          {/* BOTON PARA AGREGAR */}
          <button className="btn btn-primary" onClick={() => insertar()}>Agregar</button>

          {/* BOTON PARA CANCELAR */}
          <button className="btn btn-danger" onClick={() => setModalInsertar(false)}>Cancelar</button>
        </ModalFooter>

      </Modal>


    </div>
  );
}

export default App;

