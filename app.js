import LoanCalc from "/projects/loan/loanCalc.js";

const form      = document.querySelector("#loan-form");
const close     = document.querySelector("#close");

const loan = new LoanCalc();

// CALCULATE AND SHOW RESULTS
form.addEventListener("submit", function(e){
    
    e.preventDefault();
    
    loan.calculate();
    
});

// HIDE RESULTS
close.addEventListener("click", function(e){
   
   loan.hideResults();
    
});