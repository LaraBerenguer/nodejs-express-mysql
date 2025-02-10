import { PartialIEvent } from "../../api/api-interfaces/events-partial-interface";

interface EventModalProps {
    selectedEvent: PartialIEvent | null;
    setSelectedEvent: React.Dispatch<React.SetStateAction<PartialIEvent | null>>;
    handleEventUpdate: () => void;
    handleEventDelete: () => void;
    closeModal: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ selectedEvent, setSelectedEvent, handleEventUpdate, handleEventDelete, closeModal }) => {
    const confirmAndDelete = () => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            handleEventDelete();
        }
    };

    return (
        <dialog id="eventModal" className="modal">
            <div className="modal-box">
                <h2 className="text-xl font-bold mb-4">Edit Event</h2>
                <label htmlFor="title" className="block mb-2">Title:
                    <input
                        id="title"
                        type="text"
                        value={selectedEvent?.title || ''}
                        onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
                        className="border p-2 w-full rounded my-2"
                    />
                </label>
                <label htmlFor="description" className="block mt-4 mb-2">Description:
                    <textarea
                        id="description"
                        value={selectedEvent?.description || ''}
                        onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
                        className="border p-2 w-full rounded my-2"
                    />
                </label>

                <label htmlFor="startDate" className="block mt-4 mb-2">Start Date:
                    <input
                        id="startDate"
                        type="datetime-local"
                        value={selectedEvent?.start || ''}
                        onChange={(e) => setSelectedEvent({ ...selectedEvent, start: e.target.value })}
                        className="border p-2 w-full rounded my-2"
                    />
                </label>
                <label htmlFor="endDate" className="block mt-4 mb-2">End Date:
                    <input
                        id="endDate"
                        type="datetime-local"
                        value={selectedEvent?.end || ''}
                        onChange={(e) => setSelectedEvent({ ...selectedEvent, end: e.target.value })}
                        className="border p-2 w-full rounded my-2"
                    />
                </label>
                <div className="mt-4 flex justify-end gap-2">
                    <button onClick={closeModal} className="btn">Cancel</button>
                    <button onClick={handleEventUpdate} className="btn btn-secondary">Save</button>
                    <button onClick={confirmAndDelete} className="btn btn-error">Delete</button>
                </div>
            </div>
        </dialog>
    )
};

export default EventModal;