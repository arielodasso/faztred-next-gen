import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

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
    setTimeout(() => {
      setLoading(false);
      form.reset();
      toast.success("Mensaje enviado", {
        description: "Te vamos a responder a la brevedad.",
      });
    }, 700);
  };

  const fieldCls =
    "w-full bg-white border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";

  return (
    <form onSubmit={onSubmit} className={cn("space-y-4", className)}>
      <div className={cn("grid gap-4", variant === "full" ? "md:grid-cols-2" : "md:grid-cols-2")}>
        <input required name="name" placeholder="Nombre completo *" className={fieldCls} />
        {variant === "full" && (
          <input name="company" placeholder="Empresa (opcional)" className={fieldCls} />
        )}
        <input required name="phone" placeholder="Teléfono *" className={fieldCls} />
        <input required type="email" name="email" placeholder="Email *" className={cn(fieldCls, variant === "compact" && "md:col-span-2")} />
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
        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground px-7 py-3.5 text-xs font-semibold tracking-wider uppercase transition-colors"
      >
        <Send className="h-4 w-4" />
        {loading ? "Enviando..." : variant === "full" ? "Enviar consulta" : "Enviar"}
      </button>
    </form>
  );
}
