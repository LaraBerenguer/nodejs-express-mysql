import {Request, Response} from 'express';

export const getUsers = (req: Request, res: Response) => {
    console.log()
    res.json({
        msg: "get users"
    })
}

export const getUser = (req: Request, res: Response) => {    
    res.json({
        msg: "get user",
        id: req.params.id
    })
}

export const deleteUser = (req: Request, res: Response) => {    
    res.json({
        msg: "delete user",
        id: req.params.id
    })
}

export const createUser = (req: Request, res: Response) => {    
    res.json({
        msg: "create user",
        body: req.params.body
    })
}