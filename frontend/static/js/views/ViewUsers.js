import {
    default as AbstractView,
    users,
} from "./AbstractView.js";


export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
        document.addEventListener('click', e => {
            e.preventDefault();
            if (e.target.classList.contains('btn-delete')) {
                this.removeCard(e);
            }
        });

        // let p = document.createElement('p');
        // p.textContent = 'Thank you! you are a memeber now!'
        // p.setAttribute('class', 'confirmation-message')
        // div.appendChild(p)
        // console.log(document.querySelector(".card-wrapper"))
    }

    async removeCard(e) {
        if (!users.length && Array.isArray(users)) {
            console.log("no users");
            return
        }

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

        console.log("called og")
        return `
        <div id="user-list-wrapper">
        <h1>Users Directory</h1>
        <div class="card-wrapper">
        ${users.length > 0 ? users.map(user=>  `<div class="card">
        <h2>${user.name}</h2>
        <h2>Website: ${user.website}</h2>
        <h2>Email: ${user.email}</h2>
        <h2>Phone: ${user.phone}</h2>
        <button>Edit</button>
        <button data-id=${user.id} class="btn-delete">Remove</button>
      </div>`) : `<h1 class="no-user-message">Ops No Users Found yet!</h1>`}
          
        </div>
        `;
    }
}