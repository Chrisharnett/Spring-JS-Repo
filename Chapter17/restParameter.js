// rest parameters allow a variable number of parametes to be added.

const calculateTaxAll = (taxRate, ...subtotals) => {
    let tax = 0;
    for (let subtotal of subtotals) {
        tax += subtotal * taxRate;
    }
    return tax.toFixed;
}

// you can use the spread operator to pass the elements in a array to a variadic function
const rateAndAmounts = [0.074, 100];
const moreAmounts = [200, 400];
const tax5 =calculateTaxAll(...rateAndAmounts, ...moreAmounts, 500)