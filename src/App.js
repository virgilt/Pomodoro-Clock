import React, { Component } from 'react';
import Break from './break';
import BreakButtons from './breakbuttons';
import Session from './session';
import SessionButtons from './sessionbuttons';
import Timer from './timer';
import Clock from './clock';
import Controls from './start_stop';
import Reset from './reset';

class App extends Component {
  state = {
    break: [
      {id: 'break-label', text: 'Break Length'},
      {id: 'break-length', text: 5},
    ],
    breakButtons: [
      {id: 'break-increment', text: 'binc'},
      {id: 'break-decrement', text: 'bdec'}
    ],
    session: [
      {id: 'session-label', text: 'Session Length'},
      {id: 'session-length', text: 25},
    ],
    sessionButtons: [
      {id: 'session-increment', text: 'sinc'},
      {id: 'session-decrement', text: 'sdec'}
    ],
    timer: [
      {id: 'timer-label', text: 'Session'}
    ],
    clock: [{id: 'time-left', time: 1500, clockState: 'stopped'}],
    start_stop: [{id: 'start_stop', text: 'start'}],
    reset: [{id: 'reset', text: 'reset'}]
  }

  createClock = (time) => {
    let mins = Math.floor(time / 60);
    let secs = time - mins * 60;
    let minutes = mins < 10 ? '0' + mins : mins;
    let seconds = secs < 10 ? '0' + secs : secs;
    return (
      minutes + ':' + seconds
    )
  }

  resetClock = () => {
    let breakSection = [...this.state.break];
    breakSection[1].text = 5;
    let session = [...this.state.session];
    session[1].text = 25;
    let clock = [...this.state.clock];
    clock[0].time = 1500;
    clock[0].clockState = 'stopped';
    this.setState({
      break: breakSection,
      session: session,
      clock: clock
    })
  }

  render() {

    let breakSection = this.state.break.map(breaks => {
      return (
        <Break
          key={breaks.id}
          id={breaks.id}
          text={breaks.text}
        />
      )
    })

    let breakButtons = this.state.breakButtons.map(breakB => {
      return (
        <BreakButtons
          key={breakB.id}
          id={breakB.id}
          text={breakB.text}
        />
      )
    })

    let session = this.state.session.map(sessions => {
      return (
        <Session
          key={sessions.id}
          id={sessions.id}
          text={sessions.text}
        />
      )
    })

    let sessionButtons = this.state.sessionButtons.map(sessB => {
      return (
        <SessionButtons
          key={sessB.id}
          id={sessB.id}
          text={sessB.text}
        />
      )
    })

    let timer = this.state.timer.map(timers => {
      return (
        <Timer
          key={timers.id}
          id={timers.id}
          text={timers.text}
        />
      )
    })

    let clock = this.state.clock.map(clocks => {
      return (
        <Clock
          key={clocks.id}
          id={clocks.id}
          time={clocks.time}
          createClock={this.createClock}
        />
      )
    })

    let start_stop = this.state.start_stop.map(startStop => {
      return (
        <Controls
          key={startStop.id}
          id={startStop.id}
          text={startStop.text}
        />
      )
    })

    let reset = this.state.reset.map(resets => {
      return (
        <Reset
          key={resets.id}
          id={resets.id}
          text={resets.text}
          resetClock={this.resetClock}
        />
      )
    })



    return (
      <div className="App">
        {breakSection}
        {breakButtons}
        {session}
        {sessionButtons}
        {timer}
        {clock}
        {start_stop}
        {reset}
      </div>
    );
  }
}

export default App;
