import { ROLE_ADMIN, ROLE_SUPER_ADMIN } from "../constants/roles.js";
import User from "../models/User.js";
import uploadFile from "../utils/fileuploader.js";
import authService from "./auth.service.js";
const getAllUser = async (query) => {
    const sort = query.sort ? JSON.parse(query.sort) : {};
    const limit = query.limit ?? 10;
    const offset = query.offset ?? 0;

    const filters = {};

    const { name, email, phone } = query;

    if (name) filters.name = { $regex: name, $options: "i" };
    if (email) filters.email = { $regex: email, $options: "i" };
    if (phone) filters.phone = { $regex: phone, $options: "i" };

    return await User.find(filters).sort(sort).limit(limit).skip(offset);
}
const getById = async (id, authUser) => {
    // 1. Authorization Check
    if (authUser.id !=id && !authUser.roles.includes(ROLE_ADMIN)) {
        throw {
            status: 403,
            message: "Access denied.",
        };
    }

    // 2. Database Query
    const user = await User.findById(id);

    // 3. User bhetiyena bhane error handle garne
    if (!user) {
        throw {
            status: 404,
            message: "User not found.",
        };
    }

    return user;
}
const createUser = async (data) => {
    return await authService.register(data)
}

const updateUser = async (id, data, authUser) => {
  if (authUser._id !== id && !authUser.roles.includes(ROLE_ADMIN)) {
    throw {
      status: 403,
      message: "Access denied.",
    };
  }

  return await User.findByIdAndUpdate(
    id,
    {
      name: data?.name,
      phone: data?.phone,
      address: data?.address,
      isActive: data?.isActive,
    },
    { returnDocument: "after" },
  );
};

const deleteUser = async (id) => {
    await User.findOneAndDelete(id)
    return "User deleted successfully"
}
const updateProfile = async (id, file) => {
    const uplloadFiles = await uploadFile([file]);
    return await User.findOneAndUpdate(id, {
        profileImageUrl: uplloadFiles[0].url
    }, { returnDocument: "after" },
    )
}

const updateuserRoles = async (id, roles, authuser) => {
    if (
        (roles.includes(ROLE_ADMIN) || roles.includes(ROLE_SUPER_ADMIN)) && 
        !authuser.roles.includes(ROLE_SUPER_ADMIN)) {
        throw {
            status: 403,
            message: "Access denied.",
        };
    }
    return await User.findByIdAndUpdate(
        id,
        { roles },
        { returnDocument: "after" },
    );
}

export default { getAllUser, getById, createUser, updateUser, deleteUser, updateProfile ,updateuserRoles}

