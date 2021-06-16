import AbstractView from "./AbstractView.js";


export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
    }



    async getHtml() {
        return `
        <h1>Posts</h1>
        <div class="card-wrapper">
          <div class="card">
           <h2>John</h2>
           <h2>Age:25</h2>
           <h2>email: josjds@sdsd.com</h2>
           <h2>phone: 50505888</h2>
           <button>Edit</button>
           <button>Remove</button>
            </div>
        </div>
        `;
    }
}