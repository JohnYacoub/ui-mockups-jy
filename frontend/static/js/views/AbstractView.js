export let users = [];
export default class {
    constructor(params) {
        this.params = params;
        console.log('params', params)
        console.log(users,"users")
    }

    setTitle(title) {
        document.title = title;
    }

    setBackground(bg) {
        const section = document.querySelector('section')
        section.style.background = bg ? `#221F26 url(${bg})` : "#221F26"
        console.log((bg))
    }

    static addUser() {
        const wrapper = document.querySelector('.form-wrapper');
        console.log("wrapper", wrapper);
        document.getElementById('form').addEventListener('submit', e => {
            e.preventDefault();
            let name = document.getElementById("name").value;
            let website = document.getElementById("website").value;
            let email = document.getElementById("email").value;
            let phone = document.getElementById("phone").value;
            createUser(name, website, email, phone)
        })

        const createUser = (name, website, email, number) => {
            const user = {
                name,
                website,
                email,
                number
            }
            // make global list
            users.push(user);
            console.log(users);
            // reset the form and replace with confirmation message
            document.getElementById('form').reset();
            const div = document.querySelector('form');
            removeAllChildern(div);
            let p = document.createElement('p');
            p.textContent = 'Thank you! you are a memeber now!'
            p.setAttribute('class','confirmation-message')
             div.appendChild(p)
       }

const removeAllChildern = (parent) =>{
while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
}
}

    }
 
    async getHtml() {
        return "";
    }
}