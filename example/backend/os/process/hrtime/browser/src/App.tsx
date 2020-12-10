import React, {Component} from 'react';
import hrtime from 'browser-hrtime';

type MyState = {diff: [number, number]};
class App extends React.Component<{}, MyState> {
  private __start:[number, number];

  constructor(props:any) {
    super(props);
    this.state = {diff: [0, 0]};
    this.__start = hrtime();

    setTimeout(() => {
      const diff:[number, number] = hrtime(this.__start);
      this.setState({diff:diff});
      let dur:bigint = BigInt(diff[0] * 1e9 + diff[1]);
      console.log(`Benchmark took ${diff[0] * 1e9 + diff[1]} nanoseconds.`);
      console.log(`Benchmark took ${dur/BigInt(Math.pow(10, 6))} milliseconds.`);
      console.log(`Benchmark took ${dur/BigInt(Math.pow(10, 9))} seconds.`);
    }, 1000);

  }

  render() {
    let duration:number = this.state.diff[0] * 1e9 + this.state.diff[1];
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>Benchmark took {this.state.diff[0] * 1e9 + this.state.diff[1]} nanoseconds</h2>
        <h2>Benchmark took {duration/Math.pow(10,6)} milliseconds </h2>
        <h2>Benchmark took {duration/Math.pow(10,9)} seconds </h2>
      </div>
    );
  }
}
export default App;

