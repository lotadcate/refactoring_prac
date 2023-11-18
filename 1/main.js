import invoice from "./data/invoices.json" assert { type: "json" };
import plays from "./data/plays.json" assert { type: "json" };
import { statement, htmlStatement } from "./print_invoices.js";

console.log(statement(invoice, plays));
console.log(htmlStatement(invoice, plays));