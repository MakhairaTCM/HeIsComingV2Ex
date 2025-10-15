import axios from 'axios';
import { API_URL, MAP_SIZE } from '../utils/consts.js';

export async function getMap(){
  const response = await axios.get(API_URL+"/map/"+MAP_SIZE);
  return response.data;
}

export async function getObjects(){
  const response = await axios.get(API_URL+"/objects"); 
  //console.log(response.data); 
  return response.data;
}