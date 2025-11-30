import { I18nextProvider } from "react-i18next";
import investorI18n from "@/i18n/investor";
import ConversationalInvestmentForm from "@/components/investor/ConversationalInvestmentForm";

const InvestorForm = () => {
  return (
    <I18nextProvider i18n={investorI18n}>
      <ConversationalInvestmentForm />
    </I18nextProvider>
  );
};

export default InvestorForm;
