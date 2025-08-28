import { use, useEffect } from "react";
import { useNotesStore } from "../store/note";
import NoteCard from "../components/NoteCard";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function NoteList() {
    const { notes, fetchNotes } = useNotesStore((state) => state);

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {notes.map((note) => (
                    <NoteCard
                        key={note.id}
                        note={{
                            ...note,
                            id: String(note.id),
                        }}
                    />
                ))}
            </div>
            <Link to="/notes/new" className="fixed bottom-4 right-4 p-2 bg-blue-500 text-white rounded">
                Create Note
            </Link>
        </div>
    );

}

export default NoteList;