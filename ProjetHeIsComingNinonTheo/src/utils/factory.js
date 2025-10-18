import { getEnemies, getObjects } from "./api.js";
import Items from "../world/items.js";
import Enemies from "../entities/Enemies.js";


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