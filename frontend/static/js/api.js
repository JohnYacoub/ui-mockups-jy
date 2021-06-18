 const APIURL = 'http://localhost:3000/api/users'


//const APIURL = 'https://vsmedia-mockup.herokuapp.com/api/users'
export const getUsersList = async () => {
  try {
    const res = await fetch(APIURL);
    let userlist = await res.json();
    return userlist
  } catch (e) {
    console.log(e)
  }
}


export const addUser = async (user) => {
  user.userId = 998
  console.log("added user", user)
  try {
    const res = await fetch(`${APIURL}/add`,{
      method:'POST',
      body: JSON.stringify({user}),

    });
    let {data} = await res.json();
    console.log(data)
    return {data, isSuccess:true}
  } catch (e) {
    console.log(e)
  }
}

export const getUserById = async (id)=>{
const usr ={
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
      }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
  }
}
  return usr
}

export const editUser = async (user)=>{
  try {
    const res = await fetch(`${APIURL}/edit/${user.id}`,{
      method:'PUT',
      body: JSON.stringify({user}),

    });
    let {data} = await res.json();
    console.log(data)
    return {data, isSuccess:true}
  } catch (e) {
    console.log(e)
  }

}