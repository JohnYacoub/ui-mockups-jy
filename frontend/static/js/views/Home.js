import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Home");
        this.setBackground("/static/assets/home-bg.webp")
    }

    async getHtml() {
        return `
        <div class="home-wrapper">
        <div class="content">
          <h1>User Directory </h1>
          <p>VSMedia Users Analytics</p>
          <a href="/users" class="cta" data-link>View Reports</a>
        </div>
      </div>
        `;
    }
}