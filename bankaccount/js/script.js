// DOM helper

const $ = (selector) => {
    return document.querySelector(selector);
}


let name;
let currentAccount;         // Represents the current account being accessed. Changes when a new user name is entered.
let userAccounts = [];      // Will be an array that stores each owner and their account object


const bankAccount = function(ownerName) {       // @@Need to review this entire assignment - was very confused as to how to build this, as well as where/how to use closures.
    let balance = 0, owner = ownerName;     // Assume everyone starts with $0 in their account.

    return {
        withdraw: function(withdrawalAmount) {
            balance -= withdrawalAmount;
            $("#output").innerText = `${this.getOwnerName()} now has a balance of ${this.getBalance().toFixed(2)}.`;
        },
        deposit: function(depositAmount) {
            balance += depositAmount;
            $("#output").innerText = `${this.getOwnerName()} now has a balance of ${this.getBalance().toFixed(2)}.`;
        },
        getBalance: function() {
            return balance;
        },
        getOwnerName: function() {
            return owner;
        }
    }
}


$("#btn-name").addEventListener('click', (e) => {
    e.preventDefault();
    name = prompt("Enter your name:");

    // Create a one-dimensional array of just user names to search for a match
    let temp = [];
    for (acct of userAccounts) {
        temp.push(acct[0]);
    }

    // Check if user name has already been created or not
    if (temp.indexOf(name) != -1) {
        currentAccount = userAccounts[temp.indexOf(name)][1];
    } else {
        currentAccount = bankAccount(name);
        // if a new user, store the user's name and bankAccount object in the userAccounts array
        userAccounts.push([name, currentAccount]);
    }

    $("#output").innerText = `Hello ${currentAccount.getOwnerName()}. Your balance is $${currentAccount.getBalance()}.`;
});

$("#btn-deposit").addEventListener('click', (e) => {
    e.preventDefault();
    let amount;
    let valid = false;
    do {
        amount = Number(prompt("Enter how much you want to deposit:"));
        if (isNaN(amount)) {
            alert("Please enter a valid dollar amount.");
        } else if (amount < 0) {
            alert("Amount to deposit cannot be negative.");
        } else {
            valid = true;
        }
    } while (isNaN(amount) || !valid);
    currentAccount.deposit(amount);
});

$("#btn-withdrawal").addEventListener('click', (e) => {
    e.preventDefault();
    let amount;
    let valid = false;    
    do {
        amount = Number(prompt("Enter how much you want to withdraw:"));
        if (isNaN(amount)) {
            alert("Please enter a valid dollar amount.");
        } else if (currentAccount.getBalance() - amount < 0) {
            alert("You may not withdraw more than what you have in your account.");
        } else {
            valid = true;
        }
    } while (isNaN(amount) || !valid);
    currentAccount.withdraw(amount);
});


