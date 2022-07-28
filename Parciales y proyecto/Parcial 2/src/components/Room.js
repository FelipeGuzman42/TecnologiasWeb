import React, { useState, useEffect } from 'react';
import Device from "./Device";
import { FormattedMessage } from "react-intl";
import PieChart from './PieChart';

function Room(props) {
    let id = props.id;

    const images = {
        "Kitchen": "https://i.imgur.com/eS0f6AM.png",
        "Living room": "https://i.imgur.com/SWG3oP1.jpeg",
        "Dinner room": "https://i.imgur.com/AQrgJ8c.jpg"
    }

    let [room, setRoom] = useState([]);
    let [devices, setDevices] = useState("");

    useEffect(()=>{
        const URL = "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";
        fetch(URL).then(res => res.json()).then(res => {
          setRoom(res);
        })
    }, []);

    useEffect(()=>{
        setDevices("");
    }, [id])

    let renderDevice = (e) => setDevices(e.devices);

    function renderRooms(){
        return room.filter((e) => e.homeId === id)
            .map((item) => (
                <div className="card" onClick={(e) => renderDevice(item)} key={item.name}>
                    <p className="card-title">{item.name}</p>
                    <img className="card-img-top" src={images[item.name]} alt="Imagen de habitación" width="80px"></img>
                </div>
            ))
    }

    if (id === "")
        return "";
    
    if (devices !== ""){
        return (
            <div>
                <div className="row">
                    <h2><FormattedMessage id="Rooms"/></h2>
                    <div className="col-8">
                        <div className="card-group">
                            {renderRooms()}
                        </div>
                    </div>
                    <div className="col-4">
                        <Device device={devices}/>
                    </div>
                </div>
                <div className="row">
                    <PieChart id={id} room={room}/>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h2><FormattedMessage id="Rooms"/></h2>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8 card-group">
                    {renderRooms()}
                </div>
                <div className="col-2"></div>
            </div>
            <div className="row">
                <PieChart id={id} room={room}/>
            </div>
        </div>
    );
}

export default Room;
