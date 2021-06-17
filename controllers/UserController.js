const axios = require("axios");

exports.getUsersList = async(req,res)=>{
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    console.log(response.data)
     res.status(200).json(response.data)
  } catch (e) {
    res.status(400).json({
      message: e
    })
    
  }
}
exports.addUser = async(req,res)=>{
  try {
    const response = await axios.post(`https://jsonplaceholder.typicode.com/users/${req.id}}`);
    console.log(response.data)
     res.status(200).json(response.data)
  } catch (e) {
    res.status(400).json({
      message: e
    })
    
  }
}
exports.editUser = async(req,res)=>{
  try {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${req.id}}`);
    console.log(response.data)
     res.status(200).json(response.data)
  } catch (e) {
    res.status(400).json({
      message: e
    })
    
  }
}
exports.deleteUser = async(req,res)=>{
  try {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/users/${req.id}}`);
    console.log(response.data)
     res.status(200).json(response.data)
  } catch (e) {
    res.status(400).json({
      message: e
    })
    
  }
}