import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Search");
        this.setBackground()
    }

    async getHtml() {
        return `
        <div class="search-wrapper">
        <div class="content">
        <div id="search-container">
        <input type="text" id="search-input" placeholder="Search.."/>
        <div class="search-icon"><i class="fa fa-search"></i></div>
        </div> 
        </div>
      </div>
      <div class="search-results-wrapper">
      <div class="header">
      
      <h2>Seach users by name website</h2>
      </div>
      <div class="search-results">
      
      <div class="card">
        <h2>John</h2>
        <h2>Website: WebSite</h2>
        <h2>Email: Emailsss</h2>
        <h2>Phone: 45050450</h2>
        <button>Edit</button>
        <button data-id="1" class="btn-delete">Remove</button>
      </div>
      <div class="card">
      <h2>John</h2>
      <h2>Website: WebSite</h2>
      <h2>Email: Emailsss</h2>
      <h2>Phone: 45050450</h2>
      <button>Edit</button>
      <button data-id="1" class="btn-delete">Remove</button>
    </div>
      </div>
      </div>
        `;
    }
}