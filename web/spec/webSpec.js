import ReactDOM from 'react-dom'
import React from 'react'
import ReactTestUtils from 'react-dom/test-utils'

describe('play form', () => {
    beforeEach(() => {
        setupDOM()
    })

    afterEach(() => {
        teardownDOM()
    })

    describe('when the request processes as player 1 wins', () => {
        beforeEach(() => {
            renderApp({
                play: (p1, p2, ui) => ui.p1Wins()
            })
        })

        it('by default does not display a game result', () => {
            expect(page()).not.toContain('PLAYER 1 WINS!')
        })

        it('tells the user that the result was player one wins', () => {
            submitForm()


            expect(page()).toContain('PLAYER 1 WINS!')
        })
    })

    describe('when the request processes as player 2 wins', () => {
        beforeEach(() => {
            renderApp({
                play: (p1, p2, ui) => ui.p2Wins()
            })
        })

        it('by default does not display a game result', () => {
            expect(page()).not.toContain('PLAYER 2 WINS!')
        })

        it('tells the user that the result was player one wins', () => {
            submitForm()


            expect(page()).toContain('PLAYER 2 WINS!')
        })
    })

    describe('when the request processed is a tie', () => {
        beforeEach(() => {
            renderApp({
                play: (p1, p2, ui) => ui.tie()
            })
        })

        it('by default does not display a game result', () => {
            expect(page()).not.toContain('TIE!')
        })

        it('tells the user that the result was a tie', () => {
            submitForm()


            expect(page()).toContain('TIE!')
        })
    })

    describe('when the play use case tells the UI that the input is invalid', () => {
        beforeEach(() => {
            renderApp({
                play: (p1, p2, ui) => ui.invalid()
            })
        })

        it('does not display the result by default', () => {
            expect(page()).not.toContain('INVALID!')
        })

        it('tells the user that their input is invalid', () => {
            submitForm()


            expect(page()).toContain('INVALID!')
        })
    })

    describe('submitting a game', () => {
        it('sends the users input to the game module', () => {
            let playSpy = jasmine.createSpy('playSpy')
            renderApp({play: playSpy})

            enterTextIntoInput('p1Throw', 'hoge')
            enterTextIntoInput('p2Throw', 'fuga')


            submitForm()


            expect(playSpy).toHaveBeenCalledWith('hoge', 'fuga', jasmine.any(Object))
        })
    })


    let domFixture

    function setupDOM() {
        domFixture = document.createElement('div')
        document.body.appendChild(domFixture)
    }

    function teardownDOM() {
        domFixture.remove()
    }

    function renderApp(requestStub) {
        ReactDOM.render(
            <RPSApp requests={requestStub}/>,
            domFixture
        )
    }

    function page() {
        return domFixture.innerText
    }

    function submitForm() {
        document.querySelector('button').click()
    }

    function enterTextIntoInput(inputName, newValue) {
        let player1Input = document.querySelector(`[name="${inputName}"]`)
        player1Input.value = newValue
        ReactTestUtils.Simulate.change(player1Input)
    }
})


export default class RPSApp extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    p1Wins() {
        this.setState({result: 'PLAYER 1 WINS!'})
    }

    p2Wins() {
        this.setState({result: 'PLAYER 2 WINS!'})
    }

    tie() {
        this.setState({result: 'TIE!',})
    }

    invalid() {
        this.setState({result: 'INVALID!',})
    }

    inputChanged(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    submitHandler() {
        this.props.requests.play(this.state.p1Throw, this.state.p2Throw, this)
    }

    render() {
        return <div>
            {this.state.result}
            <input name='p1Throw' onChange={this.inputChanged.bind(this)}/>
            <input name='p2Throw' onChange={this.inputChanged.bind(this)}/>
            <button onClick={this.submitHandler.bind(this)}>PLAY</button>
        </div>
    }
}
