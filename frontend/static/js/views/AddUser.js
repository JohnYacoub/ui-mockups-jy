import {
    default as AbstractView,
} from "./AbstractView.js";
import * as API from '../api.js'

export let selectedUser = ''

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Add User");
        this.setBackground()
        
        // Form inputs
        this.nameInput = document.getElementById("name");
        this.webSiteInput = document.getElementById("website")
        this.emailInput = document.getElementById("email")
        this.phoneInput = document.getElementById("phone")
        this.validationError = document.querySelector('#form-error')

    }

    validateUserForm() {
        console.log(" I will get the fvaluesss");
        const nameInputValue = this.nameInput.value;
        const webSiteInputValue = this.webSiteInput.value;
        const emailInputValue = this.emailInput.value;
        const phoneInputValue = this.phoneInput.value;
        console.log("nameInputValue", nameInputValue)
        console.log("webSiteInputValue", webSiteInputValue)

        console.log("name input", nameInputValue)
        if (nameInputValue.length < 0 || nameInputValue === '') {
            console.log("error please add name");
            this.validationError.classList.add("form-error-show");
            this.validationError.innerHTML = `Please Enter Valid Name`
            return
        }
        if (webSiteInputValue.length < 0 || webSiteInputValue === '') {
            console.log("error please add email");
            this.validationError.classList.add("form-error-show");
            this.validationError.innerHTML = `Please valid Email`
            return
        }
        document.getElementsByClassName("form-title").innerHTML =`<h1>You are All set!</h1>`
   
        this.validationError.classList.remove("form-error-show");
        return {
            name: nameInputValue
        }


    }

    async submitForm() {
        const inputsPramas = await this.validateUserForm();
        console.log("after validation", inputsPramas)

        const html = await `<div>Thank you! you are all Set!</div>`
        await document.getElementById('form').reset();
        document.querySelector(".form-wrapper").innerHTML = await html

        // Make API call to submit
        const response = await API.addUser(inputsPramas)
        console.log(response)

    }

    async loadSelectedUsers(id) {
        selectedUser = await API.getUserById(id);


        const html = await `<form id="form" class="form-wrapper edit-Form"></form>
<input type="text" id="name" name="name"required placeholder="Full Name" value="${selectedUser.name}" autocomplete="off"/>
<input type="text" required id="website" name="website" placeholder="website" value="${selectedUser.website}" autocomplete="off"/>
<input type="email" required id="email" name="email" placeholder="Email" value="${selectedUser.email}" autocomplete="off"/>
<input type="number"  required name="phone" id="phone" placeholder="Phone Number" value="${selectedUser.phone.slice(0,14).split("-").join('').trim()}" autocomplete="off"/>
<button type="submit" class="btn-submit-edit">Save</button>
<button  type="text" class="btn-form-cancel">Cancel</button>
</form>`
        document.body.querySelector(".form-title").innerHTML = await `<h1>Edit User</h1> `
        document.body.querySelector(".form-wrapper").innerHTML = await html

    }

    async editUser() {
        console.log("i ran")
        const userInputs = await this.validateUserForm()
        console.log(userInputs)
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
          <input type="text" id="name" name="name" class="form-input-name" required placeholder="Full Name" autocomplete="off"/>
          <input type="text" required id="website" name="website" placeholder="Website" autocomplete="off"/>
          <input type="email" required id="email" name="email" placeholder="Email" autocomplete="off"/>
          <input type="number"  required name="phone" id="phone" placeholder="Phone Number" autocomplete="off"/>
          <button type="submit" class="btn-submit-add"><span>Save</span></button>
        </form>
        <div id="form-error" class="form-error-hide">No validation error yet!</div>
      </div>
            </div>
            
        `;
    }
}