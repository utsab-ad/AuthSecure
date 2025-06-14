import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { googleAuth } from "@/utils/api";
import { RouteIndex } from "@/helpers/RouteNames.js";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate();

  const responceGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult["code"]);
        navigate(RouteIndex);
        toast.success(result.data.message);
      }
    } catch (error) {
      console.error("Error-Google-code", error);
      toast.error(error.message);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responceGoogle,
    onError: (err) => {
      console.error("Login Error", err);
    },
    flow: "auth-code",
    scope: "openid email profile",
  });

  const [email, setEmail] =useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        email,
        password
      },
    {withCredentials: true}
  );
  toast.success(response.data.message);
  navigate(RouteIndex);
    } catch (error) {
      toast.error(error);
    }

  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login as an Admin
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="w-full">
                <Button
                  onClick={googleLogin}
                  variant="outline"
                  type="button"
                  className="w-full"
                >
                  <FcGoogle /> Google
                  <span className="sr-only">Login with Google</span>
                </Button>
              </div>
            </div>
          </form>
          <div className="relative hidden md:block">
            <img
              src="https://github.com/shadcn.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
