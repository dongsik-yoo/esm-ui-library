import { render, ComponentChild } from 'preact';
import renderToString from 'preact-render-to-string';

/**
 * @class Base abstract base class
 */
export default abstract class Base {
  private _container: Element;

  private _base?: Element;

  public constructor(container: Element) {
    this._container = container;
  }

  protected abstract getComponent(): JSX.Element;

  public render(): void {
    this._base = render(this.getComponent(), this._container, this._base);
  }

  public renderToString(): string {
    return renderToString.render(this.getComponent());
  }
}
