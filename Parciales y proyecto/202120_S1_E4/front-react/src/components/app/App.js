import React, { useState } from 'react';
import Banner from '../banner/Banner';
import Footer from '../footer/Footer';
import Foro from '../foro/Foro';
import Balance from '../balance/Balance';
import Navbar from '../navbar/Navbar';
import NavbarLogin from '../navbar/NavbarLogin';
import Cookies from 'universal-cookie';
import Nutricionistas from '../nutricionistas/Nutricionistas';
import Alimento from '../alimento/alimento';
import {useAuth0} from "@auth0/auth0-react";


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

const cookies = new Cookies();

async function getUser(correo){
    return fetch("http://localhost:3001/usuarios/correo", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(correo)
    })
    .then(data => data.json())
}

async function loginUser(credentials){
    return fetch("http://localhost:3001/api/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

async function registerUser(credentials){
    return fetch("http://localhost:3001/usuarios", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}


function App(props) {

    const {user ,isAuthenticated} = useAuth0();
    const [token, setToken] = useState();
    const [usuario, setUser] = useState();

    function removeCookies() {
        cookies.remove("token", { path: "/" });
        cookies.remove("user", { path: "/" });
    }

    async function autenticacion(correo){
        let userSubmit = null
        
        try{
            userSubmit = await getUser({correo});
            let token_rta = await loginUser({
                correo: correo,
                password: user.nickname + "Password2021"
            });
            setToken(token_rta)
            setUser(userSubmit);
           
        } catch(error){
            await registerUser({
                nombre: user.nickname,
                correo: user.email,
                password: user.nickname + "Password2021", 
            });
            let token_rta = await loginUser({
                correo: correo,
                password: user.nickname + "Password2021"
            });
            setToken(token_rta)
            userSubmit = await getUser({correo});
            setUser(userSubmit);
        }
        
    }

    if(!token && cookies.get("token") == null && isAuthenticated){
        autenticacion(user.email);
    }


    if ((!token || !token["success"]) && cookies.get("token") == null) {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/">
                            <NavbarLogin />
                            <Banner />
                            <div style={{height: "5em"}}/>
                            <Footer />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }

    else if ((cookies.get("token") != null || token["success"])) {

        if (token != null && token["success"]) {
            cookies.set("token", token, { path: '/' });
            cookies.set("user", usuario, { path: '/' });
            
            return (
                <Router>
                    <Redirect to='/balance'/>
                        <Route path="/balance">
                                <Navbar removeCookies={removeCookies}/>  
                                <Balance token = {cookies.get("token")} usuario = {cookies.get("user") }/>
                                <div style={{height: "5em"}}/>
                                <Footer />
                        </Route>
                </Router>
            )
        }
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/balance">
                                <Navbar removeCookies={removeCookies}/>  
                                <Balance token = {cookies.get("token")} usuario = {cookies.get("user") }/>
                                <div style={{height: "5em"}}/>
                                <Footer />
                        </Route>
                        <Route path="/especialista">
                            <Navbar removeCookies={removeCookies}/>
                        </Route>
                        <Route path="/foro">
                            <Navbar removeCookies={removeCookies}/>  
                            <Foro token = {cookies.get("token")} usuario = {cookies.get("user") }/>
                            <Footer />
                        </Route>
                        <Route path="/nutricionistas">
                            <Navbar removeCookies={removeCookies} />
                            <Nutricionistas token={cookies.get("token")} usuario={cookies.get("user")} />
                            <div style={{height: "5em"}}/>
                            <Footer />
                        </Route>
                        <Route path="/alimento">
                            <Navbar removeCookies={removeCookies} />
                            <Alimento token={cookies.get("token")} usuario={cookies.get("user")} />
                            <div style={{height: "5em"}}/>
                            <Footer />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;

