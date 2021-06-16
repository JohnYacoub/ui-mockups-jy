import {default as AbstractView, users}from "./AbstractView.js";
console.log("users", users)
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle("Add User");
        this.setBackground()
        document.addEventListener('click', event => {
            if (event.target.classList.contains('btn-submit')) {
               this.addUser()
            }
        });
    }



    addUser(){

        document.getElementById('form').addEventListener('submit', e => {
            e.preventDefault();
            let name = document.getElementById("name").value;
            let website = document.getElementById("website").value;
            let email = document.getElementById("email").value;
            let phone = document.getElementById("phone").value;
            let addNewUser = new AbstractView;
            addNewUser.addUser(name, website, email, phone)
        })

    }
    
    async getHtml() {
        return `
            <div id="product-wrapper">
            <div class="content">
          <h1>Create a new User </h1>
          <p>Please fill the following</p>
      
        </div>
        <form id="form" class="form-wrapper">
          <input type="text" id="name" name="name"required placeholder="Full Name" autocomplete="off"/>
          <input type="text" required id="website" name="website" placeholder="website" autocomplete="off"/>
          <input type="email" required id="email" name="email" placeholder="Email" autocomplete="off"/>
          <input type="number"  required name="phone" id="phone" placeholder="Phone Number" autocomplete="off"/>
          <button type="submit" class="btn-submit"><span>Save</span></button>
        </form>
      </div>
            </div>
            
        `;
    }
}