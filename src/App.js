import React, { Component } from 'react';
import Break from './break';
import BreakButtons from './breakbuttons';
import Session from './session';
import SessionButtons from './sessionbuttons';
import Timer from './timer';
import Clock from './clock';
import Controls from './start_stop';
import Reset from './reset';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faPlay, faPause, faSync } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowUp, faArrowDown, faPlay, faPause, faSync);

const breakIncrement = 'break-increment';
const breakDecrement = 'break-decrement';
const sessionIncrement = 'session-increment';
const sessionDecrement = 'session-decrement';
let myTicker;

class App extends Component {
  state = {
    break: [
      {id: 'break-label', text: 'Break Length'},
      {id: 'break-length', text: 5},
    ],
    breakButtons: [
      {id: 'break-increment', text: <FontAwesomeIcon className='arrow' icon="arrow-up" />},
      {id: 'break-decrement', text: <FontAwesomeIcon className='arrow' icon="arrow-down" />}
    ],
    session: [
      {id: 'session-label', text: 'Session Length'},
      {id: 'session-length', text: 25},
    ],
    sessionButtons: [
      {id: 'session-increment', text: <FontAwesomeIcon className='arrow' icon="arrow-up" />},
      {id: 'session-decrement', text: <FontAwesomeIcon className='arrow' icon="arrow-down" />}
    ],
    timer: [
      {id: 'timer-label', text: 'Session'}
    ],
    clock: [{id: 'time-left', time: 1500}],
    start_stop: [{id: 'start_stop', text: <FontAwesomeIcon className='control' icon="play" />, startStopState: 'stopped'}],
    reset: [{id: 'reset', text: <FontAwesomeIcon className='control' icon="sync" />}]
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
    this.pauseSound();
    clearInterval(myTicker);
    let breakSection = [...this.state.break];
    breakSection[1].text = 5;
    let session = [...this.state.session];
    session[1].text = 25;
    let timer = [...this.state.timer];
    timer[0].text = 'Session';
    let clock = [...this.state.clock];
    clock[0].time = 1500;
    let start_stop = [...this.state.start_stop]
    start_stop[0].startStopState = 'stopped';
    start_stop[0].text = <FontAwesomeIcon className='control' icon="play" />
    this.setState({
      break: breakSection,
      session: session,
      timer: timer,
      clock: clock,
      start_stop: start_stop
    })
  }

  startStop = (startStopState) => {
    let start_stop = [...this.state.start_stop];
    if (startStopState === 'stopped') {
      myTicker = setInterval(this.tickTock, 1000);
      start_stop[0].startStopState = 'started';
      start_stop[0].text = <FontAwesomeIcon className='control' icon="pause" />
      this.setState({
        start_stop: start_stop
      })
      this.enableSBButtons(true);
    } else if (startStopState === 'started') {
      clearInterval(myTicker);
      start_stop[0].startStopState = 'stopped';
      start_stop[0].text = <FontAwesomeIcon className='control' icon="play" />
      this.setState({
        start_stop: start_stop
      })
      this.enableSBButtons(false);
    }
  }

  tickTock = () => {
    if (this.state.clock[0].time < 1 && this.state.timer[0].text === 'Session') {
      this.playSound();
      let timer = [...this.state.timer];
      timer[0].text = 'Break';
      let clock = [...this.state.clock];
      clock[0].time = this.state.break[1].text * 60;
      this.setState({
        timer: timer,
        clock: clock
      })
    } else if (this.state.clock[0].time < 1 && this.state.timer[0].text === 'Break') {
      this.playSound();
      let timer = [...this.state.timer];
      timer[0].text = 'Session';
      let clock = [...this.state.clock];
      clock[0].time = this.state.break[1].text * 60;
      this.setState({
        timer: timer,
        clock: clock
      })
    } else {
      let clock = [...this.state.clock];
      clock[0].time = clock[0].time - 1;
      this.setState({
        clock: clock
      })
      console.log(clock[0].time)
    }
  }

  incDecButtons = (buttonId) => {
    let breakSection = [...this.state.break];
    let session = [...this.state.session];
    switch(buttonId) {
      case breakIncrement:
        breakSection[1].text = breakSection[1].text + 1;
        break;
      case breakDecrement:
        breakSection[1].text = breakSection[1].text - 1;
        break;
      case sessionIncrement:
        session[1].text = session[1].text + 1;
        break;
      case sessionDecrement:
        session[1].text = session[1].text - 1;
        break;
      default:
        return null;
    }
    this.setState({
      break: breakSection,
    })
    this.decrementClock(buttonId);
  }

  decrementClock = (buttonId) => {
    if ((buttonId === sessionDecrement || buttonId === sessionIncrement) && this.state.timer[0].text === 'Session') {
      let clock = [...this.state.clock];
      clock[0].time = this.state.session[1].text * 60;
      this.setState({
        clock: clock
      })
    } else if ((buttonId === breakDecrement || buttonId === breakIncrement) && this.state.timer[0].text === 'Break') {
      let clock = [...this.state.clock];
      clock[0].time = this.state.break[1].text * 60;
      this.setState({
        clock: clock
      })
    }
  }

  disableIncDec = (id, sessBrkTime) => {
    if ((sessBrkTime <= 1 && id === sessionDecrement) || (sessBrkTime <= 1 && id === breakDecrement)) {
      document.getElementById(id).disabled = true;
    } else if ((sessBrkTime >= 60 && id === sessionIncrement) || (sessBrkTime >= 60 && id === breakIncrement)){
      document.getElementById(id).disabled = true;
    } else {
        this.enableSBButtons(false)
        let button = document.getElementById(id).id;
        this.incDecButtons(button);
    }
  }

  enableSBButtons = (value) => {
    document.getElementById(sessionDecrement).disabled = value;
    document.getElementById(sessionIncrement).disabled = value;
    document.getElementById(breakDecrement).disabled = value;
    document.getElementById(breakIncrement).disabled = value;
  }

  playSound = () => {
    const sound = document.getElementById('beep');
    sound.currentTime = 0;
    sound.play();
  }

  pauseSound = () => {
    const sound = document.getElementById('beep');
    sound.currentTime = 0;
    sound.pause();
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
          breakTime={this.state.break[1].text}
          disableIncDec={this.disableIncDec}
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
          sessionTime={this.state.session[1].text}
          disableIncDec={this.disableIncDec}
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
          startStopState={startStop.startStopState}
          startStop={this.startStop}
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
          enableSBButtons={this.enableSBButtons}
        />
      )
    })

    return (
      <div id="app">
        <div className='breakSessionSection'>
          {breakSection}
          {breakButtons}
        </div>
        <div className='breakSessionSection'>
          {session}
          {sessionButtons}
        </div>
        <div id='timerSection'>
          {timer}
          {clock}
        </div>
        <div id='controlsSection'>
          {start_stop}
          {reset}
          <audio id='beep' src='https://goo.gl/65cBl1'></audio>
        </div>
      </div>
    );
  }
}

export default App;
