import { Link } from "@tanstack/react-router";
import logo from "../../assets/rw-logo2.webp";
import {
  CONTACT,
  isFilled,
  LEGAL_DISCLAIMER,
  LOCATIONS,
  whatsappHref,
} from "@/components/home/content";
import { Icon, track, WhatsAppGlyph } from "@/components/home/ui";

const LINKS = [
  ["/about", "About"],
  ["/agroforestry", "Agroforestry"],
  ["/investment", "Investment"],
  ["/gallery", "Gallery"],
  ["/faq", "FAQ"],
  ["/privacy", "Privacy policy"],
  ["/terms", "Terms"],
  ["/disclaimer", "Disclaimer"],
] as const;

/** Site footer: light, on paper. Contact, locations, links and the legal line. */
export function Footer() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Redwood Biotech",
    slogan: "One land. Two growths.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "260, Anurag Villa, 52 Bigha, Opposite Ocean Motors, Limbodi, Khandwa Road",
      addressLocality: "Indore",
      addressRegion: "Madhya Pradesh",
      addressCountry: "IN",
    },
    // Phone and email join the structured data once Redwood supplies them.
    ...(isFilled(CONTACT.phone) ? { telephone: CONTACT.phone } : {}),
    ...(isFilled(CONTACT.email) ? { email: CONTACT.email } : {}),
  };
  const sites = LOCATIONS.filter(isFilled);

  return (
    <footer className="rwh rwh-footer">
      <div className="rwh-wrap rwh-footer__grid">
        <div className="rwh-footer__brand">
          <img src={logo} alt="Redwood Biotech" width={1080} height={256} loading="lazy" />
          <p className="rwh-footer__motto">
            One land. <em>Two growths.</em>
          </p>
        </div>

        <div>
          <h2 className="rwh-footer__h">Contact</h2>
          <ul className="rwh-footer__list rwh-footer__contact">
            <li>
              <a
                className="rwh-footer__row"
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { location: "footer" })}
              >
                <WhatsAppGlyph size={18} />
                <span>WhatsApp</span>
              </a>
            </li>
            <li>
              <span className="rwh-footer__row rwh-footer__row--addr">
                <Icon name="pin" size={18} />
                <span>{CONTACT.address}</span>
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="rwh-footer__h">Locations</h2>
          {sites.length ? (
            <ul className="rwh-footer__list">
              {sites.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          ) : null}
          <span className="rwh-tag rwh-footer__soon">NEW LOCATIONS COMING SOON</span>
        </div>

        <nav aria-label="Footer">
          <h2 className="rwh-footer__h">Links</h2>
          <ul className="rwh-footer__list rwh-footer__links">
            {LINKS.map(([to, label]) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="rwh-footer__bar">
        <div className="rwh-wrap rwh-footer__bar-in">
          <span>© {new Date().getFullYear()} Redwood Biotech. All rights reserved.</span>
          {isFilled(LEGAL_DISCLAIMER) ? (
            <span className="rwh-footer__legal">{LEGAL_DISCLAIMER}</span>
          ) : null}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
    </footer>
  );
}
