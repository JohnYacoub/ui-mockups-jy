export let users = [{
    id: 1,
    name: 'Yacoub',
    website: 'www.kk.com',
    email: 'jod@FormData.com',
    phone: '552-55-8888'
}, {
    id: 2,
    name: 'john',
    website: 'www.kk.com',
    email: 'jod@FormData.com',
    phone: '552-55-8888'
}];

const removeAllChildern = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export default class {
    constructor(params, userList) {
        this.params = params;
        console.log('params', params)
    }

    setTitle(title) {
        document.title = title;
    }

    setBackground(bg) {
        const section = document.querySelector('section')
        section.style.background = bg ? `#221F26 url(${bg})` : "#221F26"
        console.log((bg))
    }



    addUser(name, website, email, number) {
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
            const div = document.querySelector('form');
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