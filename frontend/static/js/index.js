import Home from './views/Home.js'
import AddProduct from "./views/AddProduct.js";
import ViewUsers from "./views/ViewUsers.js";


const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);
    
    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
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
        view: AddProduct
    },
    {
        path: "/users",
        view: ViewUsers
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
// console.log("mact", match.result[0])

view.addUser()



// if (match.result[0] === '/add') {
//     console.log("matched view");
//     const wrapper = document.querySelector('.form-wrapper');
//     console.log("wrapper", wrapper);
//     document.getElementById('form').addEventListener('submit', e => {
//         e.preventDefault();
//         let name = document.getElementById("name").value;
//         let website = document.getElementById("website").value;
//         let email = document.getElementById("email").value;
//         let phone = document.getElementById("phone").value;
//         createUser(name, website, email, phone)
//     })

//         const createUser = (name, website, email, number) => {
//             const user = {
//                 name,
//                 website,
//                 email,
//                 number
//             }
//             globalUsers.push(user);
//             console.log(users);
//             document.getElementById('form').reset();
//         }
//     }

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