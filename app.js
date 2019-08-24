var operatorMode, decimalMode;

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

            } else {

                // Add numbers before next operator
                if (!data.numbers[data.currentNum]) {
                    data.numbers[data.currentNum] = new Array(num.textContent);
                } else {
                    data.numbers[data.currentNum].push(num.textContent);
                }
            }

            console.log(data.numbers);

        },

        // Operators function
        operator: function(op) {

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

        },

        // Display the numbers & operators
        display: function() {
            var showData = "";

            // Sift through & separate numbers & operators
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

            console.log(showData);
            return showData;
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

    }

    // When a NUMBER is clicked
    function clickNum() {
        var display = document.querySelector('#display p');

        storeActions.addToStorage(this);

        display.innerHTML = storeActions.display();

    }

    // When an OPERATOR is clicked
    function operator() {
        var display = document.querySelector('#display p');
        
        storeActions.operator(this);

        display.innerHTML = storeActions.display();
    }
    
    

    return {
        init: function() {
            actions();
        }
    }

})();

controller.init();