import React from "react";
import "../styles/Panel.css";
import InfoIcon from "@material-ui/icons/Info";

const Panel = ({
  dayOfWeek,
  date,
  content,
  index,
  isSelected,
  onClick,
  onOpenModal,
}) => {
  return (
    <div className={`panel ${isSelected ? "selected" : ""}`} onClick={onClick}>
      <div className="panel-header">
        <div>
          <div className="panel-day">{dayOfWeek}</div>
          <div className="panel-date">{date}</div>
        </div>
        <InfoIcon
          className="info"
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal({ dayOfWeek, date, content, index });
          }}
        />
      </div>
      <div className="panel-body">
        {content?.map((item, idx) => (
          <div key={idx} className="panel-item">
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Panel;
