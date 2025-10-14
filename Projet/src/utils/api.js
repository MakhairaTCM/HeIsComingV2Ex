import axios from "axios";
import { API } from "./consts.js";

export async function getObjects() {
  const response = await axios.get(API.objects);
  return response.data;
}

export async function getMap() {
  const response = await axios.get(API.map);
  return response.data;
}
