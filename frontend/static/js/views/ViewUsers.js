import {
    default as AbstractView,

} from "./AbstractView.js";


export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("View Users");
        this.setBackground()
    }
    
    async getHtml() {
        return `
        <div class="user-list-wrapper">
          <h1>User Directory </h1>
          <h2>You can view,Modify, Delete Users from the Search Tab</h2>
          <a href="/search" class="cta" data-link>Take Me there!</a>
      </div>
        `;
    }
}
