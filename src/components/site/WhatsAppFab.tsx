import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <motion.a
      href="https://wa.me/919752258759?text=Hi%20Redwood%20Biotech%2C%20I'd%20like%20to%20learn%20more."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-600 text-white shadow-lg shadow-green-900/30"
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
      whileHover={{ scale: 1.1 }}
    >
      <MessageCircle size={26} />
      <span className="absolute inset-0 rounded-full bg-green-500/40 animate-ping" style={{ animationDuration: "3s" }} />
    </motion.a>
  );
}
