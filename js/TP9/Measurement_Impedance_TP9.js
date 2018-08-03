/* Измерение полного сопротивления К.З.(Zк) */
function Impedance() {

    var rounding = Number(document.getElementById("Impedance_round").value); //Округлять до
    var stolb = 7;
    var strok = 3;
    /* Создаем массив table указанной размерности */
    var table = new Array(strok);
    for (var i = 0; i < table.length; i++) table[i] = new Array(stolb);

    /* Обнуляем table */
    for (var i = 0; i < strok; i++) {
        for (var j = 0; j < stolb; j++) {
            table[i][j] = 0;
        }
    }

    var Uc = Number(document.getElementById("Impedance_Uc").value);
    for (var i = 0; i < strok; i++) {
        table[i][0] = Number(document.getElementById("Impedance_" + i + "_0").value);
        table[i][2] = Number(document.getElementById("Impedance_" + i + "_2").value);
        table[i][1] = Uc * table[i][0]; //U
        table[i][3] = Uc * table[i][2]; //I
    }

    for (var i = 0; i < strok; i++) {
        table[i][4] = table[i][1] / table[i][3];//Zкз
    }
    var Unom = Number(document.getElementById("Unom").value);
    var Uk = Number(document.getElementById("Uk").value);
    var Inom = Number(document.getElementById("Inom").value);
    table[0][5] = (Unom / Math.sqrt(3) * Uk) / (100 * Inom);//Z к.з. расч.
    document.getElementById("Zkb_Answer").innerHTML=(table[0][5]).toFixed(rounding);
    for (var i = 1; i < 3; i++) {
        table[i][5] = table[0][5];//Z к.з. расч.
    }
    console.log(table);

    var ok = 1;
    for (var i = 0; i < strok; i++) {
        table[i][6] = ((table[i][4] - table[i][5]) / table[i][5]) * 100;
        if (Math.abs(table[i][6]) > 3) {
            document.getElementById("Impedance_" + i + "_6").className = "InputBad";
            ok=0;
        }
        else {
            document.getElementById("Impedance_" + i + "_6").className = "InputGood";
        }
    }

    /* ВЫВОД */
    for (var i = 0; i < strok; i++) {
        for (var j = 0; j < stolb; j++) {
            if ((j == 0) || (j == 2)) {
                continue;//не выводим данные, которые ввел пользователь
            }
            document.getElementById("Impedance_" + i + "_" + j).value = (table[i][j]).toFixed(rounding);
        }
    }

     if (ok>0) {
     document.getElementById("Impedance_Warning").className = "warningGood";
     document.getElementById("Impedance_Warning").innerHTML = "«Объём и нормы испытаний электрооборудования» &#9786;";
     } else {
     document.getElementById("Impedance_Warning").className = "warningBad";
     document.getElementById("Impedance_Warning").innerHTML = "ВНИМАНИЕ! &#9785; Согласно «Объём и нормы испытаний электрооборудования»  Zк не должно превышать исходные значения более чем на 3%.";
     }

}