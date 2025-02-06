import { Request, Response } from 'express';
import Location from '../models/location';

export const getLocations = async (req: Request, res: Response) => {
    const listLocations = await Location.findAll();
    res.json(listLocations)
};

export const getLocation = async (req: Request, res: Response) => {
    const { id } = req.params;
    const location = await Location.findByPk(id);

    if (location) {
        res.json(location)
    } else {
        res.status(404).json({
            msg: `No location with id ${id}`
        })
    }
};

export const createLocation = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        const locationdb = await Location.create(body);
        res.status(201).json(locationdb);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Something went wrong"
        })
    }
};