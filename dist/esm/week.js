import { h } from 'preact';
import Base from "./base";
export default class Week extends Base {
    getComponent() {
        return h("h2", null, "Week View");
    }
}
