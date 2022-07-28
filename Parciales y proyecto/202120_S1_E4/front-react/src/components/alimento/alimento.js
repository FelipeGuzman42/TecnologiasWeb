import React, {useState, useEffect} from "react";
import {FormattedMessage} from "react-intl"

function Alimento(prop) {
  

    const [alimentos, setAlimentos] = useState([]);

    const [nuevo, setNuevo] = useState({
        nombre:"hola",gramos:0,calorias:0,vitaminas:0,proteinas:0,carbohidratos:0,grasa:0,sodio:0
    });

    async function createAlimento() {
  
      const requestOptions = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
         
        },
        body: JSON.stringify(nuevo),
      };
  
      fetch("http://localhost:3001/alimentos", requestOptions)
        .then(async (response) => {
          const isJson = response.headers
            .get("content-type")
            ?.includes("application/json");
          const dataResponse = isJson && (await response.json());
  
          if (!response.ok) {
            const error = (dataResponse && dataResponse.message) || response.status;
            return Promise.reject(error);
          }
  
        })
        .catch((error) => {
          console.error("Ocurrió un error en la creación de un alimento:", error);
        });
    }

    useEffect(() => {
      
      fetch( "http://localhost:3001/alimentos")
        .then((response) => response.json())
        .then((data) => {
          setAlimentos(data);
      
        });
        
    }, []);

    function handleSubmit()
    {
        createAlimento()
    }

    function handleInputChange(event) {
        setNuevo({
          ...nuevo,
          [event.target.name]: event.target.value,
        });
      }
 
   return (
    <div className="container">
      <h1 className="tittle text-center mb-lg-5 mb-3">
        <span data-blast="color"></span> <FormattedMessage id="alimento"/>
      </h1>
      <hr></hr>
      
      <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col"><FormattedMessage id="nombre"/></th>
      <th scope="col"><FormattedMessage id="gramos"/></th>
      <th scope="col"><FormattedMessage id="calorias"/></th>
      <th scope="col"><FormattedMessage id="vitaminas"/></th>
      <th scope="col"><FormattedMessage id="proteinas"/></th>
      <th scope="col"><FormattedMessage id="carbohidratos"/></th>
      <th scope="col"><FormattedMessage id="grasa"/></th>
      <th scope="col"><FormattedMessage id="sodio"/></th>

    </tr>

  </thead>
  <tbody>

        {alimentos.map((x, i) => (
            <tr key ={i}>
            

                <th >{x.nombre}</th>
                <td > {x.gramos}</td>
                <td > {x.calorias}</td>
                <td > {x.vitaminas}</td>
                <td >{x.proteinas}</td>
                <td > {x.carbohidratos}</td>
                <td > {x.grasa}</td>
                <td > {x.sodio}</td>
               

                </tr>
      )
        )}
        </tbody>
        </table>
      <hr></hr>
      <h3><FormattedMessage id="crearAlimento"/></h3>
    <form onSubmit={handleSubmit}>
            
        <div>
            <label htmlFor="exampleInputEmail1"><FormattedMessage id="nombre"/></label>
            <input 
            name="nombre" 
            className="form-control" 
            type="text"
            onChange={handleInputChange}
            />
        </div>

        <div>
            <label htmlFor="exampleInputEmail1"><FormattedMessage id="gramos"/></label>
            <input 
            name="gramos" 
            className="form-control" 
            type="text"
            onChange={handleInputChange}
            />
        </div>
        
        <div className="form-group">
            <label htmlFor="exampleInputPassword1"><FormattedMessage id="calorias"/></label>
            <input 
            name="calorias" 
            className="form-control" 
            type="text"
            onChange={handleInputChange}
            />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1"><FormattedMessage id="vitaminas"/></label>
            <input 
            name="vitaminas"
            className="form-control" 
            type="text" 
            onChange={handleInputChange}
            />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1"><FormattedMessage id="proteinas"/></label>
            <input 
            name="proteinas"
            className="form-control" 
            type="text" 
            onChange={handleInputChange}
            />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1"><FormattedMessage id="carbohidratos"/></label>
            <input 
            name="carbohidratos"
            className="form-control" 
            type="text"
            onChange={handleInputChange}
            />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1"><FormattedMessage id="grasa"/></label>
            <input 
            name="grasa"
            className="form-control" 
            type="text" 
            onChange={handleInputChange}
            />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1"><FormattedMessage id="sodio"/></label>
            <input 
            name="sodio"
            className="form-control" 
            type="text" 
            onChange={handleInputChange}
            />
        </div>

    </form>
        <p></p>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>

    </div>
  );

   

}

export default Alimento;



