const axios = require("axios");

exports.getUsersList = async(req,res)=>{
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    console.log(response.data)
     res.status(200).json(response.data)
  } catch (e) {
    console.log(e)
    
  }
}