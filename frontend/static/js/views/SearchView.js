import {
  default as AbstractView,
  localUserList
} from "./AbstractView.js";
import * as API from '../api.js'


let searchList =[]
export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Search");
    this.setBackground()
    this.loadUsers();
    // this.usertId = params.id;
    document.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.classList.contains('sort-by-name')) {
        this.sortByName(e);
      }

      if (e.target.classList.contains('search-input')) {
        this.handleSearch()
      }

      if (e.target.classList.contains('btn-delete')) {
        this.removeCard(e);
      }


    });
  }

  /**Search methods */

  handleSearch() {
    const searchInput = document.getElementById('search-input');

    searchInput.addEventListener('keyup', e => {
      const searchString = e.target.value.toLowerCase();
      const filteredChars = searchList.filter(char => {
        return (
          char.name.toLowerCase().includes(searchString)
        );
      });
      this.showFiltedUsers(filteredChars);
    })

  }



  async showFiltedUsers(users) {
    if (!users.length) {
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
     <button data-id="${user.id}" type="button" class="btn-edit"><a data-link href="/edit/${user.id}">Edit</a></button>
     <button data-id="${user.id}" class="btn-delete" type="button">Remove</button>
     </div>
     `
    }).join('');
    document.querySelector(".search-results").innerHTML = await html
  }

  /**Fetch API GET */

  loadUsers = async () => {
    const userListFromAPI = await API.getUsersList();

    searchList = [...localUserList,...userListFromAPI]
    this.showFiltedUsers(searchList);
  }


  /** Remove items */
  async removeCard(e) {
    if (!searchList.length && Array.isArray(searchList)) {
      return
    }
    let id = Number(e.target.getAttribute('data-id'));
    let newList = searchList.filter(user => {
      if (user.id !== id) {

        return user
      }
    });
    // make API Call to delete 

    searchList = newList
    this.showFiltedUsers(...[newList])
  }


  async sortByName(){
  let sortedBynameList =  await searchList.sort((a, b) => a.name.localeCompare(b.name))
  searchList = sortedBynameList
    this.showFiltedUsers(sortedBynameList)
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
      <div class="nav-sort">
           <ul>
               <li><button class="nav-btn sort-by-name">SortByName</button></li>
                 <li><button class="nav-btn sort-by-Email">SortByEmail</button></li>
           </ul>
      </div>
<div>

</div>
      </div>
      <div class="search-results">
      </div>
      </div>
        `;
  }
}