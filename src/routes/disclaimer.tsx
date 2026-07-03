import { createFileRoute } from "@tanstack/react-router";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";

function DisclaimerPage() {
  return (
    <LegalPageLayout
      title="Disclaimer"
      lastUpdated="Last Updated: July 3, 2026"
      intro="The information provided on this website is intended for general informational purposes only and should not be construed as financial, legal, tax, or investment advice."
    >
      <LegalSection heading="Investment Risk">
        <p>
          Land values, timber prices, agricultural performance, and investment outcomes are
          influenced by numerous factors, including market conditions, government policies,
          infrastructure development, environmental conditions, and economic circumstances.
          Past performance or illustrative examples should not be considered indicators of
          future results.
        </p>
      </LegalSection>

      <LegalSection heading="No Guaranteed Returns">
        <p>
          Redwood Biotech does not guarantee appreciation in land value, fixed annual returns,
          timber yield, harvesting income, resale value, or investment profitability. Any
          financial projections, growth illustrations, or expected timelines displayed on this
          website are indicative in nature and are presented solely to explain the business
          model.
        </p>
      </LegalSection>

      <LegalSection heading="Plantation Growth">
        <p>
          The growth of teak (Sagwan) trees depends on soil quality, climate, rainfall,
          irrigation, maintenance practices, natural conditions, and other biological factors.
          While Redwood Biotech follows scientific plantation management practices, actual
          growth and harvest outcomes may vary.
        </p>
      </LegalSection>

      <LegalSection heading="Land Appreciation">
        <p>
          Land is selected based on various commercial and developmental considerations.
          However, future appreciation depends on factors beyond Redwood Biotech's control,
          including urban expansion, infrastructure projects, regulatory changes, market
          demand, and government policies. No assurance or guarantee is made regarding future
          property values.
        </p>
      </LegalSection>

      <LegalSection heading="Legal Documentation">
        <p>
          Investors are encouraged to independently review all legal documents, title records,
          approvals, and agreements before completing any transaction. Redwood Biotech
          recommends that investors seek independent legal, financial, and tax advice before
          making investment decisions.
        </p>
      </LegalSection>

      <LegalSection heading="Website Information">
        <p>
          While every effort is made to keep the information on this website accurate and up to
          date, Redwood Biotech makes no representations or warranties regarding the
          completeness, accuracy, reliability, or availability of any content. Information may
          be modified or updated without prior notice.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of Liability">
        <p>
          To the fullest extent permitted by law, Redwood Biotech shall not be liable for any
          direct, indirect, incidental, consequential, or special loss or damage arising from
          reliance on information provided on this website or from participation in any
          investment offered by the company.
        </p>
      </LegalSection>

      <LegalSection>
        <p className="text-stone-400 italic">
          By using this website, you acknowledge that you have read, understood, and agreed to
          this Disclaimer.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — Redwood Biotech" },
      {
        name: "description",
        content:
          "Important disclaimer regarding investment risk and plantation performance for Redwood Biotech projects.",
      },
    ],
  }),
  component: DisclaimerPage,
});