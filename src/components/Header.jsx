import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import "../styles/Header.css"; // Make sure to create this CSS file or adjust as needed
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Header = ({ onSearch, onDateChange, setCoordinates }) => {
  const [city, setCity] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => setAutocomplete(autoC);
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
  };

  const handleSearchChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
  };

  const handleDateChange = () => {
    onDateChange({ fromDate, toDate });
  };

  return (
    <header className="header">
      <div className="header-title">Itinero</div>
      <form className="header-search-form" onSubmit={handleSearchSubmit}>
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <div className="search-container">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
            <input type="text" placeholder="Search for city..." />
          </div>
        </Autocomplete>
      </form>
      {/* <form className="header-date-form">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          placeholder="From Date"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          placeholder="To Date"
        />
        <button type="button" onClick={handleDateChange}>
          Update Dates
        </button>
      </form> */}
    </header>
  );
};

export default Header;
