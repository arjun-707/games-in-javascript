const sleep = _ => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, _)
  })
}
class SnakesAndLadders {
  constructor(snakeLadders) {
    this.players = []
    this.playersCount = 0
    this.turn = 1
    this.snake = snakeLadders.snakes
    this.ladder = snakeLadders.ladders
  }
  addPlayer (name) {
    this.players.push({
      name: name,
      place: ++this.playersCount,
      position: 0
    })
  };
  rollDice () {
    const diceValue = Math.floor(Math.random() * 7)
    return diceValue? diceValue: this.rollDice();
  }
  async play () {
    const diceNum = +this.rollDice()
    if (this.turn > this.playersCount)
      this.turn = 1
    const filterPlayer = this.players.filter(e => e.place == this.turn)
    filterPlayer[0].position += diceNum
    console.log(`dice: ${diceNum}, turn: ${this.turn}, player position: ${filterPlayer[0].position}, player name: ${filterPlayer[0].name}`)
    if (filterPlayer[0].position > 100) {
      filterPlayer[0].position -= diceNum
      // await sleep(1000)
      console.log('next turn...')
      return this.play()
    }
    else if (filterPlayer[0].position == 100) {
      return `********************* ${filterPlayer[0].name} is winner *********************`;
    }
    else {
      let isClimbedLadder = false
      if (this.snake[`${filterPlayer[0].position}`]) {
        console.log('BITTEN')
        filterPlayer[0].position = this.snake[`${filterPlayer[0].position}`]
      }
      else if (this.ladder[`${filterPlayer[0].position}`]) {
        console.log('CLIMBED')
        filterPlayer[0].position = this.ladder[`${filterPlayer[0].position}`]
        isClimbedLadder = true
      }

      // get double chance in case of dice number was 6 or climbed the ladder
      if (diceNum < 6 && !isClimbedLadder)
        ++this.turn

      console.log('next turn...')
      await sleep(500)
      return this.play()
    }

  };
}

const game = new SnakesAndLadders({
  snakes: { 97: 78, 95: 56, 88: 24, 62: 18, 36: 6, 32: 10, 48: 26 },
  ladders: { 1: 38, 4: 14, 8: 30, 21: 42, 28: 76, 50: 67, 88: 99, 71: 92 }
});

game.addPlayer("Mayank");
game.addPlayer("Arjun");
game.addPlayer("Himanshu");
game.addPlayer("Akhil");
game.play().then(console.log);
