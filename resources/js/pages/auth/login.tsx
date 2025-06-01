import * as React from "react";
import { LoginImageSection } from "./LoginImageSection";
import { LoginForm } from "./LoginForm";

function Login() {
  return (
    <main className="flex overflow-hidden flex-col bg-zinc-300">
      <div className="flex max-md:flex-col">
        <LoginImageSection />
        <LoginForm />
      </div>
    </main>
  );
}

export default Login;
