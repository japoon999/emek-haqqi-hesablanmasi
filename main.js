function calculateFamilyAllowance(maritalStatus, numChildren) {
    let familyAllowance = 0;
    if (isMarried(maritalStatus) || unmarried(maritalStatus) || isWidow(maritalStatus)) {
        familyAllowance += 50;
        if (numChildren > 0) {
            familyAllowance += calculateChildAllowance(numChildren);
        }
    }
    return familyAllowance;
}


function isMarried(maritalStatus) {
    return maritalStatus.toLowerCase() === 'evli';
}

function unmarried(maritalStatus) {
    return maritalStatus.toLowerCase() === 'subay';
}

function isWidow(maritalStatus) {
    return maritalStatus.toLowerCase() === 'dul';
}

function calculateChildAllowance(numChildren) {
    switch (numChildren) {
        case 1:
            return 30;
        case 2:
            return 25;
        case 3:
            return 20;
        default:
            return (numChildren - 3) * 15;
    }
}

function calculateTaxRate(grossSalary, isDisabled) {
    let taxRate;
    if (grossSalary <= 1000) {
        taxRate = 0.15;
    } else if (1000 < grossSalary && grossSalary <= 2000) {
        taxRate = 0.2;
    } else if (2000 < grossSalary && grossSalary <= 3000) {
        taxRate = 0.25;
    } else {
        taxRate = 0.3;
    }
    if (isDisabled.toLowerCase() === 'beli') {
        taxRate *= 0.5;
    }
    return taxRate;

}

function calculateIncomeTax(grossSalary, taxRate) {
    return grossSalary * taxRate;
}

function calculateSalary() {
    const grossSalary = parseFloat(prompt("Brüt əmək haqqını daxil edin:"));
    const maritalStatus = prompt("Ailə vəziyyətinizi daxil edin (evli, subay, dul):");
    const numChildren = parseInt(prompt("Uşaq sayını daxil edin:"));
    const isDisabled = prompt("Əlil olub-olmadığınızı daxil edin (beli, xeyir):");

    const familyAllowance = calculateFamilyAllowance(maritalStatus, numChildren);
    const taxRate = calculateTaxRate(grossSalary, isDisabled);
    const incomeTax = calculateIncomeTax(grossSalary, taxRate);

    let totalSalary = grossSalary + familyAllowance;
    let netSalary = totalSalary - incomeTax;

    const denominations = [200, 100, 50, 20, 10, 5, 1];
    const denominationCount = denominations.map(d => {
        const count = Math.floor(netSalary / d);
        netSalary -= count * d;
        return count;
    });

    alert(
        "Ailə müavinəti: " + familyAllowance +
        "\n Uşaq pulu: " + familyAllowance +
        "\n Gəlir vergisi dərəcəsi: " + (taxRate * 100) + "%" +
        "\n Gəlir vergisinin məbləği: " + incomeTax + " AZN" +
        "\n Ümumi əmək haqqı: " + totalSalary + " AZN" +
        "\n Xalis əmək haqqı: " + netSalary + " AZN" +
        "\n* Pul vahidləri:\n" +
        denominations.map((d, index) => `  * ${d} AZN: ${denominationCount[index]} vahid`).join("\n")
    );
}

calculateSalary();






