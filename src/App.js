import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import TimerDisplay from "./components/countdown_timer";
const REP_DURATION = 4;
const REST_REP_DURATION = 2;
const REST_SET_DURATION = 3;
const REP_PER_SET = 2;
const SET_TOTAL = 1;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Click to start",
      seconds: REP_DURATION,
      intervalId: null,
      rep: 0,
      set: 0,
      isBtnStop: false,
      btnLabel: "Start",
      btnClassName: "btn btn-primary mt-3"
    };
    this.countDown = this.countDown.bind(this);
    this.stopCountDown = this.stopCountDown.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onStop = this.onStop.bind(this);
  }

  onStart() {
    this.countDown();
    this.setState({
      status: "ongoing",
      isBtnStop: true,
      btnLabel: "Stop",
      btnClassName: "btn btn-danger mt-3"
    });
  }

  onStop() {
    this.stopCountDown();
    if (this.state.status === "Finished!") {
      this.setState({
        status: "Click to start",
        seconds: REP_DURATION,
        intervalId: null,
        rep: 0,
        set: 0,
        isBtnStop: false,
        btnLabel: "Start",
        btnClassName: "btn btn-primary mt-3"
      });
    } else {
      this.setState({
        isBtnStop: false,
        btnLabel: "Resume",
        btnClassName: "btn btn-primary mt-3 "
      });
    }
  }

  countDown() {
    const intervalId = setInterval(
      () => this.setState({ seconds: this.state.seconds - 1 }),
      1000
    );
    this.setState({ intervalId });
  }

  stopCountDown() {
    clearInterval(this.state.intervalId);
    this.setState({ status: "Click to resume" });
  }

  componentDidUpdate() {
    let { status, seconds, set, rep } = this.state;

    /** check if second===0 */
    if (seconds === 0) {
      switch (status) {
        default:
          console.log(`default`);
          break;
        case "ongoing":
          this.setState({
            status: "resting",
            seconds: REST_REP_DURATION
          });
          break;
        case "resting":
          rep = rep + 1;
          // /** check if rep num is full, if so "rest_bewteen set", if not then "ongiong" */
          // if (rep === REP_PER_SET) {
          //   this.setState({
          //     status: "resting between set",
          //     seconds: REST_SET_DURATION,
          //     rep: 0,
          //     set: this.state.set + 1
          //   });
          //   console.log(`BREAK! rep:${this.state.rep}, set: ${this.state.set}`);
          // } else {
          //   this.setState({ status: "ongoing", seconds: REP_DURATION });
          // }
          // /** check if set num is full, if so "Finished" */
          // if (this.state.set === SET_TOTAL) {
          //   this.setState({ status: "Finised !" });
          //   this.stopCountDown();
          // }
          if (rep === REP_PER_SET) {
            /** enough reps for one set */
            set += 1;
            rep = 0;
            if (set === SET_TOTAL) {
              /** enough set, goes to "Finished" */
              this.setState({
                status: "Finished!",
                set,
                rep,
                btnClassName: "btn btn-primary mt-3",
                btnLabel: "Restart",
                isBtnStop: false
              });
              this.stopCountDown();
            } else {
              /** not enough set, goes to "resting between set" */
              this.setState({
                status: "resting between set",
                seconds: REST_SET_DURATION,
                rep,
                set
              });
            }
          } else {
            /** not enough rep for one set, goes to "ongoing" */
            this.setState({
              status: "ongoing",
              seconds: REP_DURATION,
              rep,
              set
            });
          }
          break;
        case "resting between set":
          this.setState({ status: "ongoing", seconds: REP_DURATION });
          break;
      }
    }

    // console.log(
    //   `status: ${this.state.status}; rep: ${this.state.rep}; set: ${
    //     this.state.set
    //   }; seconds: ${this.state.seconds}`
    // );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <TimerDisplay
            seconds={this.state.seconds}
            status={this.state.status}
          />
          <div>
            rep:
            <span className="label label-primary">{this.state.rep}</span>
          </div>
          <div>set: {this.state.set}</div>
          <button
            className={this.state.btnClassName}
            style={{ borderRadius: "25px", padding: "11px 40px" }}
            onClick={
              this.state.isBtnStop === false ? this.onStart : this.onStop
            }
          >
            {this.state.btnLabel}
          </button>
        </header>
      </div>
    );
  }
}

export default App;
