import { h, Component } from 'preact';
import { create } from 'proppy';

export function attach(P) {
  return function (BaseComponent) {
    return class extends Component {
      constructor(props, context) {
        super(props, context);

        const { providers } = context;

        this._parent = create({
          initialize() {
            this.set(props);
          },
        })(providers);
        this._p = P(providers, this._parent);

        this.state = {
          proppyProps: this._p.props,
        };
      }

      componentWillMount() {
        this._p.subscribe(props => {
          this.setState({
            proppyProps: props,
          });
        });
      }

      componentWillReceiveProps(props) {
        this._parent.set(props);
      }

      componentWillUnmount() {
        this._p.destroy();
      }

      render(props, state) {
        return h(BaseComponent, state.proppyProps, props.children);
      }
    }
  };
}
