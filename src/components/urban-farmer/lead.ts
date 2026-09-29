// Business WhatsApp number in international format without "+" (e.g. "91XXXXXXXXXX").
// Left empty, wa.me opens WhatsApp and lets the visitor pick the chat.
export const REDWOOD_WHATSAPP_NUMBER = "";

export type UrbanFarmerLead = {
  name: string;
  whatsapp: string;
  city: string;
  email: string;
  interests: string[];
  certificateId: string;
  createdAt: string;
};

const STORAGE_KEY = "rwb:urban-farmer-leads";

// Demo persistence until leads are sent to a CRM / WhatsApp Business API.
export function saveLead(lead: UrbanFarmerLead) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as UrbanFarmerLead[];
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, lead]));
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the flow still works.
  }
}

export function hasSavedLead() {
  try {
    return (JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as unknown[]).length > 0;
  } catch {
    return false;
  }
}

export function leadWhatsAppUrl(lead: UrbanFarmerLead) {
  const text = [
    "Hello Redwood Biotech! I want to become an Urban Farmer.",
    "",
    `Name: ${lead.name}`,
    `WhatsApp: +91 ${lead.whatsapp}`,
    `City: ${lead.city}`,
    lead.email ? `Email: ${lead.email}` : null,
    `Interested in: ${lead.interests.join(", ")}`,
    `Certificate No: ${lead.certificateId}`,
  ]
    .filter((line) => line !== null)
    .join("\n");
  return `https://wa.me/${REDWOOD_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
