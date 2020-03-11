import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import clienteAxios from './config/axios';


//Componentes
import Pacientes from './components/Pacientes';
import NuevaCita from './components/NuevaCita';
import Cita from './components/Cita';

function App() {



  const [citas, guardarCitas] = useState([]);
  const [consultar, guardarConsultar] = useState(true);


  //Consultar la API
  useEffect(() => {
    if (consultar) {
      const consultarAPI = () => {

        clienteAxios.get('/pacientes')
          .then(respuesta => {


            guardarCitas(respuesta.data.pacientes);

            guardarConsultar(false);
          })
          .catch(error => console.log(error));
      }

      consultarAPI();
    }
  }, [consultar]); // para que react este pendiente a los cambios de consultar y cuando cambie que useEffect vuelva a ejecjtuarse 
  return (

    <Router>

      <Switch>
        <Route exact path="/"
          component={() => <Pacientes citas={citas} />} />

        <Route exac path="/nueva" component={() => <NuevaCita guardarConsultar={guardarConsultar} />} />

        <Route exact path="/cita/:id" render={(props) => {

            const cita = citas.filter(cita => cita._id === props.match.params.id)
            

          return (
            <Cita  cita={cita[0]}
                   guardarConsultar={guardarConsultar}/>
          )
        }} />
      </Switch>
    </Router>
  );
}

export default App;




//Route permite ir de una pagina a otra
//Cada ruta va dentro de un switch
//La ventaja de axios es que: podemos tener una conexion base que apunte a un dominio en especifico y una vez que se haga el deployment solo hay xque cambiar un valor y todos los endspoints se actualizan
//Cuando se consume una api react nos da un hook que se llama useEffect
//Las dependencias usualmente es alguna pieza de state que si cambia se ejecuta el useEffect
//useEffect : es un buen lugar para consumir una api externa
//useEffect: sin llamar a la funcion se ejecuta automaticamente cuando la interfaz de react realize algun cambio o cuando cargue por primera vez
//Hay que habilitar CORS para que los recursos puedan ser intercambiados de un servidor a otro 
//Una caracteristica que tiene CORS es que se puede crear el servidor en un dominio y el frontend en otro y tambien se puede limitar a que solamente el domonio consuma los recursos 

//dependencias: npm install react-router-dom
//              npm install axios
