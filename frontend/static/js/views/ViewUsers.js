import {
    default as AbstractView,
    users
} from "./AbstractView.js";


export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
        document.addEventListener('click', event => {
            if (event.target.classList.contains('btn-delete')) {
                this.removeCard(event);
            }
        });   
    }

    async removeCard(e) {
        let id = Number(e.target.getAttribute('data-id'));

        users.filter(user => {
            if (user.id === id) {
                const index = Number(users.indexOf(user));
                if (index > -1) {
                    users.splice(index, 1)
                };
                return user;
            }
        });


        document.querySelector("#section-content").innerHTML = await this.getHtml()
    }


    async getHtml() {
        return `
        <div id="user-list-wrapper">
        <h1>Users Directory</h1>
        <div class="card-wrapper">
        ${users?.map(user=>  `<div class="card">
        <h2>${user.name}</h2>
        <h2>Website: ${user.website}</h2>
        <h2>Email: ${user.email}</h2>
        <h2>Phone: ${user.phone}</h2>
        <button>Edit</button>
        <button data-id=${user.id} class="btn-delete">Remove</button>
      </div>`)}
          
        </div>
        `;
    }
}