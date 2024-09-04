// Itinerary.js
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import WeatherCard from "./WeatherCard";

const Itinerary = ({ days }) => {
  return (
    <Droppable droppableId="droppable-itinerary">
      {(provided) => (
        <div
          className="itinerary"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {days.map((day, index) => (
            <Draggable key={day.id} draggableId={day.id} index={index}>
              {(provided) => (
                <div
                  className="day-card"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <h2>{day.date}</h2>
                  <WeatherCard lat={day.lat} lng={day.lng} />
                  <div className="activities">
                    {day.activities.map((activity) => (
                      <div key={activity.place_id} className="activity-card">
                        <h3>{activity.name}</h3>
                        <p>{activity.vicinity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Itinerary;
