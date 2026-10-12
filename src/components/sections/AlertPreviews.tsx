import { Section } from "@/components/ui/Section";
import { TelegramChat, formatAlertTime } from "@/components/telegram/TelegramChat";
import { BuyAlertMessage } from "@/components/telegram/BuyAlertMessage";
import { ConvergenceAlertMessage } from "@/components/telegram/ConvergenceAlertMessage";
import { sampleBuyAlert, sampleConvergenceAlert } from "@/data/sample-alerts";
import { getDictionary } from "@/i18n";

const t = getDictionary();

export function AlertPreview() {
  return (
    <Section
      id="apercu"
      eyebrow={t.alertPreview.eyebrow}
      title={t.alertPreview.title}
      subtitle={t.alertPreview.subtitle}
    >
      <div data-reveal>
        <TelegramChat label={t.alertPreview.sampleBadge} time={formatAlertTime(sampleBuyAlert.timestamp)}>
          <BuyAlertMessage alert={sampleBuyAlert} />
        </TelegramChat>
      </div>
    </Section>
  );
}

export function ConvergencePreview() {
  return (
    <Section
      eyebrow={t.convergencePreview.eyebrow}
      title={t.convergencePreview.title}
      subtitle={t.convergencePreview.subtitle}
      className="bg-base-200/40"
    >
      <div data-reveal>
        <TelegramChat label={t.alertPreview.sampleBadge} time={formatAlertTime(sampleConvergenceAlert.timestamp)}>
          <ConvergenceAlertMessage alert={sampleConvergenceAlert} />
        </TelegramChat>
      </div>
    </Section>
  );
}
