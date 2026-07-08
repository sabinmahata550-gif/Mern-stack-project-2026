import userService from "../services/user.service.js";

const getAllUser = async (req, res) => {
    try {
        const user = await userService.getAllUser(req.query)
        res.json(user)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

const getById = async (req, res) => {
    try {
        const user = await userService.getById(req.params.id,req.user)
        res.json(user)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body)
        res.json(user)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body,req.user)
        res.json(user)
    } catch (error) {
        res.status(error.status||400).json(error.message)
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

const updateProfileImage = async (req, res) => {
    try {
        const user = await userService.updateProfile(req.user._id, req.file)
        res.json(user)
    } catch (error) {
        res.status(400).json(error.message)
    }
    
}
    
const updateuserRoles= async (req, res) => {
  try {
    const user = await userService.updateuserRoles(
      req.params.id,
      req.body?.roles,
      req.user,
    );

    res.json(user);
  } catch (error) {
    res.status(error.status || 400).send(error.message);
  }
};



export default {
    getAllUser,
    getById,
     createUser,
      updateUser, 
      deleteUser, 
      updateProfileImage ,
      updateuserRoles
    }