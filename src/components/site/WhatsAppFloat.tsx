import { MessageCircle } from "lucide-react";

const WA_URL =
  "https://api.whatsapp.com/send/?phone=5491162083230&text=Hola+Faztred,+necesito+más+información.";

export function WhatsAppFloat() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-40 h-16 w-16 md:h-20 md:w-20 rounded-full bg-[#25D366] text-white shadow-xl shadow-black/25 flex items-center justify-center hover:scale-110 transition-transform"
    >
      <MessageCircle className="h-8 w-8 md:h-10 md:w-10" fill="currentColor" />
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
    </a>
  );
}
