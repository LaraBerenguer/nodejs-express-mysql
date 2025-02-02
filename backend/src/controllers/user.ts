import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
    const listUsers = await User.findAll();
    res.json(listUsers)
};

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk();

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({
            msg: `No user with id ${id}`
        })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk();

    if (user) {
        await user.destroy();
        res.json({
            msg: `User deleted!`
        })
    } else {
        res.status(404).json({
            msg: `No user with id ${id}`
        })
    }
}

export const createUser = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        await User.create(body);
        res.json({
            msg: "User created!"
        })
    } catch (error) {
        console.log(error);
        res.json({
            msg: "Something went wrong"
        })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    const user = await User.findByPk(id);

    try {
        if (user) {
            await user.update(body);
            res.json({
                msg: `User updated`
            })
        } else {
            res.status(404).json({
                msg: `No user with id ${id}`
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            msg: "Something went wrong"
        })
    }
};