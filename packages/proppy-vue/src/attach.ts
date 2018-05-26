import { create } from 'proppy';

export function attach(ProppyFactory) {
  return function(Component) {
    const componentPropNames = Component.props || [];

    const watch = componentPropNames.reduce((acc, propName) => {
      acc[propName] = function(newVal, oldVal) {
        if (typeof newVal !== 'undefined') {
          this._parent.set({
            [propName]: newVal
          });
        }
      };

      return acc;
    }, {});

    return {
      name: `Attached${Component.name}`,

      inject: ['proppy'],

      props: componentPropNames,

      watch,

      data() {
        return {
          proppyProps: {}
        };
      },

      methods: {
        setProppyProps(props) {
          this.proppyProps = Object.assign({}, props);
        }
      },

      beforeMount() {
        const parentProps = componentPropNames.reduce(
          (acc, componentPropName) => {
            if (typeof this[componentPropName] === 'undefined') {
              return acc;
            }

            return {
              ...acc,
              [componentPropName]: this[componentPropName]
            };
          },
          {}
        );

        this._parent = create({
          initialize() {
            this.set(parentProps);
          }
        })(this.proppy || {});

        this._p = ProppyFactory(this.proppy, this._parent);

        this.setProppyProps(this._p.props);

        this._p.subscribe(props => {
          this.setProppyProps(props);
        });
      },

      beforeDestroy() {
        if (this._p) {
          this._p.destroy();
        }
      },

      render(h) {
        const data = {
          props: this.proppyProps
        };

        return h(Component, data);
      },
    };
  };
}
