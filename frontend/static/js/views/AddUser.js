import {
    default as AbstractView,
} from "./AbstractView.js";
import * as API from '../api.js'

export let selectedUser = ''

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.usertId = params.id;
        if (params.id) {
            this.setTitle("Edit User");
            this.loadSelectedUsers()
            return;
        }
        this.setTitle("Add User");
        this.setBackground()
        document.addEventListener("click", e => {
            if (e.target.classList.contains('btn-submit-add')) {
                e.preventDefault();
                this.addUser()
            }
            if (e.target.classList.contains('btn-submit-edit')) {
                console.log("clicked")
                e.preventDefault();
                this.editUser()
            }
        })

    }

    async loadSelectedUsers(id) {
        selectedUser = await API.getUserById(id);
        

        const html = await `<form id="form" class="form-wrapper edit-Form">
<input type="text" id="name" name="name"required placeholder="Full Name" value="${selectedUser.name}" autocomplete="off"/>
<input type="text" required id="website" name="website" placeholder="website" value="${selectedUser.website}" autocomplete="off"/>
<input type="email" required id="email" name="email" placeholder="Email" value="${selectedUser.email}" autocomplete="off"/>
<input type="number"  required name="phone" id="phone" placeholder="Phone Number" value="${selectedUser.phone.slice(0,14).split("-").join('').trim()}" autocomplete="off"/>
<button type="submit" class="btn-submit-edit"><span>Save</span></button>
</form>`
        document.body.querySelector(".form-title").innerHTML = await `<h1>Edit User</h1>`
        document.body.querySelector(".form-wrapper").innerHTML = await html

    }

    async getInputValues() {
       
        let newUser = {}
        newUser.name = document.getElementById("name").value;
        newUser.website = document.getElementById("website").value;
        newUser.email = document.getElementById("email").value;
        newUser.phone = document.getElementById("phone").value;

        return newUser
    }

    async addUser() {
        const userInputs = await this.getInputValues()
        const response = await API.addUser(userInputs)
        if (!response.isSuccess) {
            return
        }

        const html = await `<div>Thank you! you are a memeber now!</div>`
        await document.getElementById('form').reset();
        document.querySelector(".form-wrapper").innerHTML = await html
    }

    async editUser(){
        console.log("i ran")
        const userInputs = await this.getInputValues()
        const response = await API.editUser(userInputs)
        if (!response.isSuccess) {
            return
        }

        const html = await `<div>Thank you! you have Successfully edited user!</div>`
        await document.getElementById('form').reset();
        document.querySelector(".form-wrapper").innerHTML = await html

    }

    async getHtml() {

        return `
            <div id="user-wrapper">
            <div class="content user-form-content">
          <h1 class="form-title">Create a new User </h1>
          <p>Please fill the following</p>
        </div>
        <form id="form" class="form-wrapper">
          <input type="text" id="name" name="name"required placeholder="Full Name" autocomplete="off"/>
          <input type="text" required id="website" name="website" placeholder="website" autocomplete="off"/>
          <input type="email" required id="email" name="email" placeholder="Email" autocomplete="off"/>
          <input type="number"  required name="phone" id="phone" placeholder="Phone Number" autocomplete="off"/>
          <button type="submit" class="btn-submit-add"><span>Save</span></button>
        </form>
        <!--<div id="show-error">No validation error yet!</div>-->
      </div>
            </div>
            
        `;
    }
}