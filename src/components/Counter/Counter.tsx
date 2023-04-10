import { Component, createElement as el } from 'react';
import './Counter.scss';

const INIT_COUNT = 0;

type CounterProps = {
  /**
   * Set default counter
   */
  counter?: number;
}

/**
 * The UI component for setting amount of something
 */
class Counter extends Component<CounterProps> {
  public state = { counter: INIT_COUNT };

  constructor(props: CounterProps) {
    super(props);
    if (props.counter) {
      this.state.counter = props.counter;
    }
  }

  public render() {
    return el('div', { className: 'counter' },
      el('button', { onClick: this.decrement, 'data-cy': 'decrement-btn' }, '-'),
      el('span', { 'data-cy': 'counter' }, this.state.counter),
      el('button', { onClick: this.increment, 'data-cy': 'increment-btn' }, '+'),
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
