"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-background">
      <div className="w-full max-w-md p-8 bg-surface-container rounded-2xl shadow-lg flex flex-col items-center gap-6">
        <div className="w-16 h-16 bg-primary-fixed rounded-full flex items-center justify-center text-on-primary-fixed">
          <span className="material-symbols-outlined text-[32px]">bolt</span>
        </div>
        <div className="text-center">
          <h1 className="text-display-lg font-bold text-on-surface mb-2">FocusFlow</h1>
          <p className="text-body-lg text-on-surface-variant">Inicia sesión para sincronizar tu horario y tareas.</p>
        </div>
        
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full py-3 px-4 flex items-center justify-center gap-3 bg-inverse-surface hover:opacity-90 text-inverse-on-surface rounded-xl font-label-md transition-all active:scale-95"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Continuar con Google
        </button>
      </div>
    </div>
  );
}
