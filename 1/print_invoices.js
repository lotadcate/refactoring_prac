import invoice from "./data/invoices.json" assert { type: "json" };
import plays from "./data/plays.json" assert { type: "json" };

import createStatementData from './createStatementData.js';
export function statement(invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data, plays) {
    let result = `Statement for ${data.customer}\n`;

    for (let perf of data.performances) {
        result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
    }

    result += `Amount owed is ${data.totalAmount}\n`;
    result += `You earned ${data.totalVolumeCredits} credits\n`;
    return result;
}
export function htmlStatement (invoice, plays) {
    return renderHtml(createStatementData(invoice, plays));
}

function renderHtml(data) {
    let result = `<h1>Statement for ${data.customer}</h1>\n`;

    result += "<table>\n";
    result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";
    for (let perf of data.performances) {
        result += `<tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
        result += `<td>${usd(perf.amount)}</td></tr>\n`;
    }
    result += "</table>\n";
    result += `<p>Amount owed is ${data.totalAmount}</p>\n`;
    result += `<p>You earned ${data.totalVolumeCredits} credits</p>\n`;
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
    ).format(aNumber/100);
}
