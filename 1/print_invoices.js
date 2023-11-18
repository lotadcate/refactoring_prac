import plays from "./data/plays.json" assert { type: "json" };
export default function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice[0].customer}\n`

    const format = new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }
    ).format;

    // console.log(plays[invoice[0].performances[0].playID]) // { name: "Hamlet", type: "tragedy" }
    // console.log(invoice[0]["performances"])
    for (let perf of invoice[0].performances) {
        // console.log(plays[perf["playID"]])
        let thisAmount = amountFor(perf, playFor(perf));

        volumeCredits += Math.max(perf.audience - 30, 0)
        if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

        result += `${playFor(perf).name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }

    result += `Amount owed is ${format(totalAmount/100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
}

function amountFor(aPerformance, play) {
    let result = 0;
    switch (play.type) {
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
            throw new Error(`unknown type: ${play.type}`);
    }
    return result;
}


function playFor(aPerformance) {
    return plays[aPerformance.playID];
}