import {default as AbstractView, users}from "./AbstractView.js";
console.log("users", users)
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle("Add User");
        this.setBackground()
    }

    getContacts(){
        console.log("contact dataa")
    }

    addUser(){
        console.log("adding users")
        AbstractView.addUser();
        const thankYouMessage = document.getElementsByClassName("sign-up-thankyou");
        console.log(thankYouMessage)
    }
    
    async getHtml() {
        return `
            <div id="product-wrapper">
            <div class="content">
          <h1>Create a new User </h1>
          <p>Please fill the following</p>
      
        </div>
        <form id="form" class="form-wrapper">
          <input type="text" id="name" name="name"required placeholder="Full Name" />
          <input type="text" required id="website" name="website" placeholder="website" />
          <input type="email" required id="email" name="email" placeholder="Email" />
          <input type="number"  required name="phone" id="phone" placeholder="Phone Number" />
          <button type="submit">Save</button>
        </form>
      </div>
            </div>
            
        `;
    }
}