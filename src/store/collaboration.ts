import { create } from "zustand";
import apiClient from "../api/client";

interface User {
  id: string;
  username: string;
  fullname: string;
  email?: string;
}

interface Collaboration {
  id: string;
  userId: string;
  noteId: number;
  user: User;
}

interface CollaborationState {
  loading: boolean;
  error: string | null;
  collaborators: User[]; // Sekarang menyimpan User[], bukan Collaboration[]
  createCollaboration: (userId: string, noteId: number) => Promise<void>;
  deleteCollaboration: (userId: string, noteId: number) => Promise<void>;
  fetchCollaborators: (noteId: number) => Promise<void>;
}

export const useCollaborationStore = create<CollaborationState>((set, get) => ({
  loading: false,
  error: null,
  collaborators: [],

  fetchCollaborators: async (noteId: number) => {
    set({ loading: true, error: null });
    try {
      const res = await apiClient(`/notes/${noteId}`, "GET");
      
      let collaborators: User[] = [];

      if (res && res.note && res.note.user_collaborators) {
        collaborators = res.note.user_collaborators;
      }

      set({ collaborators });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch collaborators" });
    } finally {
      set({ loading: false });
    }
  },

  createCollaboration: async (userId: string, noteId: number) => {
    set({ loading: true, error: null });
    try {
      await apiClient("/collaborations", "POST", { 
        userId: userId.toString(), 
        noteId: Number(noteId)     
      });
      
      // Refresh collaborators setelah berhasil create
      await get().fetchCollaborators(noteId);
    } catch (err: any) {
      set({ error: err.message || "Failed to create collaboration" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  deleteCollaboration: async (userId: string, noteId: number) => {
    set({ loading: true, error: null });
    try {
      await apiClient("/collaborations", "DELETE", { 
        userId: userId.toString(), 
        noteId: Number(noteId)     
      });
      
      // Refresh collaborators setelah berhasil delete
      await get().fetchCollaborators(noteId);
    } catch (err: any) {
      set({ error: err.message || "Failed to delete collaboration" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));