import { createFileRoute } from "@tanstack/react-router";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";

function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="Last Updated: July 3, 2026"
      intro={
        <>
          Redwood Biotech ("we", "our", or "us") values your privacy and is committed to
          protecting the personal information you share with us. This Privacy Policy explains
          how we collect, use, disclose, and safeguard your information when you visit our
          website or interact with our services.
        </>
      }
    >
      <LegalSection heading="1. Information We Collect">
        <p>We may collect the following information:</p>
        <ul className="list-disc list-inside space-y-1.5 marker:text-[var(--brand-red)]">
          <li>Name</li>
          <li>Mobile number</li>
          <li>Email address</li>
          <li>Postal address</li>
          <li>City and State</li>
          <li>Investment preferences</li>
          <li>Identification details required for land registration (where applicable)</li>
          <li>Payment-related information (processed through authorized payment channels)</li>
          <li>
            Any information voluntarily submitted through enquiry forms, WhatsApp, phone calls,
            emails, or other communication channels.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="2. How We Use Your Information">
        <p>Your information may be used to:</p>
        <ul className="list-disc list-inside space-y-1.5 marker:text-[var(--brand-red)]">
          <li>Respond to enquiries and provide customer support.</li>
          <li>Process bookings and documentation.</li>
          <li>Facilitate land registration and related legal formalities.</li>
          <li>Manage plantation services.</li>
          <li>Share project updates, offers, newsletters, and important notifications.</li>
          <li>Improve our products, services, and website experience.</li>
          <li>Comply with legal and regulatory requirements.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="3. Information Sharing">
        <p>We do not sell or rent your personal information.</p>
        <p>Your information may be shared only with:</p>
        <ul className="list-disc list-inside space-y-1.5 marker:text-[var(--brand-red)]">
          <li>Government authorities where legally required.</li>
          <li>Registration authorities for land documentation.</li>
          <li>Banking or payment partners.</li>
          <li>Legal, accounting, or compliance professionals.</li>
          <li>
            Trusted service providers assisting in project execution under confidentiality
            obligations.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="4. Data Security">
        <p>
          We implement reasonable administrative, technical, and organizational measures to
          protect your information against unauthorized access, misuse, alteration, or
          disclosure. However, no internet-based system can guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection heading="5. Cookies">
        <p>
          Our website may use cookies and similar technologies to improve website
          functionality, analyze visitor behavior, and enhance user experience. You may manage
          cookie preferences through your browser settings.
        </p>
      </LegalSection>

      <LegalSection heading="6. Marketing Communication">
        <p>
          With your consent, we may send updates regarding projects, plantation progress,
          events, and promotional offers. You may opt out of marketing communications at any
          time.
        </p>
      </LegalSection>

      <LegalSection heading="7. Third-Party Websites">
        <p>
          Our website may contain links to third-party websites. Redwood Biotech is not
          responsible for the privacy practices or content of external websites.
        </p>
      </LegalSection>

      <LegalSection heading="8. Your Rights">
        <p>
          You may request access to, correction of, or deletion of your personal information,
          subject to applicable legal requirements and contractual obligations.
        </p>
      </LegalSection>

      <LegalSection heading="9. Policy Updates">
        <p>
          This Privacy Policy may be updated periodically. Continued use of the website
          constitutes acceptance of the revised policy.
        </p>
      </LegalSection>

      <LegalSection heading="10. Contact Us">
        <p>
          For any privacy-related questions or requests, please contact Redwood Biotech using
          the contact details available on our official website.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Redwood Biotech" },
      {
        name: "description",
        content: "How Redwood Biotech collects, uses, and protects your personal information.",
      },
    ],
  }),
  component: PrivacyPage,
});