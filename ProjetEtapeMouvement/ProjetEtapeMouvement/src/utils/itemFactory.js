import { getObjects } from "./api.js";
import Items from "../world/items.js";

import Map from "../world/Map.js";



export async function getItems(map){
  let listItems = []
  listItems = await getObjects();

  const item = [];

  for (const object of listItems) {
    const position_random = map.roadrandom(); 
    console.log(position_random); 
    const item_object = new Items(
        object.armor, 
        object.atk, 
        object.hits, 
        object.hp, 
        object.speed, 
        object.type, 
        position_random[0], 
        position_random[1]);
    item.push(item_object);

  }


  console.log(item); 
  return item;
}