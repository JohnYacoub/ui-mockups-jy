import Home from './views/Home.js'
import AddUser from "./views/AddUser.js";
import ViewUsers from "./views/ViewUsers.js";
import SearchView from "./views/SearchView.js";
import { editUser } from './api.js';
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {

    const navBtn = document.querySelectorAll(".nav-btn");
    const BtnList = [...navBtn]
    BtnList.map(btn => {
        btn.classList.remove('active');
        // console.log(btn.href)
        if (btn.href == url) {
            btn.classList.add('active');
        }
    })
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [{
            path: "/",
            view: Home
        },
        {
            path: "/add",
            view: AddUser
        },
        {
            path: "/edit/:id",
            view: AddUser
        },
        {
            path: "/users",
            view: ViewUsers
        },
        {
            path: "/search",
            view: SearchView
        },
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });



    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));


    document.querySelector("#section-content").innerHTML = await view.getHtml();


    //  UI event listener 
    if (match.route.path === "/add") {
        const ui = new AddUser();
        ui.setNavTab(".add-user-btn", "Add User")
        document.querySelector("form").addEventListener("change", (e) => {
            ui.validateUserForm();
        })
        document.querySelector("form").addEventListener("submit", e => {
            e.preventDefault();
            ui.submitForm()
            console.log("submit form clicked!!")
        })
    }

    if (match.route.path === "/edit/:id") {

        //get user id to edit 
        const regex = /(?<=\/)(\d+)|(?=\/)/g
        const userId = window.location.pathname.match(regex)
        const ui = new AddUser(userId[2]);

        ui.setTitle("Edit User");
        ui.setNavTab(".add-user-btn", "Edit User", true)
        ui.loadSelectedUsers(userId[2])


        document.querySelector("form").addEventListener("change", (e) => {
            ui.validateUserForm();
        })
   
         document.body.querySelector("form").addEventListener("click", e => {
             console.log(document.body.querySelector("form"))
             e.preventDefault();
             console.log(e.target.classList.contains("btn-form-cancel"))
             if (e.target.classList.contains("btn-form-cancel")) {
                 e.stopPropagation()
                 console.log("cancel clicked!")
                 // change tab name and functionality
                 ui.setNavTab(".add-user-btn", "Add User", false)
                 location.pathname ="/"
                }
            if (e.target.classList.contains("btn-submit-edit")) {
                e.stopPropagation()
                ui.submitForm()
                console.log("submit form clicked!!")
            }
            })

    }

};

window.addEventListener("popstate", router);



document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});