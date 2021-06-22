const APIURL = 'http://localhost:3000/api/users'


// const APIURL = 'https://vsmedia-mockup.herokuapp.com/api/users'
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
  console.log("Users inputs to be sent to the backend", user)
  try {
    const res =await fetch (`${APIURL}/add`,{
      method:'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await res.json();
    console.log(response)
    return {response, isSuccess:true}
  } catch (e) {
    console.log(e)
  }
}


export const getUserById = async (id) => {
  try {
    const res = await fetch(`${APIURL}/user/${id}`);
    let user = await res.json();
    console.log(user)
    return user
  } catch (e) {
    console.log(e)
  }
}

export const editUser = async (user)=>{
  try {
    const res = await fetch(`${APIURL}/edit/${user.id}`,{
      method:'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let {data} = await res.json();
    console.log("resposne comming from the API DB after editing",data)
    return {data, isSuccess:true}
  } catch (e) {
    console.log(e)
    return {e, isSuccess:false}
  }

}