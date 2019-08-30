const {Requests, Round} = require('../src/rps')

function FakeRoundRepo() {
    this.isEmpty = () => {
        return true
    }
}

fdescribe('round repo contract', () => {
    describe('when no rounds have been played', () => {
        it('is empty', () => {
            expect(new FakeRoundRepo().isEmpty()).toEqual(true)
        })
    })

    describe('when rounds have been played', () => {
        it('is not empty', () => {

        })

        it('returns rounds that have been played', () => {

        })
    })
})


describe('history', () => {
    describe('when no rounds have been played', () => {
        it('tells the ui that no rounds have been played', () => {
            let observer = jasmine.createSpyObj('observer', ['noRounds'])


            new Requests().getHistory(observer)


            expect(observer.noRounds).toHaveBeenCalled()
        })
    })

    describe('when rounds have been played', () => {
        it('sends the rounds to the UI', () => {
            let historyObserver = jasmine.createSpyObj('historyObserver', ['rounds'])

            let requests = new Requests()
            let playObserver = { invalid() {}}

            let roundRepo = {
                isEmpty() {},
                getRounds() {},
                addRound() {},
            }

            requests.play('rock', 'sailboat', playObserver, roundRepo)


            requests.getHistory(historyObserver, roundRepo)


            expect(historyObserver.rounds).toHaveBeenCalledWith([
                new Round('rock', 'sailboat', 'invalid')
            ])
        })
    })
})
