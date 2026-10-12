import type { BuyAlert } from "@/data/sample-alerts";
import { formatNumber, formatUsdCompact, getDictionary } from "@/i18n";
import { TelegramBubble, formatAlertDate, formatAlertTime, shortAddress } from "./TelegramChat";

const t = getDictionary();

export function BuyAlertMessage({ alert }: { alert: BuyAlert }) {
  const { wallet, token } = alert;
  const tl = t.telegram;

  return (
    <TelegramBubble
      time={formatAlertTime(alert.timestamp)}
      buttons={[tl.links.dexscreener, tl.links.solscan, tl.links.gmgn]}
    >
      <p className="font-semibold">🟢 {tl.buyTitle}</p>

      <p className="mt-2">
        👛 {tl.wallet} : <span className="font-semibold">{wallet.label}</span>{" "}
        <span className="text-base-content/60">({shortAddress(wallet.address)})</span>
        <span className="badge badge-soft badge-primary badge-xs ml-1.5 font-semibold whitespace-nowrap">
          {tl.tags[wallet.tag]}
        </span>
      </p>

      <p className="mt-2">
        🪙 {tl.token} : <span className="font-semibold">{token.name}</span>{" "}
        <span className="text-tg-link">${token.ticker}</span>
      </p>
      <p className="break-all font-mono text-[12px] text-base-content/60">
        {tl.contract} : {token.mint}
      </p>

      <p className="mt-2">
        💰 {tl.amount} : <span className="font-semibold text-success">{formatNumber(alert.amountSol)} SOL</span>{" "}
        <span className="text-base-content/60">(~{formatNumber(alert.amountUsd, 0)} $)</span>
      </p>
      <p>
        🎯 {tl.price} : {alert.priceUsd} $
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
        <li>
          📈 {tl.volume24h} : {formatUsdCompact(token.volume24hUsd)}
        </li>
      </ul>

      <p className="mt-2 text-[12px] text-base-content/60">🕒 {formatAlertDate(alert.timestamp)}</p>
    </TelegramBubble>
  );
}
