import { Link } from "react-router-dom";
import { useNotesStore } from "../store/note";

interface Props {
    note: {
        id: string;
        title: string;
        body: string;
        tags: string[];
    }
}

function NoteCard({ note }: Props) {
    const deleteNote = useNotesStore((state) => state.deleteNote);

    return (
        <div className="border p-4 rounded shadow">
            <h2 className="p-4 border rounded shadow bg-white flex flex-col justify-between">
                {note.title}
            </h2>
            <p className="mb-2">{note.body}</p>
            <div className="mb-2">
                {note.tags.map((tag, index) => (
                    <span key={index} className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded mr-2">{tag}</span>
                ))}
            </div>
            <div className="flex gap-2">
                <Link to={`/notes/${note.id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Edit</Link>
                <button onClick={() => deleteNote(note.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Delete</button>
            </div>
        </div>
    );
}

export default NoteCard;