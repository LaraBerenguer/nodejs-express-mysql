import { Request, Response } from 'express';
import Event from '../models/event';

export const getEvents = async (req: Request, res: Response) => {
    const listEvents = await Event.findAll();
    res.json(listEvents)
};

export const getEvent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const event = await Event.findByPk(id);

    if (event) {
        res.json(event)
    } else {
        res.status(404).json({
            msg: `No event with id ${id}`
        })
    }
};

export const deleteEvent = async (req: Request, res: Response) => {

    const { id } = req.params;
    const event = await Event.findByPk(id);

    if (!event) {
        res.status(404).json({ msg: `No event with id ${id}` });
    } else {
        await event.destroy();
        res.status(204);
    };
};

export const createEvent = async (req: Request, res: Response) => {
    const { body } = req;

    try {
        const eventdb = await Event.create(body);
        res.status(201).json(eventdb);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Something went wrong"
        })
    }
};

export const updateEvent = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    console.log('Updating event with id:', id);
    console.log('Event data received:', body);

    const event = await Event.findByPk(id);

    try {
        if (event) {
            const eventdb = await event.update(body);
            console.log('Event updated:', eventdb);
            res.status(202).json(eventdb);
        } else {
            res.status(404).json({
                msg: `No event with id ${id}`
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Something went wrong while updating the event"
        });
    }
};

export const patchEvent = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;

    console.log('Patching event with id:', id);
    console.log('Event data received:', body);

    const event = await Event.findByPk(id);

    try {
        if (event) {
            const eventdb = await event.update(body, { fields: Object.keys(body) });
            console.log('Event patched:', eventdb);
            res.status(202).json(eventdb);
        } else {
            res.status(404).json({
                msg: `No event with id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Something went wrong while patching the event"
        });
    }
};