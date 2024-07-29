export interface CharacterSheet {
  id: string;
  name: string;
  class: string;
  level: number;
  abilities: {
    strength: {
      max: number;
      current: number;
    };
    dexterity: {
      max: number;
      current: number;
    };
    willpower: {
      max: number;
      current: number;
    };
  };
  items: string[];
}
