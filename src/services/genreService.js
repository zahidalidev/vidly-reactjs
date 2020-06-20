import config from "../config.json";
import http from "./httpService";

export function getGenres(){
    return http.get(config.apiEndpoint + "/genres");
}