"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Result() {
  const router = useRouter();
  
  useEffect(() => {
    const { session_id } = router.query;
    
    // Fetch session details if needed or just display a success message
    if (session_id) {
      // You can fetch session details from your backend or just display a success message
    }
  }, [router.query]);

  return (
    <div>
      <h1>Thank you!</h1>
      <p>Your subscription has been successfully processed.</p>
      <button onClick={() => router.push('/')}>Go to Home</button>
    </div>
  );
}
