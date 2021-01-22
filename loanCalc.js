export default class LoanCalc {
    
    constructor() {
        this.form       = document.querySelector("#loan-form");
        
        this.amount     = document.querySelector("#amount");
        this.interest   = document.querySelector("#annInterest");
        this.years      = document.querySelector("#repYear");
        
        this.totalPayment  = document.querySelector("#totalPayment");
        this.montlyPayment = document.querySelector("#montylPayment");
        this.totalInterest = document.querySelector("#totalInterest");

        this.output = document.querySelector("#message");
        this.image  = document.querySelector("#loading");
        
        this.errorArray = [];
    }
    
    // When client hit Calculate button, listen for this method
    calculate() {
        
        this.fieldValidation();
        
        if(this.errorArray.length > 0) {
            this.displayError();
        } else {
            this.loadImgWithResults();
        }
        
    }
    
    // Main method, write algorithm for evaluation total interest, total payment, payment per month
    evaluateCalculation() {
        
        let amount = Number(this.amount.value);
        let interest = Number(this.interest.value) / 100 / 12;
        let repYear = Number(this.years.value);
        
        let totalPayment = ((interest * amount) * (repYear * 12)) + amount;
        let totalInterest = (interest * amount) * (repYear * 12);
        let montlyPayment = totalPayment / (repYear * 12);
        
        this.montlyPayment.textContent = montlyPayment.toFixed(2);
        this.totalPayment.textContent = totalPayment.toFixed(2);
        this.totalInterest.textContent = totalInterest.toFixed(2);
        
        this.output.className = "d-block";
        
    }
    
    // Display loading image then hide after 2s, then do calculation
    loadImgWithResults() {
        
        const obj = this;
        const sibling = this.form.nextElementSibling;
        const image = document.createElement("img");
        
        this.output.className = "d-none";
        
        image.className = "d-block mx-auto";
        image.id = "loadingImg";
        image.setAttribute("src", "img/loading.gif");
        
        document.querySelector(".card-body").insertBefore(image, sibling);
        
        setTimeout(function(){
            
            document.querySelector("#loadingImg").remove();
            obj.evaluateCalculation();
            
        }, 2000);
        
    }
    
    // Authenicate all fileds
    fieldValidation() {
        
        if(this.amount.value === "") {
            this.errorArray.push("Amount field is invalid");
        }
        if(this.interest.value === "") {
            this.errorArray.push("Annual Interest field is invalid");
        }
        if(this.years.value === "") {
            this.errorArray.push("Repayment Year field is invalid");
        }
        
    }
    
    // Display error and hide after 3s
    displayError() {
        
        const msg = this.errorArray.join("<br>");
        const card = document.querySelector(".card-body");
        const heading = document.querySelector(".heading");
        const div = document.createElement("div");
        
        div.className = "alert alert-danger";
        div.innerHTML = msg;
        
        this.errorArray       = [];
        this.output.className = "d-none";
        
        card.insertBefore(div, heading);
        
        setTimeout(function(){
            document.querySelector(".alert").remove();
        }, 3000);
        
    }
    
    // Hide results when client press close button
    hideResults() {
        
        this.output.className = "d-none";
        
        this.amount.value = "";
        this.interest.value = "";
        this.years.value = "";
        
    }
    
}