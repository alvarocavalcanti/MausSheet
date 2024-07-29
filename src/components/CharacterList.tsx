import React, { useEffect, useState } from 'react';
import { CharacterSheet } from '../types';
import { ListGroup, Container, Button, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<CharacterSheet[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const storedCharacters = localStorage.getItem('characters');
    if (storedCharacters) {
      setCharacters(JSON.parse(storedCharacters));
    }

    if (location.state && location.state.showAlert) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  }, [location.state]);

  const handleDelete = (id: string) => {
    const updatedCharacters = characters.filter((character) => character.id !== id);
    setCharacters(updatedCharacters);
    localStorage.setItem('characters', JSON.stringify(updatedCharacters));
  };

  return (
    <Container>
      <h1 className="mt-4">Character Sheets</h1>
      {showAlert && <Alert variant="success">Character saved successfully!</Alert>}
      <ListGroup>
        {characters.map((character) => (
          <ListGroup.Item key={character.id}>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {character.name} - Level {character.level}
              </div>
              <div>
                <Button
                  variant="info"
                  className="mr-2"
                  onClick={() => navigate(`/view/${character.id}`)}
                >
                  View
                </Button>
                <Button
                  variant="warning"
                  className="mr-2"
                  onClick={() => navigate(`/edit/${character.id}`)}
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(character.id)}>
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

export default CharacterList;
