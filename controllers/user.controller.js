import User from "../models/user.model.js";
import Subscription from "../models/subscription.model.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users })

    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            const error = "User not found";
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: user })

    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        if (user._id.toString() != req.user._id.toString()) {
            const error = new Error("You are not the owner of this account");
            error.status = 403;
            throw error;
        }

        const newName = req.body.name;

        user.name = newName;
        await user.save();

        res.status(200).json({
            success: true,
            data: user
        })


    } catch (error) {
        next(error);
    }
}


export const deleteUser = async (req, res, next) => {
    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        if (user._id.toString() != req.user._id.toString()) {
            const error = new Error("You are not the owner of this account");
            error.status = 403;
            throw error;
        }

        await Subscription.deleteMany({ user: req.params.id });
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};