import React from "react";
import './Switch.css';


export default function Switch({type,on,on_off}) {
    return (
        <label className="switch">
            <input type="checkbox" checked={on} onChange={on_off}/>
            <span className="slider" id={type}/>
        </label>
    );
};