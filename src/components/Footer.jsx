// Footer.js
import React, { useState, useEffect } from "react";
import Panel from "./Panel"; // Import the Panel component
import PanelDetailsModal from "./PanelDetailsModal";
import "../styles/Footer.css"; // Import the corresponding CSS file

const Footer = ({ cardClicked }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [panels, setPanels] = useState([]);
  const [panelContent, setPanelContent] = useState({});
  const [selectedPanelIndices, setSelectedPanelIndices] = useState(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleOpenModal = (panelData) => {
    setModalData(panelData);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  useEffect(() => {
    if (startDate && endDate) {
      generatePanels(startDate, endDate);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (cardClicked) {
      updatePanelsWithCard(cardClicked);
    }
  }, [cardClicked]);

  const formatDayOfWeek = (date) => {
    return date.toLocaleDateString(undefined, { weekday: "long" });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const generatePanels = (startDate, endDate) => {
    const duration =
      Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    const newPanels = Array.from({ length: duration }, (_, i) => {
      const panelDate = new Date(startDate);
      panelDate.setDate(startDate.getDate() + i);
      return {
        dayOfWeek: formatDayOfWeek(panelDate),
        date: formatDate(panelDate),
      };
    });
    setPanels(newPanels);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const date = new Date(value);

    if (name === "date-from") {
      setStartDate(date);
    } else if (name === "date-to") {
      setEndDate(date);
    }
  };

  const handlePanelClick = (index) => {
    setSelectedPanelIndices((prevIndices) => {
      const newIndices = new Set(prevIndices);
      if (newIndices.has(index)) {
        newIndices.delete(index);
      } else {
        newIndices.add(index);
      }
      return newIndices;
    });
  };

  const updatePanelsWithCard = (place) => {
    const updatedPanels = { ...panelContent };
    selectedPanelIndices.forEach((index) => {
      updatedPanels[index] = updatedPanels[index] || [];
      if (!updatedPanels[index].find((p) => p.name === place.name)) {
        updatedPanels[index].push(place);
      }
    });
    setPanelContent(updatedPanels);
  };

  const handleUpdatePanelContent = (updatedContent, index) => {
    console.log(updatedContent);
    console.log(index);
    setPanelContent((prevContent) => ({
      ...prevContent,
      [index]: updatedContent,
    }));
  };

  return (
    <div className="footer">
      <div className="footer-content">
        <div className="panels-container">
          {panels.map((panel, index) => (
            <Panel
              key={index}
              index={index}
              dayOfWeek={panel.dayOfWeek}
              date={panel.date}
              content={panelContent[index]}
              isSelected={selectedPanelIndices.has(index)}
              onClick={() => handlePanelClick(index)}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>
        <PanelDetailsModal
          open={modalOpen}
          onClose={handleCloseModal}
          panelData={modalData}
          onUpdatePanelContent={handleUpdatePanelContent}
        />
        <div className="date-input-container">
          <label htmlFor="date-from">From:</label>
          <input
            type="date"
            id="date-from"
            name="date-from"
            value={startDate.toISOString().split("T")[0]}
            onChange={handleDateChange}
          />
          <label htmlFor="date-to">To:</label>
          <input
            type="date"
            id="date-to"
            name="date-to"
            value={endDate.toISOString().split("T")[0]}
            onChange={handleDateChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
