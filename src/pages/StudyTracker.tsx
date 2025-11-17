import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Calendar, Clock, CheckCircle, FileText, TrendingUp, Download, MessageCircle, Plus, Trash2, PlusCircle, Send, Database, X } from "lucide-react";
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

interface StudyTrackerHeader {
  id: number;
  year: number;
  period: number;
  session_headers: SessionHeader[];
  assignment_headers: AssignmentHeader[];
}

interface Session {
  score: number | null;
  present_at: string | null;
  discussion_at: string | null;
  session_number: number;
}

interface Assignment {
  score: number | null;
  is_submitted: string | null;
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
}

interface StudyTrackerData {
  header: StudyTrackerHeader;
  body: StudyTrackerBody[];
  semester: number;
}

interface StudyTrackerResponse {
  data: {
    study_tracker: StudyTrackerData;
  };
  meta: {
    message: string;
    code: number;
  };
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
      // Prepare the payload
      const payload = {
        is_presented: formData.present,
        is_discussed: formData.discussion,
        score: formData.score ? parseInt(formData.score) : 0
      };

      console.log('API Parameters:', {
        studyTrackerId,
        sessionNumber,
        payload
      });

      // Make API call - menggunakan studyTrackerId dan session.id
      const response = await apiClient(
        `/study_trackers/${studyTrackerId}/sessions/${sessionNumber}`,
        "PUT",
        payload,
        {},
        noteId
      );

      // Update local state
      const sessionData: Partial<Session> = {
        session_number: sessionNumber,
        present_at: formData.present ? new Date().toISOString() : null,
        discussion_at: formData.discussion ? new Date().toISOString() : null,
        score: formData.score ? parseInt(formData.score) : null
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
        score: formData.score ? parseInt(formData.score) : 0
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
        score: formData.score ? parseInt(formData.score) : null
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

interface StudiesResponse {
  data: {
    studies: Study[];
  };
  page: {
    current_page: number;
    total_data: number;
    limit: number;
    total_page: number;
  };
  meta: {
    message: string;
    code: number;
  };
}

interface AddStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  noteId: string;
}

function AddStudyModal({ isOpen, onClose, noteId }: AddStudyModalProps) {
  const [selectedStudies, setSelectedStudies] = useState<number[]>([]);
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState(false);
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
        limit: "10",
        page: page.toString(),
        ...(search && { search })
      });

      const response: StudiesResponse = await apiClient(`/studies?${params}`, "GET");
      console.log(response)
      setStudies(response.studies || []);
      setTotalPages(response.page.total_page);
      setCurrentPage(response.page.current_page);
    } catch (error: any) {
      console.error("Error fetching studies:", error);
    } finally {
      setSearchLoading(false);
    }
  };

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

  // Load studies pertama kali modal dibuka
  useEffect(() => {
    if (isOpen) {
      fetchStudies();
      setSelectedStudies([]);
      setSearchTerm("");
      setCurrentPage(1);
    }
  }, [isOpen]);

  // Load more studies
  const loadMoreStudies = async () => {
    if (currentPage >= totalPages || searchLoading) return;
    
    const nextPage = currentPage + 1;
    setSearchLoading(true);
    try {
      const params = new URLSearchParams({
        limit: "10",
        page: nextPage.toString(),
        ...(searchTerm && { search: searchTerm })
      });

      const response: StudiesResponse = await apiClient(`/studies?${params}`, "GET");
      setStudies(prev => [...prev, ...(response.data.studies || [])]);
      setTotalPages(response.page.total_page);
      setCurrentPage(response.page.current_page);
    } catch (error: any) {
      console.error("Error loading more studies:", error);
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

      onClose();
      setSelectedStudies([]);
    } catch (error: any) {
      console.error("Error adding studies:", error);
      alert(error.response?.meta?.message || "Failed to add studies");
    } finally {
      setAdding(false);
    }
  };

  const getSelectedStudyNames = () => {
    return selectedStudies.map(id => {
      const study = studies.find(s => s.id === id);
      return study ? `${study.name} (${study.sks} SKS)` : "";
    }).filter(Boolean);
  };

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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              />
              {searchLoading && (
                <div className="absolute right-3 top-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                </div>
              )}
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
                {getSelectedStudyNames().map((name, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 bg-blue-600/20 text-blue-300 text-xs px-2 py-1 rounded border border-blue-500/30"
                  >
                    <span>{name}</span>
                    <button
                      type="button"
                      onClick={() => handleStudyToggle(selectedStudies[index])}
                      className="text-blue-400 hover:text-blue-300 ml-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
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

// Delete Study Modal Component
interface DeleteStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (studyId: number) => void;
  studies: StudyTrackerBody[];
}

function DeleteStudyModal({ isOpen, onClose, studies }: DeleteStudyModalProps) {
  const [selectedStudy, setSelectedStudy] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStudy) {
      onDelete(selectedStudy);
      onClose();
      setSelectedStudy(0);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-md">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-gray-100">Delete Study</h2>
          <p className="text-gray-400 text-sm mt-1">Select a study to remove from your tracker</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Study Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Study
            </label>
            <select
              value={selectedStudy}
              onChange={(e) => setSelectedStudy(Number(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value={0}>Choose a study to delete...</option>
              {studies.map((study) => (
                <option key={study.id} value={study.id}>
                  {study.name} ({study.sks} SKS)
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedStudy}
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Delete Study
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

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
  const [showDeleteStudyModal, setShowDeleteStudyModal] = useState(false);

  const [deletingCourseId, setDeletingCourseId] = useState<number | null>(null);

  const location = useLocation();
  const noteId = location.state?.noteId;

  useEffect(() => {
    if (noteId) {
      fetchStudyTracker(noteId);
    }
  }, [noteId]);

  const fetchStudyTracker = async (noteId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response: StudyTrackerResponse = await apiClient("/study_trackers", "GET", undefined, {}, noteId.toString());
      setData(response.study_tracker);
    } catch (err: any) {
      setError(err.response?.meta?.message || "Failed to load study tracker data");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  // Action Handlers
  const handleGenerateStudyTracker = async (noteId: string) => {
    try {
      const response: StudyTrackerResponse = await apiClient("/study_trackers", "POST", undefined, {}, noteId.toString());
    } catch (err) {
      setError(err.response?.meta?.message);
      console.log(err)
    }
  };

  const handleSubmitStudy = async (noteId: string) => {
    try {
      const response: StudyTrackerResponse = await apiClient("/study_trackers/submit", "PUT", undefined, {}, noteId.toString());
      console.log('Submit Study clicked');
      alert('Submit Study functionality to be implemented');
      console.log(response);
    } catch (err) {
      setError(err.response?.meta?.message || "Failed to submit study");
      console.log(err);
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
    if (!confirm("Are you sure you want to delete this course from your study tracker?")) {
      return;
    }

    setDeletingCourseId(courseId);
    try {
      await apiClient(`/study_trackers/${courseId}`, "DELETE", undefined, {}, noteId.toString());
      
      if (data) {
        const updatedData = {
          ...data,
          body: data.body.filter(course => course.id !== courseId)
        };
        setData(updatedData);
      }
      
      console.log('Deleted course:', courseId);
    } catch (err: any) {
      setError(err.response?.meta?.message || "Failed to delete course");
      console.error('Error deleting course:', err);
    } finally {
      setDeletingCourseId(null);
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
                  Semester {data.semester} - {data.header.year} Period {data.header.period}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>
                  {formatDate(data.header.session_headers[0]?.start_at)} -{" "}
                  {formatDate(data.header.session_headers[data.header.session_headers.length - 1]?.end_at)}
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
          {data.status === "submitted" && (
            <div className="px-3 py-1 bg-green-900/50 border border-green-700 text-green-300 text-sm rounded-lg">
              Study Tracker Submitted
            </div>
          )}
          {data.status !== "submitted" && (
            <div className="flex items-center space-x-3">
              {/* Generate Study Tracker Button */}
              <button
                onClick={() => handleGenerateStudyTracker(noteId)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Generate Study Tracker</span>
              </button>

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

              {/* Delete Study Button */}
              {/* <button
                onClick={() => setShowDeleteStudyModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Study</span>
              </button> */}
            </div>
          )}
          
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
                <p className="text-2xl font-bold text-gray-100">{data.header.session_headers.length}</p>
              </div>
              <Clock className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Assignments</p>
                <p className="text-2xl font-bold text-gray-100">{data.header.assignment_headers.length}</p>
              </div>
              <FileText className="w-8 h-8 text-orange-400" />
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
                  {data.header.session_headers.map((sessionHeader) => (
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
                  {data.header.assignment_headers.map((assignmentHeader) => (
                    <th key={assignmentHeader.assignment_number} className="text-center p-4 text-gray-300 font-medium bg-gray-750 w-[100px]">
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-semibold">A{assignmentHeader.assignment_number}</span>
                        <span className="text-xs text-gray-400 mt-1">
                          Due {formatDate(assignmentHeader.end_at)}
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
                  {data.status !== "submitted" && (
                    <th className="text-center p-4 text-gray-300 font-medium bg-gray-750 w-[100px]">
                      Delete
                    </th>
                  )}
                </tr>
              </thead>
              
              <tbody>
                {data.body.map((course, index) => {
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
                        
                        return (
                          <td 
                            key={session.session_number} 
                            className="text-center p-4"
                          >
                            <button
                              onClick={() => handleSessionClick(course.id, course.name, session)}
                              className={`w-full h-full flex items-center justify-center space-x-1 min-h-[60px] rounded-lg transition-colors ${
                                isEmpty 
                                  ? 'bg-gray-800 hover:bg-gray-600 border border-dashed border-gray-600' 
                                  : 'cursor-help hover:bg-gray-700'
                              }`}
                              title={
                                isEmpty 
                                  ? 'Klik untuk menambahkan data' 
                                  : sessionStatuses.map(s => s.tooltip).join(' • ')
                              }
                            >
                              {isEmpty ? (
                                <div className="flex flex-col items-center space-y-1">
                                  {/* <Plus className="w-4 h-4 text-gray-400" />
                                  <span className="text-xs text-gray-400">Add</span> */}
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
                        
                        return (
                          <td 
                            key={assignment.assignment_number} 
                            className="text-center p-4"
                          >
                            <button
                              onClick={() => handleAssignmentClick(course.id, course.name, assignment)}
                              className={`w-full h-full flex items-center justify-center space-x-1 min-h-[60px] rounded-lg transition-colors ${
                                isEmpty 
                                  ? 'bg-gray-800 hover:bg-gray-600 border border-dashed border-gray-600' 
                                  : 'cursor-help hover:bg-gray-700'
                              }`}
                              title={
                                isEmpty 
                                  ? 'Klik untuk menambahkan data' 
                                  : assignmentStatuses.map(s => s.tooltip).join(' • ')
                              }
                            >
                              {isEmpty ? (
                                <div className="flex flex-col items-center space-y-1">
                                  {/* <Plus className="w-4 h-4 text-gray-400" />
                                  <span className="text-xs text-gray-400">Add</span> */}
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
                      {data.status !== "submitted" && (
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

        {/* Legend */}
        <div className="mt-6 p-4 bg-gray-800 border border-gray-700 rounded-lg">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Legend</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
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
              <Plus className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">Klik untuk menambah data</span>
            </div>
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
          is_submitted: null 
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

      <DeleteStudyModal
        isOpen={showDeleteStudyModal}
        onClose={() => setShowDeleteStudyModal(false)}
        studies={data?.body || []}
      />
    </div>
  );
}