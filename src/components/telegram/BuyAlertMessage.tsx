import type { BuyAlert } from "@/data/sample-alerts";
import { formatNumber, formatUsdCompact, getDictionary } from "@/i18n";
import { Nowrap, TelegramBubble, formatAlertDate, formatAlertTime } from "./TelegramChat";

const t = getDictionary().telegram;

/** Même contenu et même ordre que les alertes d'achat envoyées par le bot (bot/src/alerts/format.ts). */
export function BuyAlertMessage({ alert }: { alert: BuyAlert }) {
  const { wallet, token } = alert;

  return (
    <TelegramBubble
      time={formatAlertTime(alert.timestamp)}
      buttons={[t.links.dexscreener, t.links.solscan, t.links.gmgn]}
    >
      <p>
        🟢 <b>{t.buyTitle}</b> · <b>{wallet.label}</b> <i>({t.tags[wallet.tag]})</i>
      </p>
      <p className="mt-2">
        🪙 <b>{token.name}</b> ${token.ticker}
      </p>
      <p className="font-mono text-[10.5px] break-all text-[#007aff]">{token.mint}</p>
      <p className="mt-2">
        💰 <b>{formatNumber(alert.amountSol)} SOL</b> (~{formatNumber(alert.amountUsd, 0)} $)
      </p>
      <p>
        🎯 {t.price} : {alert.priceUsd.replace(".", ",")} $
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
        <Nowrap>
          ⏱️ {t.age} : {token.age}
        </Nowrap>{" "}
        ·{" "}
        <Nowrap>
          📈 {t.volume24h} : {formatUsdCompact(token.volume24hUsd)}
        </Nowrap>
      </p>
      <p className="mt-2">🕒 {formatAlertDate(alert.timestamp)}</p>
    </TelegramBubble>
  );
}
