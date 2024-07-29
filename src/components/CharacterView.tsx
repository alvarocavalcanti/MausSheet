import React, { useEffect, useState } from 'react';
import { CharacterSheet } from '../types';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

const CharacterView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<CharacterSheet | null>(null);

  useEffect(() => {
    const storedCharacters = localStorage.getItem('characters');
    if (storedCharacters) {
      const characters: CharacterSheet[] = JSON.parse(storedCharacters);
      const foundCharacter = characters.find((character) => character.id === id);
      setCharacter(foundCharacter || null);
    }
  }, [id]);

  if (!character) {
    return <p>Character not found</p>;
  }

  return (
    <Container>
      <h1 className="mt-4">View Character</h1>
      <Card>
        <Card.Body>
          <Card.Title>{character.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{character.class}</Card.Subtitle>
          <Card.Text>
            Level: {character.level}
            <br />
            Strength: {character.abilities.strength}
            <br />
            Dexterity: {character.abilities.dexterity}
            <br />
            Willpower: {character.abilities.willpower}
            <br />
            Items: {character.items.join(', ')}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CharacterView;
