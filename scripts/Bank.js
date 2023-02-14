//================================================================================
//  Initiate field variables
//================================================================================

let balance = 200;  // initial bank balance
let loan = 0;       // initial loan


//================================================================================
//  Get html elements
//================================================================================

const balanceElement = document.getElementById("balance");
updateNOK(balanceElement, balance); // Display initial balance
const loanElement = document.getElementById("loan");
const loanDisplayElement = document.getElementById("loanDisplay");
loanDisplayElement.style.visibility="hidden";  // Loan invisible while at 0 kr

//================================================================================
//  Define functions
//================================================================================

/**
 * Convert input value to NOK format and sent to html element
 * @param {HTMLElement} element element to display currency value
 * @param {Double} value value to display
 */
function updateNOK(element, value) {
    let balanceWithCurrency = new Intl.NumberFormat(
        'no-NO', 
        { style: 'currency', currency: 'NOK' }
    ).format(value);
    element.innerText = balanceWithCurrency;
}

/**
 * Function executed when 'Get a loan' button is pressed
 */
function takeLoan() {
    if (loan == 0) {
        let potentialLoan = +window.prompt("Insert loan value");
        if (potentialLoan <= balance*2) {
            loan = potentialLoan;
            balance += loan;
            updateNOK(balanceElement, balance);
            updateOutstandingLoan();
        } else {
            alert("Loan value must not exceed double the current balance.");
        }
    } else {
        alert("Previous loan must be fully repaid before another loan can be taken.");
    }
}

/**
 * Updates outstanding loan display to be visible or hidden
 */
function updateOutstandingLoan() {
    updateNOK(loanElement, loan)
    if (loan == 0) {
        loanDisplayElement.style.visibility="hidden"
        btnRepayLoan.style.visibility="hidden"
    } else {
        loanDisplayElement.style.visibility="visible"
        btnRepayLoan.style.visibility="visible"
    }
}

