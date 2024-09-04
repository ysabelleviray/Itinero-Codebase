import React from "react";
import { Button, Chip } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import "../styles/PlaceCard.css";

const PlaceCard = ({ place, selected, refProp, setCardClicked }) => {
  if (selected) {
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="card">
      <div className="card-media">
        <img
          className="card-media-image"
          src={
            place.photo
              ? place.photo.images.large.url
              : "https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg"
          }
          alt={place.name}
        />
      </div>
      <div className="card-content">
        <div className="place-name">{place.name}</div>
        <div className="rating">
          <Rating value={Number(place.rating)} readOnly />
        </div>
        <div className="chips">
          {place?.cuisine?.map(({ name }) => (
            <div className="chip">
              <Chip key={name} size="small" label={name} />
            </div>
          ))}
        </div>
        {place?.address && (
          <div className="address">
            <LocationOnIcon className="icon" />
            <div className="text">{place.address}</div>
          </div>
        )}
        {place?.phone && (
          <div className="phone">
            <PhoneIcon className="icon" />
            <div className="text">{place.phone}</div>
          </div>
        )}
        <div className="card-actions">
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.website, "_blank")}
          >
            Website
          </Button>
          <IconButton
            color="primary"
            onClick={() => setCardClicked(place)}
            size="small"
            sx={{ backgroundColor: "#34495e" }}
          >
            <AddIcon style={{ color: "white" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
