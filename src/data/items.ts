import { InventoryItem } from '../types';
import { v4 as uuidv4 } from "uuid";


export function defaultItems(): InventoryItem[] {
  return [
    {
      id: uuidv4(),
      name: '',
      type: 'improvised',
      usesMax: 3,
      usesCurrent: 0,
      size: 1,
      damageDie: 'd6',
      clearCondition: ''
    },
    {
      id: uuidv4(),
      name: 'Stones',
      type: 'ammunition',
      usesMax: 3,
      usesCurrent: 0,
      size: 1,
      damageDie: '',
      clearCondition: ''
    },
    {
      id: uuidv4(),
      name: 'Heavy Armour',
      type: 'armour',
      usesMax: 3,
      usesCurrent: 0,
      size: 2,
      damageDie: '1 Def',
      clearCondition: ''
    },
    {
      id: uuidv4(),
      name: 'Light Armour',
      type: 'armour',
      usesMax: 3,
      usesCurrent: 0,
      size: 2,
      damageDie: '1 Def',
      clearCondition: ''
    },
    {
      id: uuidv4(),
      name: 'Needle',
      type: 'light',
      usesMax: 3,
      usesCurrent: 0,
      size: 1,
      damageDie: 'd6',
      clearCondition: ''
    },
    {
      id: uuidv4(),
      name: 'Arrows',
      type: 'ammunition',
      usesMax: 3,
      usesCurrent: 0,
      size: 1,
      damageDie: '',
      clearCondition: ''
    },
    {
      id: uuidv4(),
      name: 'Dagger',
      type: 'light',
      usesMax: 3,
      usesCurrent: 0,
      size: 1,
      damageDie: 'd6',
      clearCondition: ''
    },
    {
      id: uuidv4(),
      name: 'Axe',
      type: 'medium',
      usesMax: 3,
      usesCurrent: 0,
      size: 1,
      damageDie: 'd6/d8',
      clearCondition: ''
    },
    {
      id: uuidv4(),
      name: 'Sword',
      type: 'medium',
      usesMax: 3,
      usesCurrent: 0,
      size: 1,
      damageDie: 'd6/d8',
      clearCondition: ''
    },
    {
      id: uuidv4(),
      name: 'Mace',
      type: 'medium',
      usesMax: 3,
      usesCurrent: 0,
      size: 1,
      damageDie: 'd6/d8',
      clearCondition: ''
    },
    {
      id: uuidv4(),
      name: 'Sling',
      type: 'light ranged',
      usesMax: 3,
      usesCurrent: 0,
      size: 1,
      damageDie: 'd6',
      clearCondition: ''
    },
    {
      id: uuidv4(),
      name: 'Warhammer',
      type: 'heavy',
      usesMax: 3,
      usesCurrent: 0,
      size: 2,
      damageDie: 'd10',
      clearCondition: ''
    },
    {
      id: uuidv4(),
      name: 'Spear',
      type: 'heavy',
      usesMax: 3,
      usesCurrent: 0,
      size: 2,
      damageDie: 'd10',
      clearCondition: ''
    },
    {
      id: uuidv4(),
      name: 'Hookarm',
      type: 'heavy',
      usesMax: 3,
      usesCurrent: 0,
      size: 2,
      damageDie: 'd10',
      clearCondition: ''
    },
    {
      id: uuidv4(),
      name: 'Bow',
      type: 'heavy ranged',
      usesMax: 3,
      usesCurrent: 0,
      size: 2,
      damageDie: 'd8',
      clearCondition: ''
    },
    {
      id: uuidv4(),
      name: 'Torches',
      type: '',
      usesMax: 3,
      usesCurrent: 0,
      size: 1,
      damageDie: 'd8',
      clearCondition: ''
    },
    {
      id: uuidv4(),
      name: 'Lantern',
      type: '',
      usesMax: 3,
      usesCurrent: 0,
      size: 1,
      damageDie: 'd8',
      clearCondition: ''
    },
    {
      id: uuidv4(),
      name: 'Electric Lantern',
      type: '',
      usesMax: 3,
      usesCurrent: 0,
      size: 1,
      damageDie: 'd8',
      clearCondition: ''
    },
    {
      id: uuidv4(),
      name: 'Rations',
      type: '',
      usesMax: 3,
      usesCurrent: 0,
      size: 1,
      damageDie: 'd8',
      clearCondition: ''
    },
    {
      id: uuidv4(),
      name: 'Exhausted',
      type: '',
      usesMax: 0,
      usesCurrent: 0,
      size: 1,
      damageDie: '',
      clearCondition: 'After long rest'
    },
    {
      id: uuidv4(),
      name: 'Frightened',
      type: 'WIL save to approach source of fear',
      usesMax: 0,
      usesCurrent: 0,
      size: 1,
      damageDie: '',
      clearCondition: 'After short rest'
    },
    {
      id: uuidv4(),
      name: 'Hungry',
      type: '',
      usesMax: 0,
      usesCurrent: 0,
      size: 1,
      damageDie: '',
      clearCondition: 'After meal'
    },
    {
      id: uuidv4(),
      name: 'Injured',
      type: 'Disadvantage on STR & DEX saves',
      usesMax: 0,
      usesCurrent: 0,
      size: 1,
      damageDie: '',
      clearCondition: 'After full rest'
    },
    {
      id: uuidv4(),
      name: 'Drained',
      type: 'Disadvantage on WIL saves',
      usesMax: 0,
      usesCurrent: 0,
      size: 1,
      damageDie: '',
      clearCondition: 'After full rest'
    },
  ];
}
