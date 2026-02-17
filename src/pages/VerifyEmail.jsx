import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Mail } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const verifyEmail = () => {
    axios.post(
      `${API_URL}/users/verify`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  };

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail();
        setStatus("✅ Verification successful");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        console.log(error);
        setStatus("❌ Verification failed, Please try again");
      }
    };

    verify();
  }, [token]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl text-center">
        <CardHeader className="space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-7 w-7 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">{status}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
