var operatorMode, decimalMode;

operatorMode = false;
decimalMode = false;

var storeActions = (function() {

    var data = {
        numbers: [],
        currentNum: 0,
        operator: [],
        all: []
    }

    return {
  
        addToStorage: function(num) {

            if (operatorMode) {

                operatorMode = false;

                data.currentNum++;
                data.numbers[data.currentNum] = new Array(num.textContent);

            } else {
                if (!data.numbers[data.currentNum]) {
                    data.numbers[data.currentNum] = new Array(num.textContent);
                } else {
                    data.numbers[data.currentNum].push(num.textContent);
                }
            }

            console.log(data.numbers);
            // console.log(currentNum);

        },

        operator: function(op) {

            operatorMode = true;

            if (data.operator.length < data.numbers.length) {
                if (op.getAttribute('data-operator' === 'sqrt')) {

                } else {
                    data.operator.push(op.getAttribute('data-operator'));
                }
            }

        },

        display: function() {
            var showData = "";

            for (var i = 0 ; i < data.numbers.length ; i++) {
                for (var e = 0; e < data.numbers[i].length; e++) {
                    showData += data.numbers[i][e];
                }
                
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



var controller = (function() {

    var actions = function() {
        var numbers = document.querySelectorAll('.numbers');
        numbers.forEach(num => num.addEventListener('click', clickNum));

        var operators = document.querySelectorAll('.operators div p');
        operators.forEach(op => op.addEventListener('click', operator));

    }

    function clickNum() {
        var display = document.querySelector('#display p');

        storeActions.addToStorage(this);

        display.innerHTML = storeActions.display();

    }

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
// 1. Click number: store & display

// 2. Click on operator: display

// 3. Click number: display

// 4. Click equal: operate() & display

// 5. Decimal: Get last number > decimal mode on > push decimal number to storage
//      when operator clicked

// 6. C pop last array number
