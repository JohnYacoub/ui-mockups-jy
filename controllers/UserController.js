const axios = require("axios");
const url = 'https://jsonplaceholder.typicode.com/users'
exports.getUsersList = async (req, res) => {
  try {

    const response = await axios.get(`${url}`);
    console.log(response.data)
    res.status(200).json(response.data)
  } catch (e) {
    res.status(400).json({
      message: e
    })

  }
}
exports.addUser = async (req, res, next) => {

  const user = {
    name: "John",
    website:"wwww.sdsd.com",
    email:"email@el.com",
    number:"888-88-8888",
    userId:1
  }
  try {
    console.log(req)
    const response = await axios.post(`${url}`, {
      data: user,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },

    });
    // console.log(response)
    res.status(200).json(response.data)
  } catch (e) {
    res.status(400).json({
      message: e
    })

  }
}
exports.editUser = async (req, res,next) => {
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
exports.deleteUser = async (req, res,next) => {
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