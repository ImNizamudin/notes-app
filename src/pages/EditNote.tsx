import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useNotesStore, type Note } from "../store/note";

function EditNote() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const getNote = useNotesStore((s) => s.getNote);
  const fetchNoteById = useNotesStore((s) => s.fetchNoteById);
  const updateNote = useNotesStore((s) => s.updateNote);

  const [initial, setInitial] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const local = getNote(id);
    if (local) {
      setInitial(local);
      setTitle(local.title);
      setBody(local.body);
      setTagsInput(local.tags.join(", "));
      setLoading(false);
    } else {
      // fetch jika belum ada di state
      fetchNoteById(id)
        .then((data) => {
          setInitial(data);
          setTitle(data.title);
          setBody(data.body);
          setTagsInput(data.tags?.join(", ") || "");
        })
        .catch((e) => setErr(e.message || "Gagal memuat note"))
        .finally(() => setLoading(false));
    }
  }, [id, fetchNoteById, getNote]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setErr(null);
    setSaving(true);
    try {
      const tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      await updateNote(id, { title, body, tags });
      navigate(`/notes/${id}`);
    } catch (e: any) {
      setErr(e.message || "Gagal menyimpan perubahan");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded shadow p-4">
          <h1 className="text-xl font-bold mb-4">Edit Note</h1>

          {loading ? (
            <p>Memuat...</p>
          ) : initial ? (
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              <input
                className="border rounded p-2"
                placeholder="Judul"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                className="border rounded p-2 min-h-[160px]"
                placeholder="Isi catatan..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
              <input
                className="border rounded p-2"
                placeholder="Tags (pisahkan dengan koma)"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
              />

              {err && <p className="text-sm text-red-600">{err}</p>}

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-3 py-2 rounded border"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
                >
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          ) : (
            <p className="text-red-600">Note tidak ditemukan.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditNote;