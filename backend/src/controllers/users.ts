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
    const { body } = req;
    console.log(body)
    
    res.json({
        msg: "create user",
        body: body
    })
}

export const updateUser = (req: Request, res: Response) => {    
    const { body } = req;
    const { id } = req.params;  
    
    res.json({
        msg: "put user",
        id: id,
        body: body       
    })
}