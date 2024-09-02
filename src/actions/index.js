'use server';

import { connectToDB } from "@/database";
import { ImageCRUD } from "@/models";

export async function AddUser(formData) {
    await connectToDB();
    try {
        const {userid, username, usermail, imageurl} = formData;
        const newUser = new ImageCRUD({userid, username, usermail, imageurl});
        const save = await newUser.save();
        if(save){
            return{
                success: true,
                data: JSON.parse(JSON.stringify(save))
            }
        } else {
            return {
                success: false,
                message: "Invalid Credential. Try Again!",
            }
        }
    } catch (error) {
        console.log(error);
        return{
            message: "Something Error Occured",
            success: false,
        }
    }
}

export async function FetchUsers() {
    await connectToDB();
    try {
        const users = await ImageCRUD.find({});
        return {
            success: true,
            data: JSON.parse(JSON.stringify(users))
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to fetch users."
        };
    }
}

export async function DeleteUser(userId) {
    await connectToDB();
    try {
        const deletedUser = await ImageCRUD.findByIdAndDelete(userId);
        if (deletedUser) {
            return {
                success: true,
                message: "User deleted successfully",
            };
        } else {
            return {
                success: false,
                message: "User not found",
            };
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to delete user",
        };
    }
}

export async function UpdateUser(userId, updatedData) {
    await connectToDB();
    try {
        const updatedUser = await ImageCRUD.findByIdAndUpdate(userId, updatedData, { new: true });
        if (updatedUser) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(updatedUser)),
                message: "User updated successfully",
            };
        } else {
            return {
                success: false,
                message: "User not found",
            };
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Failed to update user",
        };
    }
}