import { getEnemies, getObjects, getTreasures} from "./api.js";
import Items from "../world/items.js";
import Enemies from "../entities/Enemies.js";
import Treasures from "../world/treasures.js";
import {TREASURES_NUMBER, ITEMINTREASURES} from './consts.js';



export async function getItems(map){
  let listItems = []
  listItems = await getObjects();

  const items = [];

  for (const object of listItems) {
    const position_random = map.roadrandom(); 
    const item_object = new Items(
        object.armor, 
        object.atk, 
        object.hits, 
        object.hp, 
        object.speed, 
        object.type, 
        object.meta_name, 
        position_random[0], 
        position_random[1]);
    items.push(item_object);

  }

  return items;
}

export async function getMonsters(map) {
  let listMonters = []; 
  listMonters = await getEnemies(); 

  const monsters = []; 
  for (const monster of listMonters){
    const position_random_monster = map.roadrandom(); 
    const monster_object = new Enemies(
      monster.armor,
      monster.atk, 
      monster.hits, 
      monster.hp, 
      monster.speed, 
      monster.type, 
      monster.meta_name, 
      position_random_monster[0], 
      position_random_monster[1])
    monsters.push(monster_object); 

  }
  return monsters; 
}

export async function getChest(map) {
  let listTreasures = [];
  listTreasures = await getTreasures(TREASURES_NUMBER, ITEMINTREASURES); 
  
  const treasures = []; 

  for (const treasure of listTreasures) {
    const position_random_treasure = map.roadrandom(); 
    
    const listItems = [];

  for (const item of treasure) {
    const itemObj = new Items(
      item.armor,
      item.atk,
      item.hits,
      item.hp,
      item.speed,
      item.type,
      item.meta_name,
      0, 0
    );
    listItems.push(itemObj);

  }

  const treasureObj = new Treasures(listItems, position_random_treasure[0], position_random_treasure[1]); 
  treasures.push(treasureObj);
}
    return treasures; 
  } 
