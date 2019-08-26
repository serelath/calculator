var display, operatorMode, decimalMode;

display = document.querySelector('#display p');
operatorMode = false;
decimalMode = false;

var storeActions = (function() {

    // Where the numbers are stored
    var data = {
        numbers: [],
        currentNum: 0,
        operator: [],
        all: []
    }

    return {
  
        // Add the numbers to storage
        addToStorage: function(num) {

            // New Array within data.numbers with added number
            if (operatorMode) {

                operatorMode = false;

                data.currentNum++;
                data.numbers[data.currentNum] = new Array(num.textContent);

                // Compile into data.all
                var reduceCurrentNum = data.numbers[data.currentNum].reduce((a, b) => {return a + b});
                data.all.push(reduceCurrentNum);

            } else {

                // Add numbers before next operator
                if (!data.numbers[data.currentNum]) {
                    data.numbers[data.currentNum] = new Array(num.textContent);

                    // Compile into data.all
                    var reduceCurrentNum = data.numbers[data.currentNum].reduce((a, b) => {return a + b});
                    data.all.push(reduceCurrentNum);
                    console.log(data.numbers);
                    
                } else {
                    data.numbers[data.currentNum].push(num.textContent);

                    // Compile into data.all
                    var reduceCurrentNum = data.numbers[data.currentNum].reduce((a, b) => {return a + b});
                    data.all.pop();
                    data.all.push(reduceCurrentNum);
                }
            }

        },

        // Operators function
        operator: function(op) {

            if (data.operator.length < data.numbers.length) {
                operatorMode = true;

                // Add operator
                if (data.operator.length < data.numbers.length) {
                    if (op.getAttribute('data-operator' === 'sqrt')) {

                    } else {
                        data.operator.push(op.getAttribute('data-operator'));
                    }
                
                // Switch Operator
                } else if (data.operator.length = data.numbers.length) {
                    data.operator[data.operator.length - 1] = op.getAttribute('data-operator');
                }

                // Compile into data.all
                data.all.push(data.operator[data.operator.length - 1]);

            }

        },

        // Display the numbers & operators
        display: function() {
            var showData = "";

            // Sift through & separate numbers & operators
            if (data.numbers.length > 0 ) {

                showData = "";

                for (var i = 0 ; i < data.numbers.length ; i++) {
                for (var e = 0; e < data.numbers[i].length; e++) {
                    showData += data.numbers[i][e];
                }
                
                // Visual operator display
                switch(data.operator[i]) {
                    case "+":
                        showData += " + ";
                        break;
                    case "-":
                        showData += " - ";
                        break;
                    case "*":
                        showData += " x ";
                        break;
                    case "/":
                        showData += " ÷ ";
                        break;
                    }
                }
                return showData;
            } else {
                return "0";
            }

            
        },

        // Clear number
        clear: function() {
            if (data.all[data.all.length - 1] === 1 || data.all.length % 2 === 1) {

                    data.numbers.pop();
                    data.all.pop();

                    if (data.currentNum > 0) {
                        data.currentNum--;
                    }

            } else {
                data.operator.pop();
                data.all.pop();
            }

            display.innerHTML = this.display();
        },

        // Calculate Numbers
        calculate: function() {
            var addUp = "";

            for (var i = 0; i < data.all.length; i++) {
                for (var e = 0; e < data.all[i].length; e++) {
                    addUp += data.all[i][e];
                }
            }

            data.numbers = [eval(addUp)];
            data.all = [eval(addUp)];
            data.currentNum = 0;
            this.display();
        },

        returnNum: function() {
            return data.numbers;
        }

    }

})();


// Control actions here
var controller = (function() {

    // Activation area
    var actions = function() {
        var numbers = document.querySelectorAll('.numbers');
        numbers.forEach(num => num.addEventListener('click', clickNum));

        var operators = document.querySelectorAll('.operators div p');
        operators.forEach(op => op.addEventListener('click', operator));

        var clearBtn = document.querySelector('#clear');
        clearBtn.addEventListener('click', clearNum);

        var calculateAmt = document.querySelector('#enter');
        calculateAmt.addEventListener('click', calculate);

    }

    // When a NUMBER is clicked
    function clickNum() {
        storeActions.addToStorage(this);
        display.innerHTML = storeActions.display();

    }

    // When an OPERATOR is clicked
    function operator() {

        storeActions.operator(this);
        if (storeActions.returnNum() !== 0) {
            display.innerHTML = storeActions.display();
        }
        
    }

    // Clear
    function clearNum() {
        storeActions.clear();
    }

    // Calculate Amount
    function calculate() {
        storeActions.calculate();
    }
    
    return {
        init: function() {
            actions();
        }
    }

})();

controller.init();