import { create } from "zustand";
import apiClient from "../api/client";

interface User {
  id: string;
  username: string;
  fullname: string;
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
  collaborators: Collaboration[];
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
      
      // Handle berbagai struktur respons
      let collaborations: Collaboration[] = [];
      
      if (Array.isArray(res)) {
        collaborations = res;
      } else if (res && res.data && Array.isArray(res.data)) {
        collaborations = res.data;
      } else if (res && res.collaborations && Array.isArray(res.collaborations)) {
        collaborations = res.collaborations;
      }
      
      set({ collaborators: collaborations });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch collaborators" });
      throw err;
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