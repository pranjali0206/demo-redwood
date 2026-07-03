import { createFileRoute } from "@tanstack/react-router";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";

function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      lastUpdated="Last Updated: July 3, 2026"
      intro="Welcome to Redwood Biotech. By accessing or using this website, you agree to comply with and be bound by the following Terms & Conditions. Please read them carefully before using our website or investing in any of our projects."
    >
      <LegalSection heading="1. Acceptance of Terms">
        <p>
          By accessing this website, submitting your information, or purchasing any Redwood
          Biotech product or investment plan, you acknowledge that you have read, understood,
          and agreed to these Terms & Conditions.
        </p>
      </LegalSection>

      <LegalSection heading="2. About Redwood Biotech">
        <p>
          Redwood Biotech develops integrated land ownership and managed agroforestry projects.
          Depending on the selected plan, investors receive ownership of a legally transferable
          land parcel through a registered sale deed and may also receive professional
          plantation management services for genetically improved teak (Sagwan) or other
          approved species.
        </p>
      </LegalSection>

      <LegalSection heading="3. Nature of Investment">
        <p>
          The value of land and timber depends on numerous factors, including market
          conditions, infrastructure development, government policies, environmental
          conditions, and demand. Any illustrations, projections, or examples shown on this
          website are for informational purposes only and should not be interpreted as
          guaranteed returns or assured appreciation.
        </p>
      </LegalSection>

      <LegalSection heading="4. Land Ownership">
        <p>
          Where applicable, ownership of the land is transferred through a legally registered
          sale deed executed in accordance with applicable laws. Investors are advised to
          independently verify all relevant documents before registration.
        </p>
      </LegalSection>

      <LegalSection heading="5. Plantation Management">
        <p>
          Redwood Biotech shall undertake plantation and maintenance activities as specified in
          the applicable agreement. Maintenance may include plantation, irrigation,
          fertilization, pest management, monitoring, and other activities considered necessary
          for healthy plantation growth.
        </p>
        <p>
          Natural factors such as weather, drought, floods, pests, diseases, fire, or other
          events beyond reasonable control may affect plantation performance.
        </p>
      </LegalSection>

      <LegalSection heading="6. No Guaranteed Returns">
        <p>
          Redwood Biotech does not guarantee fixed financial returns, appreciation in land
          value, timber yield, harvesting value, or resale price. All investments carry
          inherent risks.
        </p>
      </LegalSection>

      <LegalSection heading="7. Growth Projections">
        <p>
          Any growth charts, financial illustrations, estimated timelines, or appreciation
          scenarios presented on this website are indicative only and should not be considered
          commitments or guarantees.
        </p>
      </LegalSection>

      <LegalSection heading="8. Investor Responsibilities">
        <p>
          Investors are responsible for providing accurate personal information, completing
          documentation, complying with applicable laws, making payments as agreed, and
          maintaining updated contact details.
        </p>
      </LegalSection>

      <LegalSection heading="9. Payments">
        <p>
          All payments shall be made through approved banking channels. Ownership transfer,
          plantation activities, and other services shall commence according to the applicable
          payment schedule and agreement.
        </p>
      </LegalSection>

      <LegalSection heading="10. Taxes & Government Charges">
        <p>
          Applicable stamp duty, registration charges, taxes, government fees, and statutory
          levies shall be borne by the investor unless specifically stated otherwise in the
          agreement.
        </p>
      </LegalSection>

      <LegalSection heading="11. Cancellation & Refund">
        <p>
          Cancellation, refund, or transfer requests shall be governed exclusively by the terms
          contained in the individual purchase agreement executed with the investor.
        </p>
      </LegalSection>

      <LegalSection heading="12. Force Majeure">
        <p>
          Redwood Biotech shall not be liable for delays or failure in performance caused by
          circumstances beyond its reasonable control, including natural disasters, pandemics,
          government restrictions, war, civil disturbances, labor disputes, or similar events.
        </p>
      </LegalSection>

      <LegalSection heading="13. Intellectual Property">
        <p>
          All website content, including text, graphics, logos, photographs, videos, designs,
          trademarks, and other materials, is the property of Redwood Biotech unless otherwise
          stated. Unauthorized reproduction or distribution is prohibited.
        </p>
      </LegalSection>

      <LegalSection heading="14. Privacy">
        <p>
          Personal information collected through this website shall be processed in accordance
          with Redwood Biotech's Privacy Policy and applicable data protection laws.
        </p>
      </LegalSection>

      <LegalSection heading="15. Third-Party Information">
        <p>
          This website may contain references to third-party information, government policies,
          scientific research, or market data. Redwood Biotech does not guarantee the
          completeness or continued accuracy of such information.
        </p>
      </LegalSection>

      <LegalSection heading="16. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, Redwood Biotech shall not be liable for any
          indirect, incidental, consequential, or special damages arising from the use of this
          website or participation in any investment plan.
        </p>
      </LegalSection>

      <LegalSection heading="17. Governing Law">
        <p>
          These Terms & Conditions shall be governed by the laws of India. Any disputes shall
          be subject to the exclusive jurisdiction of the competent courts where Redwood
          Biotech's registered office is located, unless otherwise agreed in writing.
        </p>
      </LegalSection>

      <LegalSection heading="18. Amendments">
        <p>
          Redwood Biotech reserves the right to modify these Terms & Conditions at any time.
          Updated versions will be published on this website and become effective upon
          publication.
        </p>
      </LegalSection>

      <LegalSection heading="19. Contact">
        <p>
          For any questions regarding these Terms & Conditions, investors may contact Redwood
          Biotech through the contact details provided on the official website.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Redwood Biotech" },
      {
        name: "description",
        content:
          "Terms and conditions governing the use of the Redwood Biotech website and investment plans.",
      },
    ],
  }),
  component: TermsPage,
});