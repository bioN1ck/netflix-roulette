import { Component, createElement } from 'react';
import './Counter.scss';

const INIT_COUNT = 0;

type CounterProps = {
  counter?: number;
}

class Counter extends Component<CounterProps> {
  public state = { counter: INIT_COUNT };

  constructor(props: CounterProps) {
    super(props);
    if (props.counter) {
      this.state.counter = props.counter;
    }
  }

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
