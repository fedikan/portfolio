let startBtn = document.getElementById("start"),
    budgetValue = document.querySelector('.budget-value'),
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.querySelector('.level-value'),
    expensesValue = document.querySelector('.expenses-value'),
    optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
    incomeValue = document.querySelector('.income-value'),
    monthSavingsValue = document.querySelector('.monthsavings-value'),
    yearSavingsValue = document.querySelector('.yearsavings-value'),

    expensesItem = document.querySelectorAll('.expenses-item'),
    optionalExpensesItems = document.querySelectorAll('.optionalexpenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    percentValue = document.getElementById('percent'),
    checkSavings = document.getElementById('savings'),
    incomeItem = document.getElementById('income'),
    sumValue = document.getElementById('sum'),
    yearValue = document.querySelector('.year-value'),
    dayValue = document.querySelector('.day-value'),
    monthValue = document.querySelector('.month-value'),
    appData = {
        started: false,
        expenses: {},
        optionalExpenses: {},
        income: [],
        savings: false,
    },
    buttons = document.querySelectorAll('button');



startBtn.addEventListener('click', function () {

    let time = prompt("Введите дату в формате YYYY-MM-DD");
    let money = +prompt("Ваш бюджет на месяц?");
    let reg = /\d\d\d\d-\d\d-\d\d/;
    let reg1 = /\d\d\d\d-\d\d-\d/;
    let reg2 = /\d\d\d\d-\d-\d/;
    
    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?");
        
    };
    while (!(reg.test(time)) && !(reg1.test(time)) && !(reg2.test(time)) ) {
        time = prompt("Введите дату в формате YYYY-MM-DD");
        yearValue.value = new Date(Date.parse(time)).getFullYear();
        monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
        dayValue.value = new Date(Date.parse(time)).getDate() ;
    };
  
    appData.budget = money;
    appData.date = time;
    console.log(time);
    budgetValue.textContent = money.toFixed();
    

    if (reg.test(time) || reg1.test(time) || reg2.test(time) ) {
        yearValue.value = new Date(Date.parse(time)).getFullYear();
        monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
        dayValue.value = new Date(Date.parse(time)).getDate() ;
    }else{
        yearValue.value = null;
        monthValue.value = null;
        dayValue.value = null;
    }

    // let dateFormation = time.split('-');
    // console.log(dateFormation);
    // yearValue.value  = dateFormation[0];
    // monthValue.value = dateFormation[1];
    // dayValue.value = dateFormation[2];
    
    
    expensesBtn.addEventListener('click', function () {
       
        let sum = 0;
        for (let i = 0; i < expensesItem.length; i++) {
            let reason = expensesItem[i].value,
                price = +expensesItem[++i].value;
            if (typeof (reason) === 'string' && typeof (reason) != null && typeof (price) != null &&
                reason != '' && price != '' && reason.length < 50 && price != undefined && reason!= undefined && +price != NaN) {
                console.log('done');
                appData.expenses[reason] = price;
                sum += +price;
                
            } else {
                i = i - 1;
                break;
            }

        };
        

        appData.expensesSum = sum;
        expensesValue.textContent = appData.expensesSum;

    })

    optionalExpensesBtn.addEventListener('click', function () {
        for (let i = 0; i < optionalExpensesItems.length; i++) {
            let optExp = optionalExpensesItems[i].value;
            appData.optionalExpenses[i] = optExp;
            optionalExpensesValue.textContent += (optExp + " ");
        }
    });

    countBtn.addEventListener('click', function () {
        console.log(appData.expensesSum);
        if (appData.budget != undefined) {
            if (appData.expensesSum != undefined){
            appData.moneyPerDay = ((appData.budget - appData.expensesSum) / 30).toFixed();
            dayBudgetValue.textContent = appData.moneyPerDay;
            if (appData.moneyPerDay < 1500) {
                levelValue.textContent = "Минимальный уровень достатка";
            } else if (appData.moneyPerDay > 1499 && appData.moneyPerDay < 2000) {
                levelValue.textContent = "Средний уровень достатка";
            } else if (appData.moneyPerDay > 1999) {
                levelValue.textContent = "Высокий уровень достатка";
            } else {
                levelValue.textContent = "Ошибка";
            }
        } else{ 
            appData.moneyPerDay = ((appData.budget) / 30).toFixed();
            dayBudgetValue.textContent = appData.moneyPerDay;
            if (appData.moneyPerDay < 1500) {
                levelValue.textContent = "Минимальный уровень достатка";
            } else if (appData.moneyPerDay > 1499 && appData.moneyPerDay < 2000) {
                levelValue.textContent = "Средний уровень достатка";
            } else if (appData.moneyPerDay > 1999) {
                levelValue.textContent = "Высокий уровень достатка";
            } else {
                levelValue.textContent = "Ошибка";
            }
        } 
        }
    });

    incomeItem.addEventListener('input', function () {
        items = incomeItem.value;
        appData.income = items.split(', ');
      });

    incomeItem.addEventListener('change', function () {
        let incomeString='';
        for (let i = 0; i < appData.income.length; i++) {
            incomeString +=  appData.income[i] + ' ';
        }
        incomeValue.textContent = incomeString;
    });

    checkSavings.addEventListener('click', function () {
        if (appData.savings == true) {
            appData.savings = false;
        } else {
            appData.savings = true;
            let sum = +sumValue.value,
            percent = +percentValue.value;
        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1)
        }
    });

    sumValue.addEventListener('input', function () {
        if (appData.savings == true) {
            let sum = +sumValue.value,
                percent = +percentValue.value;
            appData.monthIncome = sum / 100 / 12 * percent;
            appData.yearIncome = sum / 100 * percent;
            monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
        }
    });

    percentValue.addEventListener('input', function () {
        if (appData.savings == true) {
            let sum = +sumValue.value,
                percent = +percentValue.value;
            appData.monthIncome = sum / 100 / 12 * percent;
            appData.yearIncome = sum / 100 * percent;
            monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearSavingsValue.textContent = appData.yearIncome.toFixed(1)
        }
    });

});


for (let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('mouseover',function(){
        buttons[i].classList.add('pressed' );
    });
    buttons[i].addEventListener('mouseout',function(){
        buttons[i].classList.remove('pressed');
    });
}









// appData.chooseExpenses();

// appData.chooseIncome();

// let button = document.querySelectorAll('.but'),
//     link = document.querySelector('a');    
//   // button[0].onclick = function(){
// //     button[0].classList.toggle("red_button");
// // }
// // button[1].onclick = function(){
// //     button[1].classList.toggle("blue_button");
// //  }

// // let test = {
// //     style  : 'great',
// //     stylist : 'me',
// // }
// // console.log(test.__proto__);

//  button.forEach(function(item){
//      item.addEventListener('click', function(event){
//     console.log("Произошло событие  " +  event.type + '. На элементе ' + event.target);
//     let target = event.target;
//     // target.style.position='absolute';
//     target.classList.toggle("blue_button");
//     console.log(target);
//     })
//  });

//  console.log(link);

//  link.addEventListener('click', function(event) {
//     event.preventDefault();
//     console.log("Произошло событие  " +  event.type + '. На элементе ' + event.target);
//  }) 

//  let col = document.querySelectorAll(".col-6");
//     console.log(col);
//  col.forEach(function(item){
//     item.addEventListener('mouseenter' , function(event){
//         let target = event.target;
//         target.classList.toggle('red_button');
//         console.log(target);
//     }) 
//  });