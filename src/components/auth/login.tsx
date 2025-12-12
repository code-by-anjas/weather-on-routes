"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const LoginCard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.signInAnonymously();

    if (error) {
      console.error("Anonymous login failed:", error);
      setLoading(false);
      return;
    }

    // Redirect ke landing page
    router.push("/");
  };

  return (
    <Card className='w-full max-w-sm mx-auto border shadow-sm rounded-xl'>
      <CardHeader>
        <CardTitle className='text-lg font-semibold text-center'>
          Access Demo
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-4'>
        <p className='text-sm text-muted-foreground text-center'>
          Click below to enter demo mode. Your session will be rate-limited for
          fair use.
        </p>

        <Button
          onClick={login}
          disabled={loading}
          className='w-full font-medium py-2'
        >
          {loading ? "Entering..." : "Access Demo"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
