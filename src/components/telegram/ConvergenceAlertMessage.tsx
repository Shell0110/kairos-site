import type { ConvergenceAlert } from "@/data/sample-alerts";
import { fmt, formatNumber, formatUsdCompact, getDictionary } from "@/i18n";
import { Nowrap, TelegramBubble, formatAlertDate, formatAlertTime } from "./TelegramChat";

const t = getDictionary().telegram;

/** Alerte de convergence (≥ 3 wallets smart sur le même token) — format prévu pour le bot en semaine 2. */
export function ConvergenceAlertMessage({ alert }: { alert: ConvergenceAlert }) {
  const { token } = alert;
  const total = alert.buys.reduce((sum, b) => sum + b.amountSol, 0);

  return (
    <TelegramBubble
      time={formatAlertTime(alert.timestamp)}
      buttons={[t.links.dexscreener, t.links.solscan, t.links.gmgn]}
    >
      <p>
        🚨 <b>{t.convergenceTitle}</b> ·{" "}
        {fmt(t.convergenceSubtitle, { count: alert.buys.length, minutes: alert.windowMinutes })}
      </p>
      <p className="mt-2">
        🪙 <b>{token.name}</b> ${token.ticker}
      </p>
      <p className="font-mono text-[10.5px] break-all text-[#007aff]">{token.mint}</p>
      <ol className="mt-2">
        {alert.buys.map((buy, i) => (
          <li key={buy.address}>
            {i + 1}. <b>{buy.label}</b> · {formatNumber(buy.amountSol)} SOL ·{" "}
            <span className="text-black/50">
              {buy.minutesAgo === 0 ? t.justNow : fmt(t.minutesAgo, { m: buy.minutesAgo })}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-2">
        💰 {t.total} : <b>{formatNumber(total)} SOL</b>
      </p>
      <p>
        <Nowrap>
          📊 {t.marketCap} : {formatUsdCompact(token.marketCapUsd)}
        </Nowrap>{" "}
        ·{" "}
        <Nowrap>
          💧 {t.liquidity} : {formatUsdCompact(token.liquidityUsd)}
        </Nowrap>
      </p>
      <p>
        ⏱️ {t.age} : {token.age}
      </p>
      <p className="mt-2">🕒 {formatAlertDate(alert.timestamp)}</p>
    </TelegramBubble>
  );
}
