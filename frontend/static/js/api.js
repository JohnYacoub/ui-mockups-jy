// let meta = document.createElement('meta');
// meta.content = "default-src 'self' https://jsonplaceholder.typicode.com/users"
// document.getElementsByTagName('head')[0].appendChild(meta);
// console.log(meta, "meta")
const APIURL = 'http://localhost:3000/api/getusers'
console.log(APIURL)
fetch(APIURL).then(response => response.json()).then(responseObject =>{
  console.log(responseObject);
})