import React, { useState, useEffect } from "react";
import Panel from "./Panel";
import PanelDetailsModal from "./PanelDetailsModal";
import "../styles/Footer.css";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    let y = 10; // Initial vertical position

    panels.forEach((panel, index) => {
      const panelData = panelContent[index] || [];
      const tableData = panelData.map((place) => [
        place.name,
        place.address,
        place.phone,
      ]);

      // Add the Date and Day header
      doc.setFontSize(12);
      doc.text(`Date: ${panel.date} (${panel.dayOfWeek})`, 10, y);
      y += 10; // Move down for the table

      // Add the table
      doc.autoTable({
        startY: y,
        head: [["Place", "Address", "Phone"]],
        body: tableData,
        margin: { left: 10, right: 10 },
      });

      // Update y position for the next section
      y = doc.autoTable.previous.finalY + 10; // Add some space after the table

      // If the y position is too close to the bottom, add a new page
      if (y > doc.internal.pageSize.height - 20) {
        doc.addPage();
        y = 10; // Reset y position for new page
      }
    });

    doc.save("itinerary.pdf");
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
          <div className="from-date">
            <label className="label" htmlFor="date-from">
              From:
            </label>
            <input
              type="date"
              id="date-from"
              name="date-from"
              value={startDate.toISOString().split("T")[0]}
              onChange={handleDateChange}
            />
          </div>
          <div className="to-date">
            <label className="label" htmlFor="date-to">
              To:
            </label>
            <input
              type="date"
              id="date-to"
              name="date-to"
              value={endDate.toISOString().split("T")[0]}
              onChange={handleDateChange}
            />
          </div>
          <button onClick={downloadPDF} className="download-button">
            <span className="material-icons">file_download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
