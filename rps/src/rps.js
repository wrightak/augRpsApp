function Requests() {
    this.play = (p1Throw, p2Throw, observer) => {
        new PlayRoundRequest(p1Throw, p2Throw, observer).process()
    }

    this.getHistory = (observer) => {
        observer.noRounds()
    }
}

function PlayRoundRequest(p1Throw, p2Throw, observer) {
    this.process = () => {
        if (isInvalidThrow(p1Throw) ||
            isInvalidThrow(p2Throw)) {
            observer.invalid()
        } else if (tieScenario()) {
            observer.tie()
        } else if (p1WinsScenario()) {
            observer.p1Wins()
        } else {
            observer.p2Wins()
        }
    }

    function p1WinsScenario() {
        return p1Throw === THROW.ROCK && p2Throw === THROW.SCISSORS ||
            p1Throw === THROW.SCISSORS && p2Throw === THROW.PAPER ||
            p1Throw === THROW.PAPER && p2Throw === THROW.ROCK
    }

    function tieScenario() {
        return p1Throw === p2Throw
    }

    function isInvalidThrow(playerThrow) {
        return !VALID_THROWS.includes(playerThrow)
    }

    const THROW = {
        ROCK: 'rock',
        SCISSORS: 'scissors',
        PAPER: 'paper'
    }

    const VALID_THROWS = [THROW.ROCK, THROW.SCISSORS, THROW.PAPER]
}

module.exports = {Requests}
