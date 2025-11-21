import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Calendar, Clock, CheckCircle, FileText, TrendingUp, Download, MessageCircle, Plus, Trash2, PlusCircle, Send, Database, X, Users, Zap } from "lucide-react";
import { apiClient } from "../api/client";
import { useLocation } from 'react-router-dom';

interface SessionHeader {
  end_at: string;
  start_at: string;
  session_number: number;
}

interface AssignmentHeader {
  end_at: string;
  start_at: string;
  assignment_number: number;
}

interface Webinar {
  webinar_number: number;
  link: string | null;
  presented_at: string | null;
  scheduled_at: string | null;
}

interface WebinarHeader {
  end_at: string;
  start_at: string;
  webinar_number: number;
}

interface StudyTrackerHeader {
  id: number;
  year: number;
  period: number;
  sessions: SessionHeader[]; // BERUBAH: dari session_headers menjadi sessions
  assignments: AssignmentHeader[]; // BERUBAH: dari assignment_headers menjadi assignments
  webinars: WebinarHeader[]; // BERUBAH: dari webinar_headers menjadi webinars
}

interface Session {
  score: number | null;
  present_at: string | null;
  discussion_at: string | null;
  session_number: number;
}

interface Assignment {
  score: number | null;
  submitted_at: string | null;
  assignment_number: number;
}

interface StudyTrackerBody {
  id: number;
  name: string;
  sks: number;
  is_practical: boolean;
  status: string;
  semester: number;
  submit_assignment_first: string | null;
  submit_assignment_second: string | null;
  submit_assignment_third: string | null;
  sessions: Session[];
  assignments: Assignment[];
  webinars: (Webinar | null)[]; // BERUBAH: bisa berisi null
}

interface StudyTrackerData {
  header: StudyTrackerHeader;
  body: StudyTrackerBody[];
  semester: number;
  status: string;
  note_id: number; // TAMBAHAN: ada note_id di level atas
}

// Modal Component
interface SessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: Session;
  courseName: string;
  studyTrackerId: number;      // course.id dari body
  sessionNumber: number;       // session.session_number
  onSave: (sessionData: Partial<Session>) => void;
  noteId: string;
}

function SessionModal({ isOpen, onClose, session, courseName, sessionNumber, onSave, noteId, studyTrackerId }: SessionModalProps) {
  const [formData, setFormData] = useState({
    present: !!session.present_at,
    discussion: !!session.discussion_at,
    score: session.score || ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
      present: !!session.present_at,
      discussion: !!session.discussion_at,
      score: session.score || ''
    });
    setError(null);
  }, [session]);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const payload = {
      is_presented: formData.present,
      is_discussed: formData.discussion,
      score: formData.score ? parseInt(String(formData.score)) : null // ✅ JADI null, BUKAN 0
    };

    await apiClient(
      `/study_trackers/${studyTrackerId}/sessions/${sessionNumber}`,
      "PUT",
      payload,
      {},
      noteId
    );

    const sessionData: Partial<Session> = {
      session_number: sessionNumber,
      present_at: formData.present ? new Date().toISOString() : null,
      discussion_at: formData.discussion ? new Date().toISOString() : null,
      score: formData.score ? parseInt(String(formData.score)) : null // ✅ JADI null
    };

    onSave(sessionData);
    onClose();
    
  } catch (err: any) {
    console.error('Error saving session:', err);
    setError(err.response?.data?.message || err.response?.meta?.message || "Failed to save session data");
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-md">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-gray-100">Edit Session</h2>
          <p className="text-gray-400 text-sm mt-1">
            {courseName} - Session {sessionNumber}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}
          
          {/* Present Checkbox */}
          <div className="mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.present}
                onChange={(e) => setFormData(prev => ({ ...prev, present: e.target.checked }))}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">Hadir</span>
              </div>
            </label>
          </div>

          {/* Discussion Checkbox */}
          <div className="mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.discussion}
                onChange={(e) => setFormData(prev => ({ ...prev, discussion: e.target.checked }))}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Diskusi</span>
              </div>
            </label>
          </div>

          {/* Score Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nilai
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.score}
              onChange={(e) => setFormData(prev => ({ ...prev, score: e.target.value }))}
              className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan nilai (0-100)"
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface AssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignment: Assignment;
  courseName: string;
  assignmentNumber: number;
  onSave: (assignmentData: Partial<Assignment>) => void;
  noteId: string;
  studyTrackerId: number;
}

function AssignmentModal({ isOpen, onClose, assignment, courseName, assignmentNumber, onSave, noteId, studyTrackerId }: AssignmentModalProps) {
  const [formData, setFormData] = useState({
    submitted: !!assignment.submitted_at,
    score: assignment.score || ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
      submitted: !!assignment.submitted_at,
      score: assignment.score || ''
    });
    setError(null);
  }, [assignment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Prepare the payload according to API requirements
      const payload = {
        submitted_at: formData.submitted, // true/false
        score: formData.score ? Number(formData.score) : 0
        // score: formData.score ? parseInt(formData.score) : 0
      };

      console.log('Sending assignment payload:', payload);
      console.log('Study Tracker ID:', studyTrackerId);
      console.log('Assignment Number:', assignmentNumber);

      // Make API call to assignment endpoint - menggunakan assignment_number
      const response = await apiClient(
        `/study_trackers/${studyTrackerId}/assignments/${assignmentNumber}`,
        "PUT",
        payload,
        {},
        noteId
      );

      console.log('API Response:', response);

      // Call the onSave callback with updated data
      const assignmentData: Partial<Assignment> = {
        assignment_number: assignmentNumber,
        submitted_at: formData.submitted ? new Date().toISOString() : null,
        score: formData.score ? parseInt(String(formData.score)) : null // ✅ JADI null
        // score: formData.score ? Number(formData.score) : 0
        // score: formData.score ? parseInt(formData.score) : null
      };

      onSave(assignmentData);
      onClose();
      
    } catch (err: any) {
      console.error('Error saving assignment:', err);
      setError(err.response?.data?.message || err.response?.meta?.message || "Failed to save assignment data");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-md">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-gray-100">Edit Assignment</h2>
          <p className="text-gray-400 text-sm mt-1">
            {courseName} - Assignment {assignmentNumber}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}
          
          {/* Submitted Checkbox */}
          <div className="mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.submitted}
                onChange={(e) => setFormData(prev => ({ ...prev, submitted: e.target.checked }))}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">Terkumpul</span>
              </div>
            </label>
          </div>

          {/* Score Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nilai
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.score}
              onChange={(e) => setFormData(prev => ({ ...prev, score: e.target.value }))}
              className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan nilai (0-100)"
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface Study {
  id: number;
  name: string;
  sks: number;
  semester: number;
  is_practical: boolean;
  study_field_id: number;
  created_at: string;
  updated_at: string;
}

interface AddStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  noteId: string;
}

function AddStudyModal({ isOpen, onClose, noteId }: AddStudyModalProps) {
  const [selectedStudies, setSelectedStudies] = useState<number[]>([]);
  const [studies, setStudies] = useState<Study[]>([]);
  const [allSelectedStudies, setAllSelectedStudies] = useState<Study[]>([]);
  const [loading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch studies dengan search dan pagination
  const fetchStudies = async (search: string = "", page: number = 1) => {
    setSearchLoading(true);
    try {
      const params = new URLSearchParams({
        limit: "100",
        page: page.toString(),
        ...(search ? { search } : {})
      });

      const response = await apiClient(`/studies?${params}`, "GET");

      // Perbaikan: Sesuaikan dengan struktur response yang sebenarnya
      let studiesData = [];
      
      // Cek beberapa kemungkinan struktur response
      if (response.studies) {
        studiesData = response.studies;
      }

      // Jika page 1 (search baru atau load pertama), replace studies
      // Jika load more, append ke studies yang ada
      if (page === 1) {
        setStudies(studiesData);
      } else {
        setStudies(prev => [...prev, ...studiesData]);
      }
      
      // Update pagination info
      if (response.page) {
        setTotalPages(response.page.total_page || 1);
        setCurrentPage(response.page.current_page || 1);
      }

    } catch (error: any) {
      console.error("Error fetching studies:", error.response?.data?.message);
    } finally {
      setSearchLoading(false);
    }
  };

  // Update allSelectedStudies ketika selectedStudies berubah
  useEffect(() => {
    if (selectedStudies.length === 0) {
      setAllSelectedStudies([]);
      return;
    }

    // Selalu pertahankan allSelectedStudies yang ada, hanya update jika ada studi baru yang ditemukan
    setAllSelectedStudies(prev => {
      const updatedStudies = selectedStudies.map(id => {
        // Cari di studies yang baru
        const newStudy = studies.find(s => s.id === id);
        if (newStudy) return newStudy;
        
        // Cari di allSelectedStudies yang sudah ada
        const existingStudy = prev.find(s => s.id === id);
        if (existingStudy) return existingStudy;
        
        // Fallback
        return {
          id,
          name: `Study ${id}`,
          sks: 0,
          semester: 0,
          is_practical: false,
          study_field_id: 0,
          created_at: '',
          updated_at: ''
        };
      });
      
      return updatedStudies;
    });
  }, [selectedStudies, studies]);

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isOpen) {
        setCurrentPage(1);
        fetchStudies(searchTerm, 1);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, isOpen]);

  // Load more studies
  const loadMoreStudies = async () => {
    if (currentPage >= totalPages || searchLoading) return;
    
    const nextPage = currentPage + 1;
    setSearchLoading(true);
    try {
      const params = new URLSearchParams({
        limit: "50", // Ubah dari 10 ke 50 untuk konsistensi
        page: nextPage.toString(),
        ...(searchTerm && { search: searchTerm })
      });

      const response = await apiClient(`/studies?${params}`, "GET");

      // Extract studies data dengan cara yang sama
      let studiesData = [];
      
      if (response.studies) {
        studiesData = response.studies;
      }

      setStudies(prev => [...prev, ...studiesData]);
      
      // Update pagination
      if (response.page) {
        setTotalPages(response.page.total_page || 1);
        setCurrentPage(response.page.current_page || 1);
      }
    } catch (error: any) {
      console.error("Error fetching studies:", error.response?.data?.message);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleStudyToggle = (studyId: number) => {
    setSelectedStudies(prev => {
      if (prev.includes(studyId)) {
        return prev.filter(id => id !== studyId);
      } else {
        if (prev.length >= 5) {
          alert("You can only select up to 5 studies");
          return prev;
        }
        return [...prev, studyId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStudies.length === 0) {
      alert("Please select at least one study");
      return;
    }

    setAdding(true);
    try {
      await apiClient(
        "/study_trackers/many",
        "POST",
        {
          study_ids: selectedStudies
        },
        {},
        noteId
      );

      const selectedStudyNames = allSelectedStudies.map(study => 
        study.name
      ).filter(Boolean);

      // Show success alert with study names
      alert(`Sukses berhasil menambahkan ${selectedStudies.length} study${selectedStudies.length !== 1 ? 'ies' : ''}:\n\n${selectedStudyNames.map(name => `• ${name}`).join('\n')}`);

      onClose();
      setSelectedStudies([]);
      setAllSelectedStudies([]);

      window.dispatchEvent(new CustomEvent('refreshStudyTracker'));
    } catch (error: any) {
      console.error("Error adding studies:", error);
      alert(error.response?.meta?.message || "Failed to add studies");
    } finally {
      setAdding(false);
    }
  };

  // const getSelectedStudyNames = () => {
  //   return allSelectedStudies.map(study => {
  //     return `${study.name} (${study.sks} SKS)`;
  //   }).filter(Boolean);
  // };

  // Generate kode matkul sederhana berdasarkan nama
  const generateStudyCode = (study: Study) => {
    const words = study.name.split(' ');
    if (words.length >= 2) {
      return words.map(word => word.charAt(0).toUpperCase()).join('').substring(0, 3);
    }
    return study.name.substring(0, 3).toUpperCase();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-gray-100">Add Studies</h2>
          <p className="text-gray-400 text-sm mt-1">
            Select up to 5 studies to add to your tracker
          </p>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Search Bar */}
          <div className="p-6 border-b border-gray-700">
            <div className="relative">
              <input
                type="text"
                placeholder="Search studies by name..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              />
              {searchLoading && (
                <div className="absolute right-3 top-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>
            {/* Debug info - bisa dihapus setelah fix */}
            <div className="text-xs text-gray-500 mt-2">
              Debug: Search term: "{searchTerm}" | Results: {studies.length} | Loading: {searchLoading.toString()}
            </div>
          </div>

          {/* Selected Studies Preview */}
        {selectedStudies.length > 0 && (
  <div className="p-4 border-b border-gray-700 bg-gray-750">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-gray-300">
        Selected ({selectedStudies.length}/5)
      </span>
      <button
        type="button"
        onClick={() => setSelectedStudies([])}
        className="text-xs text-red-400 hover:text-red-300"
      >
        Clear all
      </button>
    </div>
    <div className="flex flex-wrap gap-2">
      {selectedStudies.map((studyId) => {
        const study = studies.find(s => s.id === studyId);
        return (
          <span
            key={studyId} // Gunakan studyId sebagai key
            className="inline-flex items-center space-x-1 bg-blue-600/20 text-blue-300 text-xs px-2 py-1 rounded border border-blue-500/30"
          >
            <span>{study?.name || 'Unknown'}</span>
            <button
              type="button"
              onClick={() => handleStudyToggle(studyId)}
              className="text-blue-400 hover:text-blue-300 ml-1"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        );
      })}
    </div>
  </div>
)}

          {/* Studies List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : studies.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No studies found</p>
                <p className="text-sm mt-1">
                  {searchTerm ? "Try a different search term" : "No studies available"}
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-2">
                {studies.map((study) => (
                  <label
                    key={study.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedStudies.includes(study.id)
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-gray-600 bg-gray-700 hover:border-gray-500"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedStudies.includes(study.id)}
                      onChange={() => handleStudyToggle(study.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-100 truncate">
                              {study.name}
                              {selectedStudies.includes(study.id) && (
                                <span className="ml-2 text-blue-400 text-xs">✓ Selected</span>
                              )}
                            </span>
                            <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded">
                              {generateStudyCode(study)}
                            </span>
                          </div>
                          <div className="text-sm text-gray-400 flex items-center space-x-3">
                            <span>{study.sks} SKS</span>
                            <span>•</span>
                            <span>Semester {study.semester}</span>
                            <span>•</span>
                            <span>{study.is_practical ? "Praktikum" : "Teori"}</span>
                          </div>
                        </div>
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                          study.is_practical ? 'bg-blue-500' : 'bg-green-500'
                        }`} />
                      </div>
                    </div>
                  </label>
                ))}
                
                {/* Load More Button */}
                {currentPage < totalPages && (
                  <div className="flex justify-center pt-4">
                    <button
                      onClick={loadMoreStudies}
                      disabled={searchLoading}
                      className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50 transition-colors flex items-center space-x-2"
                    >
                      {searchLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-300"></div>
                          <span>Loading...</span>
                        </>
                      ) : (
                        <>
                          <span>Load More</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-700 flex justify-between items-center">
          <div className="text-sm text-gray-400">
            {selectedStudies.length > 0 && (
              <span>
                {selectedStudies.length} study{selectedStudies.length !== 1 ? 'ies' : ''} selected
              </span>
            )}
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={selectedStudies.length === 0 || adding}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {adding ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add Studies</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Update StudyTrackerHeader interface
interface StudyTrackerHeader {
  id: number;
  year: number;
  period: number;
  session_headers: SessionHeader[];
  assignment_headers: AssignmentHeader[];
  webinar_headers: WebinarHeader[]; // Tambahkan ini
}

// Tambahkan WebinarModal component
interface WebinarModalProps {
  isOpen: boolean;
  onClose: () => void;
  webinar: Webinar | null;
  courseName: string;
  studyTrackerId: number;
  webinarNumber: number;
  onSave: (webinarData: Partial<Webinar>) => void;
  noteId: string;
}

function WebinarModal({ isOpen, onClose, webinar, courseName, webinarNumber, onSave, noteId, studyTrackerId }: WebinarModalProps) {
  const [formData, setFormData] = useState({
    is_presented: !!webinar?.presented_at,
    link: webinar?.link || '',
    scheduled_at: webinar?.scheduled_at ? new Date(webinar.scheduled_at).toISOString().slice(0, 16) : ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (webinar) {
      setFormData({
        is_presented: !!webinar.presented_at,
        link: webinar.link || '',
        scheduled_at: webinar.scheduled_at ? new Date(webinar.scheduled_at).toISOString().slice(0, 16) : ''
      });
    } else {
      setFormData({
        is_presented: false,
        link: '',
        scheduled_at: ''
      });
    }
    setError(null);
  }, [webinar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Prepare the payload sesuai dengan endpoint yang diminta
      const payload = {
        scheduled_at: formData.scheduled_at ? new Date(formData.scheduled_at).toISOString() : null,
        link: formData.link || null,
        is_presented: formData.is_presented
      };

      console.log('Saving webinar with payload:', payload);
      console.log('API Parameters:', {
        studyTrackerId,
        webinarNumber,
        noteId
      });

      // Make API call ke endpoint webinar
      await apiClient(
        `/study_trackers/${studyTrackerId}/webinars/${webinarNumber}`,
        "PUT",
        payload,
        {},
        noteId
      );

      // Update local state
      const webinarData: Partial<Webinar> = {
        webinar_number: webinarNumber,
        link: formData.link || null,
        presented_at: formData.is_presented ? new Date().toISOString() : null,
        scheduled_at: formData.scheduled_at ? new Date(formData.scheduled_at).toISOString() : null
      };

      onSave(webinarData);
      onClose();
      
    } catch (err: any) {
      console.error('Error saving webinar:', err);
      console.error('Error details:', err.response?.data);
      setError(err.response?.data?.message || err.response?.meta?.message || "Failed to save webinar data");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Fungsi untuk mendapatkan nama hari dalam Bahasa Indonesia
  const getIndonesianDay = (dateTimeString: string) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const date = new Date(dateTimeString);
    return days[date.getDay()];
  };

  // Fungsi untuk format tanggal tampilan
  const formatDateDisplay = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-md">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-gray-100">
            {webinar ? 'Edit Webinar' : 'Add Webinar'}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {courseName} - Webinar {webinarNumber}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}
          
          {/* Present Checkbox */}
          <div className="mb-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_presented}
                onChange={(e) => setFormData(prev => ({ ...prev, is_presented: e.target.checked }))}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">Telah Diikuti</span>
              </div>
            </label>
          </div>

          {/* Link Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Link Webinar
            </label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
              className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/webinar"
            />
          </div>

          {/* Scheduled At Input */}
         <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Jadwal Webinar
          </label>
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <input
                type="datetime-local"
                value={formData.scheduled_at}
                onChange={(e) => setFormData(prev => ({ ...prev, scheduled_at: e.target.value }))}
                className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className={`w-32 px-3 py-3 border rounded-lg text-center transition-colors ${
              formData.scheduled_at 
                ? 'bg-gray-700 border-gray-600 text-gray-100' 
                : 'bg-gray-800 border-gray-700 text-gray-500'
            }`}>
              {formData.scheduled_at ? (
                <>
                  <div className="text-sm font-medium">
                    {getIndonesianDay(formData.scheduled_at)}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {formatDateDisplay(formData.scheduled_at)}
                  </div>
                </>
              ) : (
                <div className="text-sm text-gray-500">Pilih tanggal</div>
              )}
            </div>
          </div>
        </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ===========================================================================================================

export default function StudyTrackers() {
  const navigate = useNavigate();
  const [data, setData] = useState<StudyTrackerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSession, setSelectedSession] = useState<{
    courseId: number;        // studyTrackerId dari body object
    courseName: string;
    session: Session;
    sessionNumber: number;   // session_number dari session object
  } | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<{
    courseId: number;
    courseName: string;
    assignment: Assignment;
    assignmentNumber: number;
  } | null>(null);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAddStudyModal, setShowAddStudyModal] = useState(false);

  const [deletingCourseId, setDeletingCourseId] = useState<number | null>(null);

  const [selectedWebinar, setSelectedWebinar] = useState<{
    courseId: number;
    courseName: string;
    webinar: Webinar;
    webinarNumber: number;
  } | null>(null);
  const [showWebinarModal, setShowWebinarModal] = useState(false);

  const location = useLocation();
  const noteId = location.state?.noteId;

  useEffect(() => {
    if (noteId) {
      fetchStudyTracker(noteId);
    }

    const handleRefresh = () => {
      if (noteId) {
        fetchStudyTracker(noteId);
      }
    };

    window.addEventListener('refreshStudyTracker', handleRefresh);

    return () => {
      window.removeEventListener('refreshStudyTracker', handleRefresh);
    };

  }, [noteId]);

  const fetchStudyTracker = async (noteId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient("/study_trackers", "GET", undefined, {}, noteId.toString());
      
      if (response?.study_tracker) {
        setData(response.study_tracker);
      } else {
        throw new Error("Invalid response structure");
      }
      
    } catch (err: any) {
      console.error("Error fetching study tracker:", err);
      setError(err.response?.meta?.message || "Failed to load study tracker data");
    } finally {
      setLoading(false);
    }
  };

  // Action Handlers
  const handleGenerateStudyTracker = async (noteId: string) => {
    try {
      await apiClient("/study_trackers", "POST", undefined, {}, noteId.toString());
      alert("Study tracker berhasil dibuat!");
      await fetchStudyTracker(noteId);
    } catch (err: any) { 
      const errorMessage = err.response?.meta?.message || "Failed to generate study tracker";
      setError(errorMessage);
      alert(errorMessage);
    }
  };

  const handleSubmitStudy = async (noteId: string) => {
    // Konfirmasi sebelum submit
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menyimpan Study Tracker?\n\n" +
      "Setelah disubmit, Anda tidak dapat:\n" +
      "• Menambahkan mata kuliah baru\n" +
      "• Menghapus mata kuliah yang ada\n\n" +
      "Tindakan ini tidak dapat dibatalkan."
    );

    if (!isConfirmed) {
      return; // Batalkan jika user tidak confirm
    }

    try {
      await apiClient("/study_trackers/submit", "PUT", undefined, {}, noteId.toString());
      
      // Alert success
      alert("✅ Study tracker berhasil disimpan!\n\nSekarang Anda tidak dapat menambahkan atau menghapus mata kuliah.");
      
      await fetchStudyTracker(noteId);
    } catch (err: any) {
      console.error("Error submitting study:", err);
      
      const errorMessage = err.response?.meta?.message || "Failed to submit study";
      setError(errorMessage);
      alert(`❌ Gagal menyimpan study tracker:\n${errorMessage}`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    });
  };

  const getSessionStatus = (session: Session) => {
    const statuses = [];
    
    if (session.present_at) {
      statuses.push({
        type: 'present',
        icon: <CheckCircle className="w-4 h-4 text-green-400" />,
        tooltip: 'Hadir'
      });
    }
    
    if (session.discussion_at) {
      statuses.push({
        type: 'discussed',
        icon: <MessageCircle className="w-4 h-4 text-blue-400" />,
        tooltip: 'Diskusi'
      });
    }
    
    if (session.score !== null) {
      statuses.push({
        type: 'score',
        content: (
          <span className="text-sm font-medium text-yellow-400">
            {session.score}
          </span>
        ),
        tooltip: `Nilai: ${session.score}`
      });
    }
    
    return statuses;
  };

  const getAssignmentStatus = (assignment: Assignment) => {
    const statuses = [];
    
    if (assignment.submitted_at) {
      statuses.push({
        type: 'submitted',
        icon: <CheckCircle className="w-4 h-4 text-green-400" />,
        tooltip: 'Terkumpul'
      });
    }
    
    if (assignment.score !== null) {
      statuses.push({
        type: 'score',
        content: (
          <span className="text-sm font-medium text-yellow-400">
            {assignment.score}
          </span>
        ),
        tooltip: `Nilai: ${assignment.score}`
      });
    }
    
    return statuses;
  };

  const calculateCourseStats = (course: StudyTrackerBody) => {
    const attendance = course.sessions.filter(s => s.present_at).length;
    const totalSessions = course.sessions.length;
    const submittedAssignments = course.assignments.filter(a => a.submitted_at).length;
    const totalAssignments = course.assignments.length;
    
    const sessionScores = course.sessions
      .filter(s => s.score !== null)
      .map(s => s.score as number);
    const averageSessionScore = sessionScores.length > 0 
      ? sessionScores.reduce((a, b) => a + b, 0) / sessionScores.length 
      : null;

    const assignmentScores = course.assignments
      .filter(a => a.score !== null)
      .map(a => a.score as number);
    const averageAssignmentScore = assignmentScores.length > 0 
      ? assignmentScores.reduce((a, b) => a + b, 0) / assignmentScores.length 
      : null;

    return {
      attendance,
      totalSessions,
      attendancePercentage: totalSessions > 0 ? (attendance / totalSessions) * 100 : 0,
      submittedAssignments,
      totalAssignments,
      averageSessionScore,
      averageAssignmentScore
    };
  };

  const handleSessionClick = (courseId: number, courseName: string, session: Session) => {
    setSelectedSession({
      courseId,           // id dari study tracker/course (18 dalam contoh)
      courseName,
      session,            // session object lengkap
      sessionNumber: session.session_number // session_number dari session (1 dalam contoh)
    });
    setShowModal(true);
  };

  const handleSaveSession = async (sessionData: Partial<Session>) => {
    if (!selectedSession || !data) return;

    // Update local state
    const updatedData = { ...data };
    const courseIndex = updatedData.body.findIndex(course => course.id === selectedSession.courseId);
    
    if (courseIndex !== -1) {
      const sessionIndex = updatedData.body[courseIndex].sessions.findIndex(
        s => s.session_number === selectedSession.sessionNumber
      );
      
      if (sessionIndex !== -1) {
        updatedData.body[courseIndex].sessions[sessionIndex] = {
          ...updatedData.body[courseIndex].sessions[sessionIndex],
          ...sessionData
        };
        setData(updatedData);
      }
    }
  };

  // Add assignment click handler
  const handleAssignmentClick = (courseId: number, courseName: string, assignment: Assignment) => {
    setSelectedAssignment({
      courseId,           // id dari study tracker/course
      courseName,
      assignment,         // assignment object lengkap
      assignmentNumber: assignment.assignment_number // assignment_number dari assignment
    });
    setShowAssignmentModal(true);
  };

  // Add assignment save handler
  const handleSaveAssignment = async (assignmentData: Partial<Assignment>) => {
    if (!selectedAssignment || !data) return;

    // Update local state
    const updatedData = { ...data };
    const courseIndex = updatedData.body.findIndex(course => course.id === selectedAssignment.courseId);
    
    if (courseIndex !== -1) {
      const assignmentIndex = updatedData.body[courseIndex].assignments.findIndex(
        a => a.assignment_number === selectedAssignment.assignmentNumber
      );
      
      if (assignmentIndex !== -1) {
        updatedData.body[courseIndex].assignments[assignmentIndex] = {
          ...updatedData.body[courseIndex].assignments[assignmentIndex],
          ...assignmentData
        };
        setData(updatedData);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <p className="text-red-400 text-lg font-medium mb-2">Error Loading Study Tracker</p>
            <p className="text-gray-400 mb-6">{error}</p>
            <button
              onClick={() => noteId && fetchStudyTracker(noteId)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <div className="text-gray-600 text-6xl mb-4">📚</div>
            <p className="text-gray-400 text-lg">No study tracker data found</p>
            <p className="text-gray-500 text-sm mt-2">Study tracker data is not available</p>
          </div>
        </div>
      </div>
    );
  }

  const handleDeleteCourse = async (courseId: number) => {
    const course = data?.body.find(c => c.id === courseId);
    const courseName = course?.name || 'this course';

    if (!confirm(`Apakah Anda yakin ingin menghapus "${courseName}" dari study tracker Anda?`)) {
      return;
    }

    setDeletingCourseId(courseId);
    try {
      const response = await apiClient(`/study_trackers/${courseId}`, "DELETE", undefined, {}, noteId);
      console.log(response)
      
      if (data) {
        const updatedData = {
          ...data,
          body: data.body.filter(course => course.id !== courseId)
        };
        setData(updatedData);
      }
      
      alert(`Sukses berhasil menghapus "${courseName}" dari study tracker!`);
    } catch (err: any) {
      setError(err.response?.meta?.message);
      alert(err.response?.meta?.message);
    } finally {
      setDeletingCourseId(null);
    }
  };

  const getWebinarStatus = (webinar: Webinar | null) => {
    if (!webinar) return [];
    
    const statuses = [];
    
    if (webinar.presented_at) {
      statuses.push({
        type: 'presented',
        icon: <CheckCircle className="w-4 h-4 text-green-400" />,
        tooltip: 'Telah Disampaikan'
      });
    }
    
    if (webinar.link) {
      statuses.push({
        type: 'link',
        icon: <a href={webinar.link} target="_blank" rel="noopener noreferrer" 
              className="text-blue-400 hover:text-blue-300" onClick={(e) => e.stopPropagation()}>
          <Send className="w-4 h-4" />
        </a>,
        tooltip: 'Klik untuk membuka link webinar'
      });
    }
    
    if (webinar.scheduled_at) {
      statuses.push({
        type: 'scheduled',
        content: (
          <Calendar className="w-4 h-4 text-purple-400" />
        ),
        tooltip: `Terjadwal: ${new Date(webinar.scheduled_at).toLocaleDateString('id-ID')}`
      });
    }
    
    return statuses;
  };

  // Handler untuk klik webinar
  const handleWebinarClick = (courseId: number, courseName: string, webinar: Webinar | null, webinarNumber: number) => {
    // Jika webinar null, buat object webinar baru dengan webinar_number
    const webinarToEdit = webinar || { 
      webinar_number: webinarNumber, 
      link: null, 
      presented_at: null, 
      scheduled_at: null 
    };
    
    setSelectedWebinar({
      courseId,
      courseName,
      webinar: webinarToEdit,
      webinarNumber
    });
    setShowWebinarModal(true);
  };

  // Handler untuk save webinar
  const handleSaveWebinar = async (webinarData: Partial<Webinar>) => {
    if (!selectedWebinar || !data) return;

    // Update local state
    const updatedData = { ...data };
    const courseIndex = updatedData.body.findIndex(course => course.id === selectedWebinar.courseId);
    
    if (courseIndex !== -1) {
      // Pastikan array webinars ada
      if (!updatedData.body[courseIndex].webinars) {
        updatedData.body[courseIndex].webinars = [];
      }
      
      const webinarIndex = updatedData.body[courseIndex].webinars.findIndex(
        w => w && w.webinar_number === selectedWebinar.webinarNumber
      );
      
      if (webinarIndex !== -1) {
        // Update webinar yang sudah ada
        updatedData.body[courseIndex].webinars[webinarIndex] = {
          ...updatedData.body[courseIndex].webinars[webinarIndex],
          ...webinarData
        } as Webinar;
      } else {
        // Buat webinar baru jika belum ada
        const newWebinar: Webinar = {
          webinar_number: selectedWebinar.webinarNumber,
          link: null,
          presented_at: null,
          scheduled_at: null,
          ...webinarData
        };
        
        // Cari posisi yang tepat berdasarkan webinar_number
        let insertIndex = 0;
        for (let i = 0; i < updatedData.body[courseIndex].webinars.length; i++) {
          if (updatedData.body[courseIndex].webinars[i] && 
              updatedData.body[courseIndex].webinars[i]!.webinar_number < selectedWebinar.webinarNumber) {
            insertIndex = i + 1;
          }
        }
        
        updatedData.body[courseIndex].webinars.splice(insertIndex, 0, newWebinar);
      }
      
      setData(updatedData);
    }
  };

  // Tambahkan fungsi handleFinalize
  const handleFinalize = async (noteId: string) => {
    if (!confirm("Apakah Anda yakin ingin memfinalisasi study tracker? Setelah difinalisasi, data tidak dapat diubah lagi.")) {
      return;
    }

    try {
      await apiClient("/study_trackers/finalize", "PUT", undefined, {}, noteId.toString());
      alert("Study tracker berhasil difinalisasi!\n\nSemua data sekarang terkunci dan tidak dapat diubah lagi.");
      await fetchStudyTracker(noteId);
    } catch (err: any) {
      const errorMessage = err.response?.meta?.message || "Failed to finalize study tracker";
      setError(errorMessage);
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-100">Study Tracker</h1>
                <p className="text-gray-400 text-sm">
                  Semester {data.semester} - Tahun {data.header.year} Periode {data.header.period}
                  {data.status === "done" && (
                    <span className="ml-2 px-2 py-1 bg-red-900/50 border border-red-700 text-red-300 text-xs rounded-lg">
                      DONE
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>
                  {formatDate(data.header.sessions[0]?.start_at)} -{" "}
                  {formatDate(data.header.assignments[data.header.assignments.length - 1]?.end_at)}
                </span>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2 text-gray-400">
            <Database className="w-5 h-5" />
            <span className="text-sm">Manage your study tracker</span>
          </div>
          <div className="flex items-center space-x-3 justify-center">
            {data.status === "submitted" && (
              <div className="px-3 py-1 bg-green-900/50 border border-green-700 text-green-300 text-sm rounded-lg">
                Study Tracker Submitted
              </div>
            )}
            {data.status === "done" && (
              <div className="px-3 py-1 bg-red-900/50 border border-red-700 text-red-300 text-sm rounded-lg">
                Study Tracker Finalized
              </div>
            )}
            {/* Generate Study Tracker Button */}
            {data.body.length < 1 && data.status !== "done" && (
              <button
                onClick={() => handleGenerateStudyTracker(noteId)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Generate Study Tracker</span>
              </button>
            )}
            {data.status !== "submitted" && data.status !== "done" && (
              <div className="flex items-center space-x-3">
                {/* Add Study Button */}
                <button
                  onClick={() => setShowAddStudyModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Study</span>
                </button>
                
                {/* Submit Study Button */}
                <button
                  onClick={() => handleSubmitStudy(noteId)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Study</span>
                </button>
              </div>
            )}
            {data.status === "submitted" && (
              <button
                onClick={() => handleFinalize(noteId)}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
              >
                <Zap className="w-4 h-4" />
                <span>Finalize</span>
              </button>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Courses</p>
                <p className="text-2xl font-bold text-gray-100">{data.body.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total SKS</p>
                <p className="text-2xl font-bold text-gray-100">
                  {data.body.reduce((total, course) => total + course.sks, 0)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Sessions</p>
                <p className="text-2xl font-bold text-gray-100">{data.header.sessions.length}</p>
              </div>
              <Clock className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Assignments</p>
                <p className="text-2xl font-bold text-gray-100">{data.header.assignments.length}</p>
              </div>
              <FileText className="w-8 h-8 text-orange-400" />
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Webinars</p>
                <p className="text-2xl font-bold text-gray-100">{data.header.webinars?.length || 0}</p>
              </div>
              <Users className="w-8 h-8 text-pink-400" />
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="border-b border-gray-700">
                  {/* Course Name Column */}
                  <th className="text-left p-4 text-gray-300 bg-gray-800 font-medium sticky left-0 z-10 w-[200px]">
                    Mata Kuliah
                  </th>
                  
                  {/* Sessions Headers */}
                  {data.header.sessions.map((sessionHeader) => (
                    <th key={sessionHeader.session_number} className="text-center p-4 text-gray-300 font-medium bg-gray-750 w-[100px]">
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-semibold">S{sessionHeader.session_number}</span>
                        <span className="text-xs text-gray-400 mt-1">
                          {formatDate(sessionHeader.start_at)}
                        </span>
                      </div>
                    </th>
                  ))}
                  
                  {/* Assignments Headers */}
                  {data.header.assignments.map((assignmentHeader) => (
                    <th key={assignmentHeader.assignment_number} className="text-center p-4 text-gray-300 font-medium bg-gray-750 w-[100px]">
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-semibold">A{assignmentHeader.assignment_number}</span>
                        <span className="text-xs text-gray-400 mt-1">
                          Due {formatDate(assignmentHeader.end_at)}
                        </span>
                      </div>
                    </th>
                  ))}

                  {/* Webinars Headers */}
                  {data.header.webinars?.map((webinarHeader) => (
                    <th key={webinarHeader.webinar_number} className="text-center p-4 text-gray-300 font-medium bg-gray-750 w-[100px]">
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-semibold">W{webinarHeader.webinar_number}</span>
                        <span className="text-xs text-gray-400 mt-1">
                          Webinar {webinarHeader.webinar_number}
                        </span>
                      </div>
                    </th>
                  ))}
                  
                  {/* Stats Columns */}
                  <th className="text-center p-4 text-gray-300 font-medium bg-gray-750 w-[100px]">
                    Attendance
                  </th>
                  <th className="text-center p-4 text-gray-300 font-medium bg-gray-750 w-[100px]">
                    Assignments
                  </th>
                  {data.status !== "submitted" && data.status !== "done" && (
                    <th className="text-center p-4 text-gray-300 font-medium bg-gray-750 w-[100px]">
                      Delete
                    </th>
                  )}
                </tr>
              </thead>
              
              <tbody>
                {data.body.map((course) => {
                  const stats = calculateCourseStats(course);
                  
                  return (
                    <tr 
                      key={course.id} 
                      className={`border-b border-gray-700 bg-gray-800`}
                    >
                      {/* Course Name - Sticky */}
                      <td className="p-4 text-gray-100 left-0 z-10 bg-inherit w-[200px] sticky">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 flex-1">
                            <div className={`w-3 h-3 rounded-full ${
                              course.is_practical ? 'bg-blue-500' : 'bg-green-500'
                            }`}></div>
                            <div className="flex-1">
                              <div className="font-medium">{course.name}</div>
                              <div className="text-sm text-gray-400 flex items-center space-x-2 mt-1">
                                <span>{course.sks} SKS</span>
                                <span>•</span>
                                <span>{course.is_practical ? 'Praktikum' : 'Teori'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      {/* Sessions Data - TIDAK disabled meskipun status submitted */}
                      {course.sessions.map((session) => {
                        const sessionStatuses = getSessionStatus(session);
                        const isEmpty = sessionStatuses.length === 0;
                        const isFinalized = data.status === "done";
                        
                        return (
                          <td 
                            key={session.session_number} 
                            className="text-center p-4"
                          >
                            <button
                              onClick={() => !isFinalized && handleSessionClick(course.id, course.name, session)}
                              disabled={isFinalized}
                              className={`w-full h-full flex items-center justify-center space-x-1 min-h-[60px] rounded-lg transition-colors ${
                                isFinalized 
                                  ? 'bg-gray-900 cursor-not-allowed opacity-50' 
                                  : isEmpty 
                                    ? 'bg-gray-800 hover:bg-gray-600 border border-dashed border-gray-600' 
                                    : 'cursor-help hover:bg-gray-700'
                              }`}
                              title={
                                isFinalized 
                                  ? 'Study tracker sudah difinalize' 
                                  : isEmpty 
                                    ? 'Klik untuk menambahkan data' 
                                    : sessionStatuses.map(s => s.tooltip).join(' • ')
                              }
                            >
                              {isEmpty ? (
                                <div className="flex flex-col items-center space-y-1">
                                  {!isFinalized && (
                                    <>
                                      {/* <Plus className="w-4 h-4 text-gray-400" />
                                      <span className="text-xs text-gray-400">Add</span> */}
                                    </>
                                  )}
                                </div>
                              ) : (
                                sessionStatuses.map((status, index) => (
                                  <div key={index} className="flex items-center">
                                    {status.icon || status.content}
                                  </div>
                                ))
                              )}
                            </button>
                          </td>
                        );
                      })}
                      
                      {/* Assignments Data - TIDAK disabled meskipun status submitted */}
                      {course.assignments.map((assignment) => {
                        const assignmentStatuses = getAssignmentStatus(assignment);
                        const isEmpty = assignmentStatuses.length === 0;
                        const isFinalized = data.status === "done";
  
                        return (
                          <td 
                            key={assignment.assignment_number} 
                            className="text-center p-4"
                          >
                            <button
                              onClick={() => !isFinalized && handleAssignmentClick(course.id, course.name, assignment)}
                              disabled={isFinalized}
                              className={`w-full h-full flex items-center justify-center space-x-1 min-h-[60px] rounded-lg transition-colors ${
                                isFinalized 
                                  ? 'bg-gray-900 cursor-not-allowed opacity-50' 
                                  : isEmpty 
                                    ? 'bg-gray-800 hover:bg-gray-600 border border-dashed border-gray-600' 
                                    : 'cursor-help hover:bg-gray-700'
                              }`}
                              title={
                                isFinalized 
                                  ? 'Study tracker sudah difinalize' 
                                  : isEmpty 
                                    ? 'Klik untuk menambahkan data' 
                                    : assignmentStatuses.map(s => s.tooltip).join(' • ')
                              }
                            >
                              {isEmpty ? (
                                <div className="flex flex-col items-center space-y-1">
                                  {!isFinalized && (
                                    <>
                                      {/* <Plus className="w-4 h-4 text-gray-400" />
                                      <span className="text-xs text-gray-400">Add</span> */}
                                    </>
                                  )}
                                </div>
                              ) : (
                                assignmentStatuses.map((status, index) => (
                                  <div key={index} className="flex items-center">
                                    {status.icon || status.content}
                                  </div>
                                ))
                              )}
                            </button>
                          </td>
                        );
                      })}
                      
                      {/* Webinars Data - disabled jika status finalized */}
                      {course.webinars?.map((webinar, index) => {
                        const webinarNumber = index + 1;
                        
                        // Handle null webinar entries dengan membuat object default
                        const webinarData = webinar || {
                          webinar_number: webinarNumber,
                          link: null,
                          presented_at: null,
                          scheduled_at: null
                        };

                        const webinarStatuses = getWebinarStatus(webinarData);
                        const isEmpty = webinarStatuses.length === 0;
                        const isFinalized = data.status === "done";
                        
                        return (
                          <td key={`webinar-${webinarNumber}`} className="text-center p-4">
                            <button
                              onClick={() => !isFinalized && handleWebinarClick(course.id, course.name, webinarData, webinarNumber)}
                              disabled={isFinalized}
                              className={`w-full h-full flex items-center justify-center space-x-1 min-h-[60px] rounded-lg transition-colors ${
                                isFinalized 
                                  ? 'bg-gray-900 cursor-not-allowed opacity-50' 
                                  : isEmpty 
                                    ? 'bg-gray-800 hover:bg-gray-600 border border-dashed border-gray-600' 
                                    : 'cursor-help hover:bg-gray-700'
                              }`}
                              title={
                                isFinalized 
                                  ? 'Study tracker sudah difinalize' 
                                  : isEmpty 
                                    ? 'Klik untuk menambahkan data webinar' 
                                    : webinarStatuses.map(s => s.tooltip).join(' • ')
                              }
                            >
                              {isEmpty ? (
                                <div className="flex flex-col items-center space-y-1">
                                  {!isFinalized && (
                                    <>
                                      {/* Empty state - bisa tambahkan icon plus jika diperlukan */}
                                    </>
                                  )}
                                </div>
                              ) : (
                                webinarStatuses.map((status, index) => (
                                  <div key={index} className="flex items-center">
                                    {status.icon || status.content}
                                  </div>
                                ))
                              )}
                            </button>
                          </td>
                        );
                      })}
                      
                      {/* Stats Columns */}
                      <td className="text-center p-4">
                        <div className="flex flex-col items-center">
                          <span className="text-sm font-medium text-gray-100">
                            {stats.attendance}/{stats.totalSessions}
                          </span>
                          <span className="text-xs text-gray-400">
                            ({stats.attendancePercentage.toFixed(0)}%)
                          </span>
                        </div>
                      </td>
                      
                      <td className="text-center p-4">
                        <div className="flex flex-col items-center">
                          <span className="text-sm font-medium text-gray-100">
                            {stats.submittedAssignments}/{stats.totalAssignments}
                          </span>
                          <span className="text-xs text-gray-400">
                            ({stats.totalAssignments > 0 ? ((stats.submittedAssignments / stats.totalAssignments) * 100).toFixed(0) : 0}%)
                          </span>
                        </div>
                      </td>

                      {/* Delete Button - hanya muncul jika status bukan submitted */}
                      {data.status !== "submitted" && data.status !== "done" && (
                        <td className="text-center p-4">
                          <button
                            onClick={() => handleDeleteCourse(course.id)}
                            disabled={deletingCourseId === course.id}
                            className="ml-3 p-2 text-red-400 hover:text-red-300 hover:bg-red-900/50 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete course"
                          >
                            {deletingCourseId === course.id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-400"></div>
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Keterangan */}
        <div className="mt-6 p-4 bg-gray-800 border border-gray-700 rounded-lg">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Keterangan</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-gray-400">Hadir</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4 text-blue-400" />
              <span className="text-gray-400">Diskusi</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-yellow-400">88</span>
              <span className="text-gray-400">Nilai</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-gray-400">Webinar Diikuti</span>
            </div>
            <div className="flex items-center space-x-2">
              <Send className="w-4 h-4 text-blue-400" />
              <span className="text-gray-400">Link Webinar</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span className="text-gray-400">Webinar Terjadwal</span>
            </div>
            {data.status === "done" && (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-600 rounded border border-gray-500"></div>
                <span className="text-gray-400">Terkunci (Done)</span>
              </div>
            )}
          </div>
        </div>

        {/* No Courses Message */}
        {data.body.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No courses found</p>
            <p className="text-gray-500 text-sm mt-2">There are no courses in your study tracker</p>
          </div>
        )}
      </div>

      {/* Session Modal */}
      <SessionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        session={selectedSession?.session || { 
          session_number: 0, 
          score: null, 
          present_at: null, 
          discussion_at: null 
        }}
        courseName={selectedSession?.courseName || ''}
        studyTrackerId={selectedSession?.courseId || 0}        // id dari course/study tracker
        sessionNumber={selectedSession?.sessionNumber || 0}    // session_number dari session
        onSave={handleSaveSession}
        noteId={noteId}
      />

      {/* Assignment Modal */}
      <AssignmentModal
        isOpen={showAssignmentModal}
        onClose={() => setShowAssignmentModal(false)}
        assignment={selectedAssignment?.assignment || { 
          assignment_number: 0, 
          score: null, 
          submitted_at: null
        }}
        courseName={selectedAssignment?.courseName || ''}
        assignmentNumber={selectedAssignment?.assignmentNumber || 0}
        onSave={handleSaveAssignment}
        noteId={noteId}
        studyTrackerId={selectedAssignment?.courseId || 0}
      />

      <AddStudyModal
        isOpen={showAddStudyModal}
        onClose={() => setShowAddStudyModal(false)}
        noteId={noteId}
      />

      <WebinarModal
        isOpen={showWebinarModal}
        onClose={() => setShowWebinarModal(false)}
        webinar={selectedWebinar?.webinar || { 
          webinar_number: selectedWebinar?.webinarNumber || 0, 
          link: null,
          presented_at: null,
          scheduled_at: null
        }}
        courseName={selectedWebinar?.courseName || ''}
        studyTrackerId={selectedWebinar?.courseId || 0}
        webinarNumber={selectedWebinar?.webinarNumber || 0}
        onSave={handleSaveWebinar}
        noteId={noteId}
      />

    </div>
  );
}