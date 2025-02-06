export interface IEvent {
    id?: string,
    title: string,
    start: string,
    end: string,
    allDay: boolean,
    location_id: string,
    description: string,
    category: string,
    color: string;
};