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
    if (!window.confirm('Are you sure you want to delete this character?')) {
      return;
    }
    const updatedCharacters = characters.filter((character) => character.id !== id);
    setCharacters(updatedCharacters);
    localStorage.setItem('characters', JSON.stringify(updatedCharacters));
  };

  return (
    <Container>
      <h1 className="mt-4">Mice</h1>
      {showAlert && <Alert variant="success">Mouse saved successfully! Redirecting to Mice list...</Alert>}
      <ListGroup>
        {characters.map((character) => (
          <ListGroup.Item key={character.id}>
            <div className="d-flex justify-content-between align-items-center row">
              <div className="col-sm-8">
                <div className='m-2'>
                {character.name} ({character.background})
                </div>
              </div>
              <div className="col-sm-4">
                <Button
                  variant="info"
                  className="m-2"
                  onClick={() => navigate(`/edit/${character.id}`)}
                >
                  View/Edit
                </Button>
                <Button variant="danger" onClick={() => handleDelete(character.id)} className='m-2'>
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
