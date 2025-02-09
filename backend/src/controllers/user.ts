import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
    const listUsers = await User.findAll();
    res.json(listUsers)
};

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({
            msg: `No user with id ${id}`
        })
    }
};

export const deleteUser = async (req: Request, res: Response) => {

    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
        res.status(404).json({ msg: `No user with id ${id}` });
    } else {
        await user.destroy();
        res.status(204);
    };
};

export const createUser = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        const userdb = await User.create(body);
        res.status(201).json(userdb);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Something went wrong"
        })
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    console.log('Updating user with id:', id);
    console.log('User data received:', body);

    const user = await User.findByPk(id);

    try {
        if (user) {
            const userdb = await user.update(body);
            console.log('User updated:', userdb);
            res.status(202).json(userdb);
        } else {
            res.status(404).json({
                msg: `No user with id ${id}`
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Something went wrong while updating the user"
        });
    }
};