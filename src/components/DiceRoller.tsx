// src/DiceRoller.tsx
import React, { useState } from "react";
import "../index.css";
import { Button, Col, Row } from "react-bootstrap";

const diceTypes = [
  { sides: 4, name: "d4" },
  { sides: 6, name: "d6" },
  { sides: 8, name: "d8" },
  { sides: 10, name: "d10" },
  { sides: 12, name: "d12" },
  { sides: 20, name: "d20" },
  { sides: 100, name: "d100" },
];

const rollDice = (sides: number) => {
  return Math.floor(Math.random() * sides) + 1;
};

const DiceRoller: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleRoll = (sides: number) => {
    const rollResult = rollDice(sides);
    setResult(`${rollResult}`);
  };

  return (
    <div className="dice-roller-container">
      <Row>
        <Col>{result && <h2>{result}</h2>}</Col>
      </Row>
      {expanded && (
        <div>
          {diceTypes.map((dice) => (
            <Row>
              <Col>
                <Button
                  key={dice.sides}
                  onClick={() => handleRoll(dice.sides)}
                  className="mt-1 secondary"
                  variant="secondary"
                >
                  {dice.name}
                </Button>
              </Col>
            </Row>
          ))}
        </div>
      )}
      <Row>
        <Col>
          <Button
            onClick={() => {
              setExpanded(!expanded);
              setResult(null);
            }}
            className="mt-2"
            variant="primary"
          >
            {!expanded ? "Roll" : "Hide"}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default DiceRoller;
