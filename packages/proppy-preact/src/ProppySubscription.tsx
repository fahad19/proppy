import { Proppy, ProppyFactory, Providers, create } from 'proppy';
import { Component, RenderableProps } from 'preact';

export interface ComponentProps {
  parentProps: any;
  providers: Providers;
  proppyFactory: ProppyFactory;
}

export interface ComponentState {
  proppyProps: any;
}

export class ProppySubscription extends Component<RenderableProps<ComponentProps>, ComponentState> {
  private _p: Proppy;
  private _parent: Proppy;

  constructor(props, context) {
    super(props, context);

    const { providers } = context;

    this._parent = create({
      initialize() {
        this.set(props);
      },
    })(providers);
    this._p = props.proppyFactory(providers, this._parent);

    this.state = {
      proppyProps: this._p.props,
    };
  }

  // @TODO: this needs attention
  public componentWillReceiveProps(nextProps) {
    this._parent.set(nextProps.parentProps);
  }

  public componentDidMount() {
    this._p.subscribe(proppyProps =>
      this.setState({
        proppyProps,
      }),
    );
  }

  public componentWillUnmount() {
    this._p.destroy();
  }

  public render(props) {
    return props.children[0](this.state.proppyProps);
  }
}
