//================================================================================
//  Initiate field variables
//================================================================================

let salary = 0;     // initial salary
const wage = 100;   // hourly wage


//================================================================================
//  Get html elements
//================================================================================

const salaryElement = document.getElementById("salary");
updateNOK(salaryElement, salary); // Display initial salary
const btnRepayLoan = document.getElementById("btnRepayLoan");
btnRepayLoan.style.visibility="hidden"; // Repay loan button invisible while loan at 0 kr


//================================================================================
//  Define functions
//================================================================================

/**
 * Function executed when 'Work' button is pressed
 */
function work() {
    salary += wage;
    updateNOK(salaryElement, salary);
}

/**
 * Function excecuted when 'Repay Loan' button is pressed
 */
function repayLoan() {
    // Subtract salary from loan if salary does not exceed loan
    if (salary <= loan) {
        loan -= salary;
        updateOutstandingLoan();
        salary = 0;
        updateNOK(salaryElement, salary);
    } 
    // Otherwise, remove loan and add remainder of salary to balance
    else {
        salary -= loan;
        loan = 0;
        updateOutstandingLoan();
        balance += salary;
        updateNOK(balanceElement, balance);
        salary = 0;
        updateNOK(salaryElement, salary);
    }
}

/**
 * Function excecuted when 'Bank' button is pressed
 */
function bank() {
    // Add 10% of salary to loan if loan exists
    if (loan > 0) {
        loanConvertion = 0.1 * salary;
        salary -= loanConvertion;
        loan += loanConvertion;
        updateOutstandingLoan();
    } 
    // Add salary to balance
    balance += salary;
    updateNOK(balanceElement, balance);
    salary = 0;
    updateNOK(salaryElement, salary);
}