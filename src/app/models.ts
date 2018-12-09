export class Contestant {
    name: string;
    occupation: string;
    isDumped: boolean;
    imageUrl: string;
}

export class User {
    name: string;
    contestants: Contestant[];
}

export class BachelorResponse {
    contestants: Contestant[];
    users: User[];
}