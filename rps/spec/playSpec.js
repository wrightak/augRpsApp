function Requests() {
    this.play = (p1Throw, p2Throw, observer) => {
        new PlayRoundRequest(p1Throw, p2Throw, observer).process()
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

describe('play', function () {
    let observer

    describe('p1 Wins scenarios', function () {
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['p1Wins'])
        })

        it('rock v scissors', function () {
            new Requests().play('rock', 'scissors', observer)

            expect(observer.p1Wins).toHaveBeenCalled()
        })

        it('scissors v paper', function () {
            new Requests().play('scissors', 'paper', observer)

            expect(observer.p1Wins).toHaveBeenCalled()
        })

        it('paper v rock', function () {
            new Requests().play('paper', 'rock', observer)

            expect(observer.p1Wins).toHaveBeenCalled()
        })
    })

    describe('p2 Wins scenarios', function () {
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['p2Wins'])
        })

        it('scissors v rock', function () {
            new Requests().play('scissors', 'rock', observer)

            expect(observer.p2Wins).toHaveBeenCalled()
        })

        it('paper v scissors', function () {
            new Requests().play('paper', 'scissors', observer)

            expect(observer.p2Wins).toHaveBeenCalled()
        })

        it('rock v paper', function () {
            new Requests().play('rock', 'paper', observer)

            expect(observer.p2Wins).toHaveBeenCalled()
        })

        describe('tie scenarios', function () {
            beforeEach(() => {
                observer = jasmine.createSpyObj('observer', ['tie'])
            })

            it('scissors v rock', function () {
                new Requests().play('rock', 'rock', observer)

                expect(observer.tie).toHaveBeenCalled()
            })

            it('paper v scissors', function () {
                new Requests().play('scissors', 'scissors', observer)

                expect(observer.tie).toHaveBeenCalled()
            })

            it('rock v paper', function () {
                new Requests().play('paper', 'paper', observer)

                expect(observer.tie).toHaveBeenCalled()
            })
        })

        describe('invalid scenarios', function () {
            beforeEach(() => {
                observer = jasmine.createSpyObj('observer', ['invalid'])
            })

            it('invalid v rock', function () {
                new Requests().play(Math.random(), 'rock', observer)

                expect(observer.invalid).toHaveBeenCalled()
            })

            it('rock v invalid', function () {
                new Requests().play('rock', Math.random(), observer)

                expect(observer.invalid).toHaveBeenCalled()
            })
        })
    })
})
