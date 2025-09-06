// const BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || "https://dev-notesapp.radarku.online";
const BASE_URL = "/api";

// modal confirm
function showSessionExpiredAlert(): Promise<void> {
  return new Promise((resolve) => {
    // Buat modal element
    const modal = document.createElement('div');
    modal.id = 'session-expired-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '9999';
    modal.style.fontFamily = 'system-ui, -apple-system, sans-serif';
    
    modal.innerHTML = `
      <div style="background: #1f2937; padding: 24px; border-radius: 12px; text-align: center; max-width: 350px; width: 90%; border: 1px solid #374151;">
        <div style="margin-bottom: 16px;">
          <svg style="width: 48px; height: 48px; color: #f59e0b;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        <h3 style="margin-bottom: 12px; color: #f9fafb; font-size: 18px; font-weight: 600;">Sesi Anda Berakhir</h3>
        <p style="margin-bottom: 20px; color: #d1d5db; font-size: 14px; line-height: 1.5;">Sesi Anda telah berakhir. Anda akan dialihkan ke halaman login.</p>
        <button id="session-expired-ok-btn" style="background: #3b82f6; color: white; border: none; padding: 10px 24px; border-radius: 6px; cursor: pointer; font-weight: 500; transition: background-color 0.2s;">
          Mengerti
        </button>
      </div>
    `;
    
    // Tambahkan styles
    const style = document.createElement('style');
    style.textContent = `
      #session-expired-ok-btn:hover {
        background: #2563eb !important;
      }
      #session-expired-ok-btn:focus {
        outline: 2px solid #93c5fd;
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(style);
    
    // Tambahkan event listener untuk button
    const button = modal.querySelector('#session-expired-ok-btn');
    const handleClick = () => {
      if (document.body.contains(modal)) {
        document.body.removeChild(modal);
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
      resolve(); // Resolve promise ketika user klik button
    };
    
    button?.addEventListener('click', handleClick);
    
    // Blokir interaksi dengan background
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
    
    // Tambahkan modal ke body
    document.body.appendChild(modal);
    
    // Focus pada button untuk accessibility
    setTimeout(() => {
      (button as HTMLButtonElement)?.focus();
    }, 100);
    
    // Set timeout untuk auto close setelah 15 detik (fallback)
    setTimeout(() => {
      if (document.body.contains(modal)) {
        document.body.removeChild(modal);
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
      resolve(); // Juga resolve setelah timeout
    }, 15000);
  });
}

function logout() {
  // Hapus semua item localStorage terkait auth
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("REFRESH_TOKEN");
  localStorage.removeItem("USER");
  localStorage.removeItem("USER_EMAIL");
  
  // Redirect ke halaman login
  if (window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
}

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

function isTokenExpired(token: string) : boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000; // Convert to milliseconds
    return Date.now() >= exp;
  } catch {
    return true; // If there's an error decoding, assume the token is invalid/expired
  }

}

async function parseResponse(res: Response) {
  const text = await res.text();
  if (!text) return null;
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(text || "Unknown response");
  }
  if (json && typeof json === "object" && "data" in json) {
    return json.data;
  }
  return json;
}

export async function apiClient(
  endpoint: string,
  method: RequestMethod = "GET",
  body?: any,
  extraHeaders: Record<string, string> = {}
) {
  const url = `${BASE_URL}${endpoint}`;
  const accessToken = localStorage.getItem("ACCESS_TOKEN");

  // cek token expired
  if (accessToken && isTokenExpired(accessToken)) {
    await showSessionExpiredAlert();
    throw new Error("Session expired. Please log in again.");
  }

  const headers: Record<string, string> = {
    ...extraHeaders,
  };

  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body:
      body instanceof FormData
        ? body
        : body
        ? JSON.stringify(body)
        : undefined,
  });

  if (res.status === 401) {
    await showSessionExpiredAlert();
    logout();
    throw new Error("Unauthorized. Please log in again.");
  }

  const data = await parseResponse(res);

  if (!res.ok) {
    const message =
      (data && (data.message || data.error || (data as any).reason)) ||
      res.statusText ||
      "API Error";
    throw { response: data || message };
  }
  return data;
}

export default apiClient;
