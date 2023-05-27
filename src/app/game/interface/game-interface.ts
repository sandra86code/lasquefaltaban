export interface GameResponse {
    id:                 number;
    date:               string;
    score:              number;
    user:               User;
}


export interface User {
    username:           string;
}