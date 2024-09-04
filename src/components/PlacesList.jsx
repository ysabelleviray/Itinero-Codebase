// ActivityList.js
import React, { useState, createRef, useEffect } from "react";
import {
  CircularProgress,
  Grid,
  MenuItem,
  FormControl,
  Select,
  Typography,
  InputLabel,
} from "@material-ui/core";
import PlaceCard from "./PlaceCard";
import "../styles/PlacesList.css";

const PlacesList = ({
  places,
  childClicked,
  isLoading,
  type,
  rating,
  setType,
  setRating,
  setCardClicked,
}) => {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());
    setElRefs(refs);
  }, [places]);

  return (
    <div className="places-list">
      <Typography variant="h4">
        Restaurants, Hotels & Attractions around you
      </Typography>
      {isLoading ? (
        <div className="loading">
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className="places-dropbox">
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className="rating-dropbox">
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid>
            {places?.map((place, i) => {
              return (
                <Grid ref={elRefs[i]} item key={i} xs={12}>
                  <PlaceCard
                    place={place}
                    selected={Number(childClicked) === i}
                    refProp={elRefs[i]}
                    setCardClicked={setCardClicked}
                  />
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </div>
  );
};

export default PlacesList;
