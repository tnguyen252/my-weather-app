import React from "react";
import { useNavigate } from "react-router-dom";
import store from "../store";

function DetailPage() {
    let navigate = useNavigate();

    function backButtonTapped() {
        navigate("/")
    }

    let details = store.getState().value

    return (
        <div className="App">
            <div className="div-left-align">
                <button className="horizontal-stack" onClick={backButtonTapped}>
                    Back to list
                </button>
            </div>

            <label className="label-title"> {details.name} </label>

            <div className="div-left-align">
                <label>Condition: {details.weather[0].description} </label> <br/>
                <label>Temperature: {details.main.temp + " °F"} </label> <br/>
                <label>Feels like: {details.main.feels_like + " °F"} </label> <br/>
                <label>Humidity: {details.main.humidity} </label> <br/>
            </div>
        </div>
    );
}

export default DetailPage;