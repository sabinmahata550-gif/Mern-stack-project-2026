import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            maxlength: [50, "Name cannot be more than 50 characters"],
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
        },

        phone: {
            type: Number,
            required: [true, "Phone is required"],
        },

        address: {

            city: {
                type: String,
                required: true
            },
      
            province: {
                type: String,
                required: true
            },

            country: {
                type: String,
                default: 'Nepal'
            }
        },

        isActive: {
            type: Boolean,
            default: true
        },

        roles: {
            type: [String],
            enum: ["ADMIN", "MERCHANT", "CUSTOMER","SUPER_ADMIN"],
            default: "CUSTOMER",
        },

        profileImageUrl:{
            type:String,
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;