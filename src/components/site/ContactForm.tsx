import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { pushEvent } from "@/lib/analytics";

interface Props {
  variant?: "compact" | "full";
  className?: string;
}

export function ContactForm({ variant = "compact", className }: Props) {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    pushEvent("form_submit", {
      location: "contact_form",
      label: variant,
    });
    setTimeout(() => {
      setLoading(false);
      form.reset();
      toast.success("Mensaje enviado", {
        description: "Te vamos a responder a la brevedad.",
      });
    }, 700);
  };

  const fieldCls =
    "w-full bg-white border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-foreground/50 focus:ring-1 focus:ring-foreground/20 transition-colors";

  return (
    <form onSubmit={onSubmit} className={cn("space-y-4", className)} noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <input required name="name" placeholder="Nombre completo *" className={fieldCls} autoComplete="name" />
        {variant === "full" && (
          <input name="company" placeholder="Empresa (opcional)" className={fieldCls} autoComplete="organization" />
        )}
        <input required name="phone" placeholder="Teléfono *" className={fieldCls} autoComplete="tel" inputMode="tel" />
        <input
          required
          type="email"
          name="email"
          placeholder="Email *"
          autoComplete="email"
          inputMode="email"
          className={cn(fieldCls, variant === "compact" && "md:col-span-2")}
        />
      </div>
      <textarea
        required
        name="message"
        rows={variant === "full" ? 6 : 4}
        placeholder={variant === "full" ? "Contanos sobre tu proyecto *" : "Mensaje *"}
        className={fieldCls}
      />
      <button
        type="submit"
        disabled={loading}
        className="cta-press inline-flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground rounded-md px-7 py-3.5 text-xs font-semibold tracking-[0.15em] uppercase transition-colors"
      >
        <Send className="h-4 w-4" />
        {loading ? "Enviando..." : variant === "full" ? "Enviar consulta" : "Enviar"}
      </button>
    </form>
  );
}
