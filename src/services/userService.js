import config from "../config.json";
import http from "./httpService";

const apiEndpoint = config.apiEndpoint + "/users";

export function registerUser(user){
    return http.post(apiEndpoint, {
        email: user.username,
        password: user.password,
        name: user.name
    });
}