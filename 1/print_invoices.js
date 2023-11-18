import invoice from "./data/invoices.json" assert { type: "json" };
import plays from "./data/plays.json" assert { type: "json" };
export default function statement(invoice, plays) {
    let totalAmount = 0;
    let result = `Statement for ${invoice[0].customer}\n`

    // console.log(plays[invoice[0].performances[0].playID]) // { name: "Hamlet", type: "tragedy" }
    // console.log(invoice[0]["performances"])
    for (let perf of invoice[0].performances) {
        // console.log(plays[perf["playID"]])
        result += `${playFor(perf).name}: ${usd(amountFor(perf)/100)} (${perf.audience} seats)\n`;
        totalAmount += amountFor(perf);
    }

    result += `Amount owed is ${usd(totalAmount/100)}\n`;
    result += `You earned ${totalVolumeCredits()} credits\n`;
    return result;
}

function amountFor(aPerformance) {
    let result = 0;
    switch (playFor(aPerformance).type) {
        case "tragedy":
            result = 40000;
            if (aPerformance.audience > 30) {
                result += 1000 * (aPerformance.audience - 30);
            }
            break;
        case "comedy":
            result = 30000;
            if (aPerformance.audience > 20) {
                result += 10000 + 500 * (aPerformance.audience - 20);
            }
            result += 300 * aPerformance.audience;
            break;
        default:
            throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }
    return result;
}

function playFor(aPerformance) {
    return plays[aPerformance.playID];
}

function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5);
    return result;
}

function usd(aNumber) {
    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }
    ).format(aNumber);
}

function totalVolumeCredits() {
    let volumeCredits = 0;
    for (let perf of invoice[0].performances) {
        volumeCredits += volumeCreditsFor(perf);
    }
    return volumeCredits;
}