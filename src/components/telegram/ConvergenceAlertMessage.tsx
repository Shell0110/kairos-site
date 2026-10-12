import type { ConvergenceAlert } from "@/data/sample-alerts";
import { fmt, formatNumber, formatUsdCompact, getDictionary } from "@/i18n";
import { TelegramBubble, formatAlertDate, formatAlertTime, shortAddress } from "./TelegramChat";

const t = getDictionary();

export function ConvergenceAlertMessage({ alert }: { alert: ConvergenceAlert }) {
  const { token } = alert;
  const tl = t.telegram;
  const total = alert.buys.reduce((sum, b) => sum + b.amountSol, 0);

  return (
    <TelegramBubble
      time={formatAlertTime(alert.timestamp)}
      buttons={[tl.links.dexscreener, tl.links.solscan, tl.links.gmgn]}
    >
      <p className="font-semibold">
        🚨{" "}
        {fmt(tl.convergenceTitle, {
          count: alert.buys.length,
          ticker: token.ticker,
          minutes: alert.windowMinutes,
        })}
      </p>

      <p className="mt-2">
        🪙 <span className="font-semibold">{token.name}</span> <span className="text-tg-link">${token.ticker}</span>
      </p>
      <p className="break-all font-mono text-[12px] text-base-content/60">
        {tl.contract} : {token.mint}
      </p>

      <ol className="mt-2 space-y-1">
        {alert.buys.map((buy, i) => (
          <li key={buy.address} className="flex flex-wrap items-baseline gap-x-1.5">
            <span className="text-base-content/60">{i + 1}.</span>
            <span className="font-semibold">{buy.label}</span>
            <span className="text-[12px] text-base-content/60">{shortAddress(buy.address)}</span>
            <span className="text-success">{formatNumber(buy.amountSol)} SOL</span>
            <span className="text-[12px] text-base-content/60">
              · {buy.minutesAgo === 0 ? tl.justNow : fmt(tl.minutesAgo, { m: buy.minutesAgo })}
            </span>
          </li>
        ))}
      </ol>

      <p className="mt-2">
        💰 {tl.totalBought} : <span className="font-semibold text-success">{formatNumber(total)} SOL</span>
      </p>

      <ul className="mt-2 space-y-0.5 text-base-content/85">
        <li>
          📊 {tl.marketCap} : {formatUsdCompact(token.marketCapUsd)}
        </li>
        <li>
          💧 {tl.liquidity} : {formatUsdCompact(token.liquidityUsd)}
        </li>
        <li>
          ⏱️ {tl.age} : {token.age}
        </li>
      </ul>

      <p className="mt-2 text-[12px] text-base-content/60">🕒 {formatAlertDate(alert.timestamp)}</p>
    </TelegramBubble>
  );
}
