
const removeAllChildern = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export  class User {
    constructor(name, website, email, phone,id) {
        this.id=id;
        this.name = name;
        this.website = website
        this.email = email;
        this.phone= phone
    }
}

export default class {
    constructor(params) {
        this.params = params;
        console.log('params', params)
    }

    setTitle(title) {
        document.title = title;
    }

    setBackground(bg) {
        const section = document.querySelector('section')
        section.style.background = bg ? `#221F26 url(${bg})` : "#221F26"
    }

    static addUser(name, website, email, number) {
       
        console.log("add user form being classed more than one");
        const id = Math.floor(Math.random() * 100)
        const user = {
            id,
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
        const div = document.querySelector('#product-wrapper');
        removeAllChildern(div);
        let p = document.createElement('p');
        p.textContent = 'Thank you! you are a memeber now!'
        p.setAttribute('class', 'confirmation-message')
        div.appendChild(p)

    }

    async getHtml() {
        return "";
    }
}