import React, { useEffect, useState } from "react";
import { InventoryItem } from "../types";
import { v4 as uuidv4 } from "uuid";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const InventoryItemForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [usesMax, setUsesMax] = useState<number>(3);
  const [usesCurrent, setUsesCurrent] = useState<number>(0);
  const [size, setSize] = useState<number>(0);
  const [damageDie, setDamageDie] = useState<string>("");
  const [clearCondition, setClearCondition] = useState<string>("");

  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      const storedItems = localStorage.getItem("items");
      if (storedItems) {
        const items: InventoryItem[] = JSON.parse(storedItems);
        const itemToEdit = items.find((item) => item.id === id);
        if (itemToEdit) {
          setName(itemToEdit.name);
          setType(itemToEdit.type);
          setUsesMax(itemToEdit.usesMax);
          setUsesCurrent(itemToEdit.usesCurrent);
          setSize(itemToEdit.size);
          setDamageDie(itemToEdit.damageDie);
          setClearCondition(itemToEdit.clearCondition);
        }
      }
    }
  }, [id]);

  const handleSaveItem = (event: React.FormEvent<HTMLFormElement>) => {
    setSaving(true);
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      setSaving(false);
      return;
    }

    const newItem: InventoryItem = {
      id: id || uuidv4(),
      name,
      type: type,
      usesMax: usesMax,
      usesCurrent: usesCurrent,
      size: size,
      damageDie: damageDie,
      clearCondition: clearCondition,
    };

    const storedItems = localStorage.getItem("items");
    const items = storedItems ? JSON.parse(storedItems) : [];

    if (id) {
      const index = items.findIndex((item: InventoryItem) => item.id === id);
      if (index !== -1) {
        items[index] = newItem;
      }
    } else {
      items.push(newItem);
    }

    localStorage.setItem("items", JSON.stringify(items));
    setShowAlert(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <Container fluid>
      <h2 className="mt-4">{id ? "Edit" : "Add New"} Inventory Item</h2>
      {showAlert && (
        <Alert variant="success">
          Inventory Item {id ? "updated" : "created"} successfully! Redirecting
          to Inventory Items list...
        </Alert>
      )}
      <Form noValidate validated={validated} onSubmit={handleSaveItem}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formType">
          <Form.Label>Type</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a type.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formUsesMax">
          <Form.Label>Max Uses</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter max uses"
            value={usesMax}
            onChange={(e) => setUsesMax(Number(e.target.value))}
          />
          <Form.Control.Feedback type="invalid">
            Please provide the maximum uses.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formUsesCurrent">
          <Form.Label>Current Uses</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter current uses"
            value={usesCurrent}
            onChange={(e) => setUsesCurrent(Number(e.target.value))}
          />
          <Form.Control.Feedback type="invalid">
            Please provide the current uses.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formSize">
          <Form.Label>Size</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter size"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a size.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formDamageDie">
          <Form.Label>Damage Die</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter damage die"
            value={damageDie}
            onChange={(e) => setDamageDie(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a damage die.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formClearCondition">
          <Form.Label>Clear Condition</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter clear condition"
            value={clearCondition}
            onChange={(e) => setClearCondition(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a clear condition.
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={saving}
          className="submit-button"
        >
          {saving ? "Saving..." : "Save"}
        </Button>
      </Form>
      <Container style={{ height: "100px" }} />
    </Container>
  );
};

export default InventoryItemForm;
