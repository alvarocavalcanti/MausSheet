import React, { useEffect, useState } from "react";
import { InventoryItem } from "../types";
import { ListGroup, Container, Button, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { defaultItems } from "../data/items";

const InventoryItemList: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }

    if (location.state && location.state.showAlert) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  }, [location.state]);

  const handleDelete = (id: string) => {
    if (
      !window.confirm("Are you sure you want to delete this inventory item?")
    ) {
      return;
    }
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const handleDeleteItems = () => {
    if (!window.confirm("Are you sure you want to delete all inventory items?")) {
      return;
    }
    setItems([]);
    localStorage.removeItem("items");
  };

  const handleAddDefaultItems = () => {
    const defItems = defaultItems();
    setItems(defItems);
    localStorage.setItem('items', JSON.stringify(defItems));
  };

  return (
    <Container>
      <h1 className="mt-4">Inventory Items</h1>
      {showAlert && <Alert variant="success">Item saved successfully!</Alert>}
      <ListGroup>
        {items.map((item) => (
          <ListGroup.Item key={item.id}>
            <div className="d-flex justify-content-between align-items-center row">
              <div className="col-sm-8">
                <h2 className="m-2">
                  {item.name} ({item.type})
                </h2>
              </div>
              <div className="col-sm-4" style={{ textAlign: "right" }}>
                {" "}
                {/* Modified code */}
                <Button
                  variant="info"
                  className="m-2"
                  onClick={() => navigate(`/edit/${item.id}`)}
                >
                  View/Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(item.id)}
                  className="m-2"
                >
                  Delete
                </Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      {items.length === 0 && (
        <>
          <div style={{ fontFamily: "fantasy" }}>
            No items found. Click the button below to add the default items!
          </div>
          <Button variant="primary" onClick={handleAddDefaultItems} className="mt-3">
            Add Default Items
          </Button>
        </>
      )}
      {items.length > 0 && (
        <Button variant="danger" onClick={handleDeleteItems} className="mt-3">
          Delete All Items
        </Button>
      )}
    </Container>
  );
};

export default InventoryItemList;
