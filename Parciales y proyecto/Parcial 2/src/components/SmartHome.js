import React, { useState, useEffect } from 'react';
import Room from "./Room";
import { FormattedMessage } from "react-intl";

function SmartHome() {
    let [casas, setCasas] = useState([]);
    let [comp, setComponent] = useState("");

    useEffect(()=>{
        const URL = "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";
        fetch(URL).then(res => res.json()).then(res => {
          setCasas(res);
        })
    }, []);

    let renderRoom = (e) => setComponent(e.id);

    function renderCasas(){
        let sources = ["https://i.imgur.com/IlLun8U.jpg", "https://i.imgur.com/IlLun8U.jpg", "https://i.imgur.com/rJSp4Y2.jpg", "https://i.imgur.com/rJSp4Y2.jpg"];
        let i = 0;
        return casas.map((item) => (
            <div className="card" onClick={(e) => renderRoom(item)} key={item.id}>
                <img className="card-img-top" src={sources[i++]} alt="Imagen de casa" width="80px" height="150px"></img>
                <div className="card-body">
                    <p className="card-title">{item.name}</p>
                    <p className="card-text">{item.address}</p>
                </div>
            </div>
        ))
    }

    return (
        <div>
            <h1><FormattedMessage id="Spaces"/></h1>
            <div>
                <div className="card-group">
                    {renderCasas()}
                </div>
            </div>
            <div>
                <Room id={comp} />
            </div>
        </div>
    );
}

export default SmartHome;
