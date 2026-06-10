import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowLeft, MessageCircle } from "lucide-react";
import { useDocumentHead } from "@/lib/useDocumentHead";

export default function GraciasPage() {
  useDocumentHead({
    title: "¡Gracias! Recibimos tu mensaje — Faztred",
    description: "Recibimos tu consulta. Te respondemos a la brevedad.",
    robots: "noindex",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-background px-4 py-16">
      <div className="max-w-xl w-full text-center">
        <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">¡Mensaje enviado!</h1>
        <p className="mt-4 text-base text-muted-foreground">
          Gracias por contactarnos. Recibimos tu consulta y te vamos a responder a la brevedad.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-6 py-3 text-xs font-semibold tracking-[0.15em] uppercase transition-colors w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
          <Link
            to="/proyectos"
            className="inline-flex items-center justify-center gap-2 border border-border hover:bg-muted text-foreground rounded-md px-6 py-3 text-xs font-semibold tracking-[0.15em] uppercase transition-colors w-full sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" />
            Ver proyectos
          </Link>
        </div>
      </div>
    </section>
  );
}
