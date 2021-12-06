import React from "react";

function CityCell(props) {
    return (
        <div onClick={props.onShowDetails} className="city-cell">
            <label className="city-cell-title"> {props.name} </label>
            <label className="city-cell-detail"> {props.temp} </label>
        </div>
    );
}

export default CityCell;