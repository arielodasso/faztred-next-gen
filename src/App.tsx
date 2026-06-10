import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";

import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { Toaster } from "@/components/ui/sonner";
import { CalendarModal } from "@/components/site/CalendarModal";

import HomePage from "@/routes/index";
import ServiciosPage from "@/routes/servicios";
import ProductosPage from "@/routes/productos";
import ProyectosPage from "@/routes/proyectos";
import ContactoPage from "@/routes/contacto";
import AutomatizacionIndustrialPage from "@/routes/automatizacion-industrial";
import TablerosPage from "@/routes/tableros-electricos-industriales";
import LoginPage from "@/routes/login";
import ForgotPage from "@/routes/forgot-password";
import ResetPage from "@/routes/reset-password";
import GraciasPage from "@/routes/gracias";

import AdminLayout from "@/routes/admin";
import AdminDashboard from "@/routes/admin.index";
import AdminUsuarios from "@/routes/admin.usuarios";
import AdminClientes from "@/routes/admin.clientes";
import AdminProyectos from "@/routes/admin.proyectos";
import AdminEncabezados from "@/routes/admin.encabezados";
import AdminFormularios from "@/routes/admin.formularios";
import AdminPopup from "@/routes/admin.popup";
import AdminConfianza from "@/routes/admin.confianza";
import AdminConfiguracion from "@/routes/admin.configuracion";
import AdminGtm from "@/routes/admin.gtm";
import AdminAdjuntos from "@/routes/admin.adjuntos";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página no encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La página que buscás no existe o fue movida.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground uppercase tracking-wider hover:bg-primary/90 transition-colors"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

function ScrollToHashOrTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const authPaths = ["/login", "/forgot-password", "/reset-password"];
  const isChrome = !authPaths.includes(pathname) && !pathname.startsWith("/admin");

  return (
    <>
      <ScrollToHashOrTop />
      {isChrome && <Navbar />}
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/proyectos" element={<ProyectosPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/gracias" element={<GraciasPage />} />
          <Route path="/automatizacion-industrial" element={<AutomatizacionIndustrialPage />} />
          <Route path="/tableros-electricos-industriales" element={<TablerosPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPage />} />
          <Route path="/reset-password" element={<ResetPage />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="usuarios" element={<AdminUsuarios />} />
            <Route path="clientes" element={<AdminClientes />} />
            <Route path="proyectos" element={<AdminProyectos />} />
            <Route path="encabezados" element={<AdminEncabezados />} />
            <Route path="formularios" element={<AdminFormularios />} />
            <Route path="popup" element={<AdminPopup />} />
            <Route path="confianza" element={<AdminConfianza />} />
            <Route path="configuracion" element={<AdminConfiguracion />} />
            <Route path="gtm" element={<AdminGtm />} />
            <Route path="adjuntos" element={<AdminAdjuntos />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {isChrome && <Footer />}
      {isChrome && <WhatsAppFloat />}
      <Toaster position="bottom-left" />
      {isChrome && <CalendarModal />}
    </>
  );
}

// Re-export for convenience
export { Navigate };
