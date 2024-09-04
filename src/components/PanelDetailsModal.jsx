import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import "../styles/PanelDetailsModal.css"; // Ensure the path is correct

const PanelDetailsModal = ({
  open,
  onClose,
  panelData,
  onUpdatePanelContent,
}) => {
  const [items, setItems] = useState(panelData?.content);
  const [index, setIndex] = useState(panelData?.index);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setItems(panelData?.content);
    setIndex(panelData?.index);
  }, [panelData]);

  useEffect(() => {
    if (selectedItems.length > 0) {
      setSelectAll(items.every((item) => selectedItems.has(item.location_id)));
    }
  }, [selectedItems]);

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = new Set(prevSelectedItems);
      if (newSelectedItems.has(itemId)) {
        newSelectedItems.delete(itemId);
      } else {
        newSelectedItems.add(itemId);
      }
      return newSelectedItems;
    });
  };

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectedItems(new Set(items.map((item) => item.location_id)));
    } else {
      setSelectedItems(new Set());
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = () => {
    const updatedContent = items.filter(
      (item) => !selectedItems.has(item.location_id)
    );

    setItems(updatedContent);
    setSelectedItems(new Set());
    setSelectAll(false);
  };

  const handleClose = () => {
    onUpdatePanelContent(items, index);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="panel-details-title"
      aria-describedby="panel-details-description"
    >
      <Box className="modal-box">
        <div className="header">
          <div className="title">
            <Typography id="panel-details-title" variant="h6">
              {panelData?.dayOfWeek} - {panelData?.date}
            </Typography>
          </div>
          <div className="close">
            <IconButton onClick={handleClose} color="secondary">
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <div className="actions">
          <label>
            <Checkbox checked={selectAll} onChange={handleSelectAll} />
            Select All
          </label>
          <IconButton onClick={handleDeleteSelected} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
        <div className="list-container">
          {items?.map((item) => (
            <Box key={item.location_id} className="list-item">
              <Checkbox
                checked={selectedItems.has(item.location_id)}
                onChange={() => handleCheckboxChange(item.location_id)}
              />
              <Typography>{item.name}</Typography>
            </Box>
          ))}
        </div>
      </Box>
    </Modal>
  );
};

export default PanelDetailsModal;
