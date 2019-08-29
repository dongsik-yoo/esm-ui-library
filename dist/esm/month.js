import { h } from 'preact';
import Base from './base';

export default class Month extends Base {
  getComponent() {
    return h('h2', null, 'Month View');
  }
}
