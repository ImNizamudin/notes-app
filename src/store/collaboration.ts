import { create } from "zustand";
import { apiClient, apiClientWithPagination } from "../api/client";

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
  thumbnail?: string;
}

interface DailyNote {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_by: string | null;
  deleted_at: string | null;
  created_date: string;
  note_id: number;
  user_id: number;
  user_name: string;
  note_collaboration_id: number;
  thumbnail: string;
  body: string;
  is_editable: boolean;
  is_deletable: boolean;
}

interface Pagination {
  current_page: number;
  total_data: number;
  limit: number;
  total_page: number;
}

interface CollaborationState {
  loading: boolean;
  error: string | null;
  collaborators: User[];
  collaborations: Collaboration[];
  comments: DailyNote[];
  pagination: Pagination | null;
  
  createCollaboration: (userId: string, noteId: number) => Promise<void>;
  deleteCollaboration: (userId: string, noteId: number) => Promise<void>;
  fetchCollaborators: (noteId: number) => Promise<void>;
  
  fetchCollaborations: (noteId: number, page?: number, limit?: number) => Promise<void>;
  addOrUpdateComment: (noteId: number, body: string, thumbnail?: string, collaborationId?: string) => Promise<Collaboration>;
  deleteComment: (collaborationId: string) => Promise<void>;
}

export const useCollaborationStore = create<CollaborationState>((set, get) => ({
  loading: false,
  error: null,
  collaborators: [],
  collaborations: [],
  comments: [],
  pagination: null,

  fetchCollaborators: async (noteId: number) => {
    set({ loading: true, error: null });
    try {
      const res = await apiClient(`/notes/${noteId}`, "GET");
      
      let collaborators: User[] = [];
      let collaborations: Collaboration[] = [];

      if (res && res.note) {
        if (res.note.user_collaborators) {
          collaborators = res.note.user_collaborators;
        }
        if (res.note.note_collaborations) {
          collaborations = res.note.note_collaborations;
        }
      }

      set({ collaborators, collaborations });
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

  fetchCollaborations: async (noteId: number, page: number = 1, limit: number = 10) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClientWithPagination(`/note_collaboration_dailies/${noteId}/list?page=${page}&limit=${limit}`, "GET");

      // Pastikan struktur response sesuai
      let comments: DailyNote[] = [];
      let pagination: Pagination | null = null;
      
      // Handle response dengan struktur pagination
      if (response && response.data && response.page) {
        if (Array.isArray(response.data)) {
          comments = response.data;
        } else if (response.data.daily_notes && Array.isArray(response.data.daily_notes)) {
          comments = response.data.daily_notes;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          comments = response.data.data;
        }
        
        pagination = response.page;
        // console.log(pagination)
      } else if (Array.isArray(response)) {
        // Fallback jika response langsung array
        comments = response;
        pagination = {
          current_page: 1,
          total_data: response.length,
          limit: limit,
          total_page: 1
        };
      }
      
      set({ comments, pagination, error: null });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch collaborations";
      set({ error: errorMessage });
      throw new Error(errorMessage);
    } finally {
      set({ loading: false });
    }
  },

  addOrUpdateComment: async (noteId: number, body: string, thumbnail?: string, collaborationId?: string) => {
    set({ loading: true, error: null });
    try {
      let response;
      const payload = {
        note_id: noteId,
        body: body.trim(),
        ...(thumbnail && { thumbnail })
      };
      
      if (collaborationId) {
        response = await apiClient(`/note_collaboration_dailies/${collaborationId}`, "PUT", payload);
      } else {
        response = await apiClient("/note_collaboration_dailies", "POST", payload);
      }

      // Handle response berdasarkan struktur yang mungkin
      const responseData = response.data || response;
      
      if (!responseData) {
        throw new Error("Invalid response from server");
      }

      const newCollaboration: Collaboration = {
        id: responseData.id?.toString() || `temp-${Date.now()}`,
        userId: responseData.user_id?.toString() || responseData.userId?.toString() || "0",
        noteId: responseData.note_id || responseData.noteId || noteId,
        user: responseData.user || {
          id: "0",
          username: "Unknown",
          fullname: "Unknown User",
          email: ""
        },
        body: responseData.body || body,
        thumbnail: responseData.thumbnail || thumbnail,
        created_at: responseData.created_at || new Date().toISOString(),
        updated_at: responseData.updated_at || new Date().toISOString()
      };

      // Update state
      set((state) => {
        if (collaborationId) {
          // Update existing comment
          const updatedCollaborations = state.collaborations.map(collab =>
            collab.id === collaborationId ? newCollaboration : collab
          );
          return { collaborations: updatedCollaborations };
        } else {
          // Add new comment
          return { collaborations: [newCollaboration, ...state.collaborations] };
        }
      });

      return newCollaboration;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to add/update comment";
      set({ error: errorMessage });
      throw new Error(errorMessage);
    } finally {
      set({ loading: false });
    }
  },

  deleteComment: async (collaborationId: string) => {
    set({ loading: true, error: null });
    try {
      await apiClient(`/note_collaboration_dailies/${collaborationId}`, "DELETE");

      // Hapus dari state
      set((state) => ({
        collaborations: state.collaborations.filter(collab => collab.id !== collaborationId),
        comments: state.comments.filter(comment => comment.id.toString() !== collaborationId)
      }));
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to delete comment";
      set({ error: errorMessage });
      throw new Error(errorMessage);
    } finally {
      set({ loading: false });
    }
  }
}));