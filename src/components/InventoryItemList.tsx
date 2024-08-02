import React, { useEffect, useState } from 'react';
import { InventoryItem } from '../types';
import { ListGroup, Container, Button, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const InventoryItemList: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
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
    if (!window.confirm('Are you sure you want to delete this inventory item?')) {
      return;
    }
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
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
                <h2 className='m-2'>
                {item.name} ({item.type})
                </h2>
              </div>
              <div className="col-sm-4" style={{textAlign: 'right'}}> {/* Modified code */}
                <Button
                  variant="info"
                  className="m-2"
                  onClick={() => navigate(`/edit/${item.id}`)}
                >
                  View/Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(item.id)} className='m-2'>
                  Delete
                </Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default InventoryItemList;
