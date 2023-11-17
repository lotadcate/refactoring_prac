import invoice from "./data/invoices.json" assert { type: "json" };
import plays from "./data/plays.json" assert { type: "json" };
import statement from "./print_invoices.js";

console.log(statement(invoice, plays));