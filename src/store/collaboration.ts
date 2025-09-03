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
  body: string;
  created_at: string;
  updated_at: string;
}

interface CollaborationState {
  loading: boolean;
  error: string | null;
  collaborators: User[];
  collaborations: Collaboration[]; // Untuk menyimpan data komentar
  
  // Fungsi yang sudah ada
  createCollaboration: (userId: string, noteId: number) => Promise<void>;
  deleteCollaboration: (userId: string, noteId: number) => Promise<void>;
  fetchCollaborators: (noteId: number) => Promise<void>;
  
  // Fungsi baru untuk komentar
  fetchCollaborations: (noteId: number) => Promise<void>;
  addOrUpdateComment: (noteId: number, body: string) => Promise<Collaboration>;
  deleteComment: (collaborationId: string) => Promise<void>;
}

export const useCollaborationStore = create<CollaborationState>((set, get) => ({
  loading: false,
  error: null,
  collaborators: [],
  collaborations: [],

  // Fungsi yang sudah ada
  fetchCollaborators: async (noteId: number) => {
    set({ loading: true, error: null });
    try {
      const res = await apiClient(`/notes/${noteId}`, "GET");
      
      let collaborators: User[] = [];

      if (res && res.note && res.note.user_collaborators) {
        collaborators = res.note.user_collaborators;
      }

      set({ collaborators });

      let collaborations: Collaboration[] = [];

      // Extract collaborations dari berbagai kemungkinan struktur response
      if (res && res.note && res.note.note_collaborations) {
        collaborations = res.note.note_collaborations;
      }

      set({ collaborations });
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
      
      await get().fetchCollaborators(noteId);
    } catch (err: any) {
      set({ error: err.message || "Failed to delete collaboration" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Fungsi baru untuk komentar
  fetchCollaborations: async (noteId: number) => {
    set({ loading: true, error: null });
    try {
      const res = await apiClient(`/notes/${noteId}`, "GET");
      
      let collaborations: Collaboration[] = [];

      // Extract collaborations dari berbagai kemungkinan struktur response
      if (res && res.note && res.note.note_collaborations) {
        collaborations = res.note.note_collaborations;
      }

      set({ collaborations });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch collaborations" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  addOrUpdateComment: async (noteId: number, body: string) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient("/collaborations", "PUT", {
        noteId: noteId,
        body: body.trim()
      });

      // Handle berbagai struktur response
      const collaborationData = response.data?.collaboration || 
                               response.collaboration || 
                               response.data || 
                               response;

      const newCollaboration: Collaboration = {
        id: collaborationData.id || `temp-${Date.now()}`,
        userId: collaborationData.user_id || collaborationData.userId || "0",
        noteId: collaborationData.note_id || collaborationData.noteId || noteId,
        user: collaborationData.user || {
          id: "0",
          username: "Unknown",
          fullname: "Unknown User",
          email: ""
        },
        body: collaborationData.body || body,
        created_at: collaborationData.created_at || new Date().toISOString(),
        updated_at: collaborationData.updated_at || new Date().toISOString()
      };

      // Update state
      set((state) => {
        const existingIndex = state.collaborations.findIndex(c => c.id === newCollaboration.id);
        
        if (existingIndex >= 0) {
          // Update existing
          const updatedCollaborations = state.collaborations.map((collab, index) => 
            index === existingIndex ? newCollaboration : collab
          );
          return { collaborations: updatedCollaborations };
        } else {
          // Add new
          return { collaborations: [...state.collaborations, newCollaboration] };
        }
      });

      return newCollaboration;
    } catch (err: any) {
      set({ error: err.message || "Failed to add/update comment" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  deleteComment: async (collaborationId: string) => {
    set({ loading: true, error: null });
    try {
      // Asumsi: mengirim body kosong akan menghapus komentar
      await apiClient("/collaborations", "PUT", {
        noteId: "0", // Note ID dummy, mungkin perlu disesuaikan
        body: ""
      });

      // Atau jika ada endpoint DELETE khusus:
      // await apiClient(`/collaboration/${collaborationId}`, "DELETE");

      // Hapus dari state
      set((state) => ({
        collaborations: state.collaborations.filter(collab => collab.id !== collaborationId)
      }));
    } catch (err: any) {
      set({ error: err.message || "Failed to delete comment" });
      throw err;
    } finally {
      set({ loading: false });
    }
  }
}));