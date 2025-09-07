// src/pages/VerifyEmail.tsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        return;
      }

      try {
        const response = await fetch("https://api.radarku.online/auths/verify_email", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          throw new Error("Verifikasi gagal");
        }

        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    };

    verifyEmail();
  }, [token]);

  if (status === "loading") return <p>Memverifikasi email...</p>;
  if (status === "success") return <p>Email berhasil diverifikasi! 🎉</p>;
  if (status === "error") return <p>Gagal verifikasi email. Token tidak valid atau sudah kedaluwarsa.</p>;

  return null;
};

export default VerifyEmail;
