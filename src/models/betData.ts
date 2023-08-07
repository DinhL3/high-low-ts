class betData {
    userGuess: string;
    betAmount: number;
    winningPayout: number;

    constructor(userGuess: string, betAmount: number, winningPayout: number) {
        this.userGuess = userGuess;
        this.betAmount = betAmount;
        this.winningPayout = winningPayout;
    }
}

export default betData;