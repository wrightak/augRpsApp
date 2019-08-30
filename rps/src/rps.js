function Requests() {
    this.play = (p1Throw, p2Throw, observer, repo) => {
        new PlayRoundRequest(p1Throw, p2Throw, observer, repo).process()
    }

    this.getHistory = (observer, repo) => {
        if (repo.isEmpty()) {
            observer.noRounds()
        } else {
            observer.rounds(repo.getRounds())
        }
    }
}

function PlayRoundRequest(p1Throw, p2Throw, observer, repo) {
    this.process = () => {
        if (isInvalidThrow(p1Throw) ||
            isInvalidThrow(p2Throw)) {
            observer.invalid()
            repo.addRound(new Round(p1Throw, p2Throw, 'invalid'))
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

function Round(p1Throw, p2Throw, result) {
    this.p1Throw = p1Throw
    this.p2Throw = p2Throw
    this.result = result
}

module.exports = {Requests, Round}
