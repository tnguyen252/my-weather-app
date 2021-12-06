import React, { useState, useEffect } from "react";
import CityCell from "./CityCell";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import store from "../store";

function HomePage(props) {
    const LOCAL_STORAGE_CITIES_KEY = "LOCAL_STORAGE_CITIES_KEY"

    // City IDs represent current selected cities in list
    const [cityIDs, setCityIDs] = useState([])
    // Local city list containing city info and id for fetching data
    // stored in JSON fetch from local file
    const [localCityList, setLocalCityList] = useState([])
    // Actual city data used to display
    const [cityData, setCityData] = useState([])

    // Query for seaching by city
    const [query, setQuery] = useState("")

    const [isSearching, setIsSearching] = useState(false)

    let navigate = useNavigate();

    // Fetch cities name initially
    useEffect(() => {
        // Fetch local city list initially
        // to get id based on names fetching from local storage
        fetchLocalCityList()
            .then(res => {
                onSetCityIDs(JSON.parse(localStorage.getItem(LOCAL_STORAGE_CITIES_KEY)) || []);
            })
    }, []);

    // Save cities to local storage
    useEffect(() => {
        // when city names is updated, fetch current weather data
        fetchData()
    }, [cityIDs]);

    function onSetCityIDs(ids) {
        setCityIDs(ids)
        localStorage.setItem(LOCAL_STORAGE_CITIES_KEY, JSON.stringify(ids));
    }

    async function fetchData() {
        if (cityIDs.length > 0) {
            const apiKey = "0bfe6e7875c045ab0b6cdd6bd5eea322"
            const url = `https://api.openweathermap.org/data/2.5/group?id=${cityIDs.join(",")}&appid=${apiKey}`
            const res = await axios.get(url);
            setCityData(res.data.list)
        }
    }

    function fetchLocalCityList() {
        return axios.get("../city-list.json")
            .then((response) => {
                setLocalCityList(response.data)
            })
    }

    function onAddCityTapped() {
        setIsSearching(!isSearching)
    }

    function onSelectCity(id) {
        if (!cityIDs.includes(id)) {
            onSetCityIDs([...cityIDs, id])
        }

        setIsSearching(!isSearching)
        setQuery("")
    }

    function onShowCityDetail(city) {
        store.dispatch({ type: "updateDetails", payload: city })
        navigate("/details")
    }

    const cityMap = cityData.map(city => (
        <CityCell
            key={city.id}
            onShowDetails={() => onShowCityDetail(city)}
            name={city.name}
            temp={city.main.temp + " °F"}
        />
    ))

    const localCityMap = localCityList
    .filter(city => {
        if (query.trim() === "") {
            return true
        }
        return city.name.toLowerCase().includes(query.trim().toLowerCase())
    })
    .slice(0,100)
    .map(city => {
        return <div key={city.id} className="search-row" onClick={() => onSelectCity(city.id)}>
            {city.name}
        </div>
    })

    const viewTemplate = (
        <div className="App">
            <div className="div-right-align">
                <button className="horizontal-stack" onClick={onAddCityTapped}>
                    Add City
                </button>
            </div>

            <ul>
                {cityMap}
            </ul>
        </div>
    )

    const searchTemplate = (
        <div className="App">
            <input className="max-width" placeholder="Search by city name" onChange={event => setQuery(event.target.value)} />
            <ul>
                {localCityMap}
            </ul>
        </div>
    )
    return (
        isSearching ? searchTemplate : viewTemplate
    );
}

export default HomePage;