import { Component, createElement } from 'react';
import './Counter.scss';

const INIT_COUNT = 0;

class Counter extends Component {
  public state = { counter: INIT_COUNT }

  public render() {
    return createElement(
      'div',
      { className: 'counter' },
      createElement('button', { onClick: this.decrement }, '-'),
      createElement('span', null, this.state.counter),
      createElement('button', { onClick: this.increment }, '+'),
    );
  }

  private increment = (): void => {
    this.setState({ counter: this.state.counter + 1 });
  }

  private decrement = (): void => {
    this.setState({ counter: this.state.counter - 1 });
  }
}

export default Counter;
