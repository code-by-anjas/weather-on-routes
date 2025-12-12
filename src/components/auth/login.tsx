"use client";

import { supabase } from "@/lib/supabase/client";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const LoginCard = () => {
  const login = async () => {
    const { data, error } = await supabase.auth.signInAnonymously();

    if (error) {
      console.error("Anonymous login failed:", error);
      return;
    }

    console.log("Anonymous session:", data.user);
  };

  return (
    <Card className='w-full max-w-sm mx-auto border shadow-sm rounded-xl'>
      <CardHeader className=''>
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
          className='w-full font-medium py-2 cursor-pointer'
          size='default'
        >
          Access Demo
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
