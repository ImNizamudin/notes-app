import { use, useState } from "react";
import Navbar from "../components/Navbar";
import { useNotesStore } from "../store/note";
import { useNavigate } from "react-router-dom";

function AddNote() {
  const navigate = useNavigate();
  const addNote = useNotesStore((s) => s.addNote);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      await addNote({ title, body, tags });
      navigate("/");
    } catch (e: any) {
      setErr(e.message || "Gagal menambahkan note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded shadow p-4">
          <h1 className="text-xl font-bold mb-4">Tambah Note</h1>
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
                disabled={loading}
                className="px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNote;