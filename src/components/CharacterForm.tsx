import React, { useEffect, useState } from 'react';
import { CharacterSheet } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const CharacterForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [charClass, setCharClass] = useState('');
  const [level, setLevel] = useState(1);
  const [strength, setStrength] = useState(0);
  const [dexterity, setDexterity] = useState(0);
  const [willpower, setWillpower] = useState(0);
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
          setStrength(characterToEdit.abilities.strength);
          setDexterity(characterToEdit.abilities.dexterity);
          setWillpower(characterToEdit.abilities.willpower);
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
        strength,
        dexterity,
        willpower,
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
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a name.
          </Form.Control.Feedback>
        </Form.Group>

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

        <Form.Group controlId="formStrength">
          <Form.Label>Strength</Form.Label>
          <Form.Control
            required
            type="number"
            value={strength}
            onChange={(e) => setStrength(parseInt(e.target.value))}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a strength value.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formDexterity">
          <Form.Label>Dexterity</Form.Label>
          <Form.Control
            required
            type="number"
            value={dexterity}
            onChange={(e) => setDexterity(parseInt(e.target.value))}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a dexterity value.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formWillpower">
          <Form.Label>Willpower</Form.Label>
          <Form.Control
            required
            type="number"
            value={willpower}
            onChange={(e) => setWillpower(parseInt(e.target.value))}
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
