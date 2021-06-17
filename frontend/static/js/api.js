// const APIURL = 'http://localhost:3000/api/users'


const APIURL = 'https://vsmedia-mockup.herokuapp.com/api/users'
export const getUsersList = async () => {
  try {
    const res = await fetch(APIURL);
    let userlist = await res.json();
    return userlist
  } catch (e) {
    console.log(e)
  }

}