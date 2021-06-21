import {
    default as AbstractView,
} from "./AbstractView.js";
import * as API from '../api.js'

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Add User");
        this.setBackground()
    }

    validateUserForm() {

        //selectors
        const nameInput = document.getElementById("name");
        const webSiteInput = document.getElementById("website")
        const emailInput = document.getElementById("email")
        const phoneInput = document.getElementById("phone")
        const validationError = document.querySelector('#form-error')

        //values
        const nameInputValue = nameInput.value;
        const webSiteInputValue = webSiteInput.value;
        const emailInputValue = emailInput.value;
        let phoneInputValue = phoneInput.value;

        // validation helper functions
        const validatePhoneNumber = (input) => {
            const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            return regex.test(input)
        }

        const validateTextInput = (input) => {
            var pattern = new RegExp(/[a-zåäö ]/i);
            return pattern.test(input);
        }

        // custom error message
        if (nameInputValue.length < 0 || nameInputValue === '') {
            validationError.classList.add("form-error-show");
            validationError.innerHTML = `Please Enter Valid Name`
            return
        }

        if (!validateTextInput(nameInputValue)) {
            validationError.classList.add("form-error-show");
            validationError.innerHTML = `Please Enter text Only`
            return
        }

        if (webSiteInputValue.length < 0 || webSiteInputValue === '') {
            validationError.classList.add("form-error-show");
            validationError.innerHTML = `Please enter valid website starts with https://`
            return
        }


        if (!validatePhoneNumber(phoneInputValue)) {
            validationError.classList.add("form-error-show");
            validationError.innerHTML = `Please enter valid Phone Number`
            return
        }

        validationError.classList.remove("form-error-show");
        return {
            name: nameInputValue,
            website: webSiteInputValue,
            email: emailInputValue,
            phone: phoneInputValue
        }
    }


    async submitForm() {
        const inputsPramas = await this.validateUserForm();
        // Make API call to submit
        const response = await API.addUser(inputsPramas)
        console.log("server resposse after submission", response)

        if (response.isSuccess) {
            const html = `<div>Thank you! you are all Set!</div>
            <a href="/search" class="cta" data-link>View Users!</a>`
            await document.getElementById('form').reset();
            document.querySelector("#user-wrapper").innerHTML = await html
        } else {
            //more error handlling if needed!!!
            const html = `<div>Something Wrong adding user! Try again!</div>
            <a href="/add" class="cta" data-link>Try Again!</a>`
            await document.getElementById('form').reset();
            document.querySelector("#user-wrapper").innerHTML = await html
        }

    }

    async loadSelectedUsers(id) {
        const selectedUser = await API.getUserById(id);

        const html = await `<form id="form" class="form-wrapper edit-Form">
<input type="text" id="name" name="name"required placeholder="Full Name" value="${selectedUser.name}" autocomplete="off"/>
<input type="url" required id="website" pattern="https://.*" name="website" placeholder="website" value="${selectedUser.website}" autocomplete="off"/>
<input type="email" required id="email" name="email" placeholder="Email" value="${selectedUser.email}" autocomplete="off"/>
<input type="tel"  required name="phone" id="phone" placeholder="Phone Number" value="${selectedUser.phone.slice(0,14).split("-").join('').trim()}" autocomplete="off"/>
<button type="submit" class="btn-submit-edit">Save</button>
<button  type="text" class="btn-form-cancel">Cancel</button>
</form>`

        document.body.querySelector(".user-form-content").innerHTML = await `<h1>Edit User</h1> `
        document.body.querySelector(".form-wrapper").innerHTML = await html
    }

    async editForm(id) {
        const inputsPramas = await this.validateUserForm();

        inputsPramas.userId = 5
        inputsPramas.id = id
        console.log("user Inpiuts", inputsPramas)
        const response = await API.editUser(inputsPramas)
        if (response.isSuccess) {
            const html = await `<div>Thank you! you have Successfully edited user!</div>`
            await document.getElementById('form').reset();
            document.querySelector(".form-wrapper").innerHTML = await html
            this.setNavTab(".add-user-btn", "Add User", true)
        } else {
            //more error handlling if needed!!!
            const html = `<div>Something Wrong adding user! Try again!</div>
            <a href="/add" class="cta" data-link>Try Again!</a>`
            await document.getElementById('form').reset();
            document.querySelector("#user-wrapper").innerHTML = await html
        }


    }

    async getHtml() {
        return `
            <div id="user-wrapper">
            <div class="content user-form-content">
          <h1 class="form-title">Create a new User </h1>
          <p class="form-title">Please fill the following</p>
        </div>
        <form id="form" class="form-wrapper">
          <input type="text" id="name" name="name" class="form-input-name" required placeholder="Full Name" autocomplete="off"/>
          <input type="url" required pattern="https://.*" id="website" name="website" placeholder="Website" autocomplete="off"/>
          <input type="email" required id="email" name="email" placeholder="Email" autocomplete="off"/>
          <input type="tel"  required name="phone" id="phone" placeholder="Phone Number" autocomplete="off"/>
          <button type="submit" class="btn-submit-add" >Save</button>
        </form>
        <div id="form-error" class="form-error-hide">No validation error yet!</div>
      </div>
            </div>
            
        `;
    }
}