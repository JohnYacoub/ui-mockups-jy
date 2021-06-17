const APIURL = 'http://localhost:3000/api/users'
console.log(APIURL)
fetch(APIURL).then(response => response.json()).then(responseObject =>{
  console.log(responseObject);
})