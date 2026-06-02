export { default } from "next-auth/middleware";

export const config = {
  // Protege todas las rutas de la app EXCEPTO el /login, las apis públicas, y archivos estáticos
  matcher: ["/((?!login|api|_next/static|_next/image|favicon.ico).*)"],
};
