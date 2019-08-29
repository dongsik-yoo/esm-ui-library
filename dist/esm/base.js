import { render } from 'preact';
import renderToString from 'preact-render-to-string';
export default class Base {
    constructor(container) {
        this._container = container;
    }
    render() {
        this._base = render(this.getComponent(), this._container, this._base);
    }
    renderToString() {
        return renderToString.render(this.getComponent());
    }
}
