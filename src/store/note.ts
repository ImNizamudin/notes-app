import { create } from "zustand";
import apiClient from "../api/client";

export interface Note {
  id: string | number;
  title: string;
  body: string;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
  [k: string]: any;
}

interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string | null;

  fetchNotes: () => Promise<void>;
  fetchNoteById: (note_id: string | number) => Promise<Note>;
  addNote: (payload: {
    title: string;
    body: string;
    tags?: string[];
  }) => Promise<void>;
  updateNote: (
    note_id: string | number,
    payload: { title: string; body: string; tags?: string[] }
  ) => Promise<void>;
  deleteNote: (note_id: string | number) => Promise<void>;
  getNote: (note_id: string | number) => Note | undefined;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  loading: false,
  error: null,

  fetchNotes: async () => {
    if (get().loading) return;
    set({ loading: true, error: null });
    try {
      const data: any = await apiClient("/notes", "GET");
      const notesArray: Note[] = Array.isArray(data)
        ? data
        : data?.notes ?? data?.data ?? [];
      set({ notes: notesArray, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch notes", loading: false });
    }
  },

  fetchNoteById: async (note_id) => {
    set({ loading: true, error: null });
    try {
      const data: any = await apiClient(`/notes/${note_id}`, "GET");
      const note = data?.note ?? data;
      set((s) => {
        const exists = s.notes.some(
          (n) => String(n.id) === String(note.id)
        );
        return {
          notes: exists
            ? s.notes.map((n) =>
                String(n.id) === String(note.id) ? note : n
              )
            : [note, ...s.notes],
          loading: false,
        };
      });
      return note;
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch note", loading: false });
      throw err;
    }
  },

  addNote: async (payload) => {
    set({ loading: true, error: null });
    try {
      await apiClient("/notes", "POST", payload);
      await get().fetchNotes();
    } catch (err: any) {
      set({ error: err.message || "Failed to add note", loading: false });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  updateNote: async (note_id, payload) => {
    set({ loading: true, error: null });
    try {
      await apiClient(`/notes/${note_id}`, "PUT", payload);
      await get().fetchNotes();
    } catch (err: any) {
      set({ error: err.message || "Failed to update note", loading: false });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  deleteNote: async (note_id) => {
    set({ loading: true, error: null });
    try {
      await apiClient(`/notes/${note_id}`, "DELETE");
      await get().fetchNotes();
    } catch (err: any) {
      set({ error: err.message || "Failed to delete note", loading: false });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  getNote: (note_id) =>
    get().notes.find((n) => String(n.id) === String(note_id)),
}));
