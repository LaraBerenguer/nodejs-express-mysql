export interface IUser {
    id: string;
    name: string;
    lastname: string;
    email: string;
    level: "Advanced" | "Beginner";
    location: string;
    lang: number;
    lat: number;
    game: string;
};