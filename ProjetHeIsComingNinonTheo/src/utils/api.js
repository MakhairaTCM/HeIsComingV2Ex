import axios from 'axios';
import { API_URL, MAP_SIZE, TREASURES_NUMBER, ITEMINTREASURES} from './consts.js';

export async function getMap(){
  const response = await axios.get(API_URL+"/map/"+MAP_SIZE);
  return response.data;
}

export async function getObjects(){
  const response = await axios.get(API_URL+"/objects"); 
  return response.data;
}

export async function getEnemies(){
  const response = await axios.get(API_URL+"/enemies"); 
  return response.data; 
}

export async function getTreasures(TREASURES_NUMBER, ITEMINTREASURES) {
  const response = await axios.get(API_URL+`/objects/treasures`+`/${TREASURES_NUMBER}`+`/${ITEMINTREASURES}`);
  return response.data; 
}