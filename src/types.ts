export interface CharacterSheet {
  id: string;
  name: string;
  class: string;
  level: number;
  abilities: {
    strength: number;
    dexterity: number;
    willpower: number;
  };
  items: string[];
}
