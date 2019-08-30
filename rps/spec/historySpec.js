const {Requests} = require('../src/rps')

describe('history', () => {
    describe('when no rounds have been played', () => {
        it('tells the ui that no rounds have been played', () => {
            let observer = jasmine.createSpyObj('observer', ['noRounds'])


            new Requests().getHistory(observer)


            expect(observer.noRounds).toHaveBeenCalled()
        })
    })
})
