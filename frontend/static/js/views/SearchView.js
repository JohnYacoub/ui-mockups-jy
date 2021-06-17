import {
  default as AbstractView,
  users,
} from "./AbstractView.js";
import * as API from '../api.js'

let userListFromAPI = [];
let importedUserList = [];

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Search");
    this.setBackground()
    this.loadUsers();
    document.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.classList.contains('search-input')) {
        this.handleSearch()
      }
    });
  }

  handleSearch() {
    console.log("handling search inputsss...")

    const searchInput = document.getElementById('search-input');

    searchInput.addEventListener('keyup', e => {
      const searchString = e.target.value.toLowerCase();
      console.log("searchString", searchString)
      const filteredChars = userListFromAPI.filter(char => {
        return (
          char.name.toLowerCase().includes(searchString)
        );
      });
      console.log(filteredChars, "filteredChars")
      this.showFiltedUsers(filteredChars);
    })

  }

  async showFiltedUsers(users) {

    if (!users.length) {
      console.log("no usersss")
      const htmls = `<div class="card"><h1 class="nomatch-message">No Matches...</h1></div>`
      document.querySelector(".search-results").innerHTML = await htmls
      return;
    }
    const html = users.map(user => {

      return `
     <div class="card">
     <h2>${user.name}</h2>
     <h2>Website: ${user.website}</h2>
     <h2>Email: ${user.email}</h2>
     <h2>Phone: ${user.phone}</h2>
     <button data-id="${user.id}">Edit</button>
     <button data-id="${user.id}" class="btn-delete">Remove</button>
     </div>
     `
    }).join('');
    console.log(html)
    document.querySelector(".search-results").innerHTML = await html
  }

  loadUsers = async () => {
    console.log("loadCharacters...")
    userListFromAPI = await API.getUsersList();
    console.log("data", userListFromAPI)
    importedUserList = userListFromAPI
    this.showFiltedUsers(importedUserList);
  }


  async getHtml() {
    return `
        <div class="search-wrapper">
        <div class="content">
        <div id="search-container">
        <input type="text" id="search-input" class="search-input" placeholder="Search.."/>
        <div class="search-icon"><i class="fa fa-search"></i></div>
        </div> 
        </div>
      </div>
      <div class="search-results-wrapper">
      <div class="header">
      <h2>Seach users by name, website, elc..</h2>
      </div>
      <div class="search-results">
      </div>
      </div>
        `;
  }
}