import React, { useEffect, useState } from 'react';
import { CharacterSheet } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const CharacterForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [charClass, setCharClass] = useState('');
  const [level, setLevel] = useState(1);
  const [strengthMax, setStrengthMax] = useState(0);
  const [dexterityMax, setDexterityMax] = useState(0);
  const [willpowerMax, setWillpowerMax] = useState(0);
  const [strengthCurrent, setStrengthCurrent] = useState(0);
  const [dexterityCurrent, setDexterityCurrent] = useState(0);
  const [willpowerCurrent, setWillpowerCurrent] = useState(0);
  const [items, setItems] = useState<string[]>([]);
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      const storedCharacters = localStorage.getItem('characters');
      if (storedCharacters) {
        const characters: CharacterSheet[] = JSON.parse(storedCharacters);
        const characterToEdit = characters.find((character) => character.id === id);
        if (characterToEdit) {
          setName(characterToEdit.name);
          setCharClass(characterToEdit.class);
          setLevel(characterToEdit.level);
          setStrengthMax(characterToEdit.abilities.strength.max);
          setDexterityMax(characterToEdit.abilities.dexterity.max);
          setWillpowerMax(characterToEdit.abilities.willpower.max);
          setStrengthCurrent(characterToEdit.abilities.strength.current);
          setDexterityCurrent(characterToEdit.abilities.dexterity.current);
          setWillpowerCurrent(characterToEdit.abilities.willpower.current);
          setItems(characterToEdit.items);
        }
      }
    }
  }, [id]);

  const handleSaveCharacter = (event: React.FormEvent<HTMLFormElement>) => {
    setSaving(true);
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      setSaving(false);
      return;
    }

    const newCharacter: CharacterSheet = {
      id: id || uuidv4(),
      name,
      class: charClass,
      level,
      abilities: {
        strength: { max: strengthMax, current: strengthMax },
        dexterity: { max: strengthMax, current: strengthMax },
        willpower: { max: strengthMax, current: strengthMax },
      },
      items,
    };

    const storedCharacters = localStorage.getItem('characters');
    const characters = storedCharacters ? JSON.parse(storedCharacters) : [];

    if (id) {
      const index = characters.findIndex((character: CharacterSheet) => character.id === id);
      if (index !== -1) {
        characters[index] = newCharacter;
      }
    } else {
      characters.push(newCharacter);
    }

    localStorage.setItem('characters', JSON.stringify(characters));
    setShowAlert(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <Container>
      <h2 className="mt-4">{id ? 'Edit' : 'Add New'} Character</h2>
      {showAlert && <Alert variant="success">Character {id ? 'updated' : 'created'} successfully!</Alert>}
      <Form noValidate validated={validated} onSubmit={handleSaveCharacter}>
        <Row>
          <Form.Group controlId="formName">
            <Col>
              <Form.Label>Name</Form.Label>
            </Col>
            <Col>
              <Form.Control
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a name.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Row>

        <Form.Group controlId="formClass">
          <Form.Label>Class</Form.Label>
          <Form.Control
            required
            type="text"
            value={charClass}
            onChange={(e) => setCharClass(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a class.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formLevel">
          <Form.Label>Level</Form.Label>
          <Form.Control
            required
            type="number"
            value={level}
            onChange={(e) => setLevel(parseInt(e.target.value))}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a level.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formStrengthMax">
          <Form.Label>Strength Max</Form.Label>
          <Form.Control
            required
            type="number"
            value={strengthMax}
            onChange={(e) => setStrengthMax(parseInt(e.target.value))}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a strength value.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formStrengthCurrent">
          <Form.Label>Strength Current</Form.Label>
          <Form.Control
            required
            type="number"
            value={strengthCurrent}
            onChange={(e) => setStrengthCurrent(parseInt(e.target.value))}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a strength value.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formDexterityMax">
          <Form.Label>Dexterity Max</Form.Label>
          <Form.Control
            required
            type="number"
            value={dexterityMax}
            onChange={(e) => setDexterityMax(parseInt(e.target.value))}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a dexterity value.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formDexterityCurrent">
          <Form.Label>Dexterity Current</Form.Label>
          <Form.Control
            required
            type="number"
            value={dexterityCurrent}
            onChange={(e) => setDexterityCurrent(parseInt(e.target.value))}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a dexterity value.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formWillpowerMax">
          <Form.Label>Willpower Max</Form.Label>
          <Form.Control
            required
            type="number"
            value={willpowerMax}
            onChange={(e) => setWillpowerMax(parseInt(e.target.value))}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a willpower value.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formWillpowerCurrent">
          <Form.Label>Willpower Current</Form.Label>
          <Form.Control
            required
            type="number"
            value={willpowerCurrent}
            onChange={(e) => setWillpowerCurrent(parseInt(e.target.value))}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a willpower value.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formItems">
          <Form.Label>Items</Form.Label>
          <Form.Control
            required
            type="text"
            value={items.join(', ')}
            onChange={(e) => setItems(e.target.value.split(', '))}
          />
          <Form.Control.Feedback type="invalid">
            Please provide at least one item.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={saving}>
          {id ? 'Save Changes' : 'Add Character'}
        </Button>
      </Form>
    </Container>
  );
};

export default CharacterForm;
