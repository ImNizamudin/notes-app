import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNotesStore, type Note } from "../store/note";
import { Link, useNavigate, useParams } from "react-router-dom";

function NoteDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const getNote = useNotesStore((s) => s.getNote);
  const fetchNoteById = useNotesStore((s) => s.fetchNoteById);
  const deleteNote = useNotesStore((s) => s.deleteNote);

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    const local = getNote(id);
    if (local) {
      setNote(local);
      setLoading(false);
    } else {
      fetchNoteById(id)
        .then((data) => setNote(data))
        .catch((e) => setErr(e.message || "Gagal memuat note"))
        .finally(() => setLoading(false));
    }
  }, [id, getNote, fetchNoteById]);

  const onDelete = async () => {
    if (!id) return;
    if (!confirm("Hapus note ini?")) return;
    setDeleting(true);
    try {
      await deleteNote(id);
      navigate("/");
    } catch (e: any) {
      setErr(e.message || "Gagal menghapus note");
      setDeleting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-white rounded shadow p-6">
          {loading ? (
            <p>Memuat...</p>
          ) : err ? (
            <p className="text-red-600">{err}</p>
          ) : note ? (
            <>
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-2xl font-bold">{note.title}</h1>
                <div className="flex gap-2">
                  <Link
                    to={`/notes/${note.id}/edit`}
                    className="px-3 py-2 rounded border"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={onDelete}
                    disabled={deleting}
                    className="px-3 py-2 rounded bg-red-600 text-white disabled:opacity-50"
                  >
                    {deleting ? "Menghapus..." : "Hapus"}
                  </button>
                </div>
              </div>

              {note.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {note.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded bg-gray-100 border"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-6 whitespace-pre-wrap text-gray-800">
                {note.body}
              </div>
            </>
          ) : (
            <p>Note tidak ditemukan.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default NoteDetail;