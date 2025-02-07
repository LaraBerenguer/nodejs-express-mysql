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
                <label className="block mb-2">Title:</label>
                <input
                    type="text"
                    value={selectedEvent?.title || ''}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
                    className="border p-2 w-full rounded"
                />
                <label className="block mt-4 mb-2">Description:</label>
                <textarea
                    value={selectedEvent?.description || ''}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
                    className="border p-2 w-full rounded"
                />
                <label className="block mt-4 mb-2">Start Date:</label>
                <input
                    type="datetime-local"
                    value={selectedEvent?.start || ''}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, start: e.target.value })}
                    className="border p-2 w-full rounded"
                />
                <label className="block mt-4 mb-2">End Date:</label>
                <input
                    type="datetime-local"
                    value={selectedEvent?.end || ''}
                    onChange={(e) => setSelectedEvent({ ...selectedEvent, end: e.target.value })}
                    className="border p-2 w-full rounded"
                />
                <div className="mt-4 flex justify-end gap-2">
                    <button onClick={closeModal} className="btn">Cancel</button>
                    <button onClick={handleEventUpdate} className="btn btn-primary">Save</button>
                    <button onClick={confirmAndDelete} className="btn btn-error">Delete</button>
                </div>
            </div>
        </dialog>
    )
};

export default EventModal;