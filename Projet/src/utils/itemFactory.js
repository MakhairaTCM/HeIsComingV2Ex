import { getObjects } from "./api.js";
import Item from "../Entités/Item.js";

export async function getItems() {

  let rawObjects = [];
  try {
    rawObjects = await getObjects();
  } catch (error) {
    console.error("getItems: failed to get objects from API", error);
    return [];
  }


  if (!Array.isArray(rawObjects)) {
    return [];
    
  }

  const items = [];
  for (const obj of rawObjects) {
    if (!obj) continue;

    const modifiers = {
      pv: obj.hp,
      attack: obj.atk,
      armor: obj.armor,
      speed: obj.speed,
      hits: obj.hits,
    };

    const item = new Item({
      name: obj.name,
      meta_name: obj.meta_namel,
      type: obj.type,
      modifiers: modifiers,
    });

    items.push(item);
  }

  return items;
}
