export class Contestant {
    name: string;
    occupation: string;
    isDumped: boolean;
    imageUrl: string;
    selectedBy: string;
}

export class Season {
    season: string;
    winner: string;
    nextBach: string;
    pickedWinner: string;
    pickedBach: string;
}

export class BachelorResponse {
    contestants: Contestant[];
    scoreboard: Season[];
}