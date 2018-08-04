/* Измерение полного сопротивления К.З.(Zк) */
function Impedance() {
    var rounding = Number(document.getElementById("Impedance_round").value); //Округлять до

    var element = document.getElementById("DivisionsOnOf");

    if (element.checked) {
        var Uc = Number(document.getElementById("Impedance_Uc").value);
        var Ic = Number(document.getElementById("Impedance_Ic").value);
        for (var i = 0; i < 6; i++) {
            var Divisions_U = Number(document.getElementById("Divisions_U_" + i).value);
            var Divisions_I = Number(document.getElementById("Divisions_I_" + i).value);
            document.getElementById("Impedance_" + i + "_0").value = (Uc * Divisions_U).toFixed(rounding);
            document.getElementById("Impedance_" + i + "_1").value = (Ic * Divisions_I).toFixed(rounding);
        }
    }


    for (var i = 0; i < 6; i++) {
        var U = Number(document.getElementById("Impedance_" + i + "_0").value);
        var I = Number(document.getElementById("Impedance_" + i + "_1").value);
        document.getElementById("Impedance_" + i + "_2").value = Number(U / I).toFixed(rounding);
    }

    for (var i = 1; i < 3; i++) {
        var Unom = Number(document.getElementById("Unom" + i).value);
        var Uk = Number(document.getElementById("Uк" + i).value);
        var Inom = Number(document.getElementById("Inom" + i).value);
        var Answer = (Unom / Math.sqrt(3) * Uk) / (100 * Inom);
        document.getElementById("Zkb_Answer" + i).innerHTML = Answer.toFixed(rounding);
        document.getElementById("Impedance_Zkb_Answer" + i).value = Answer.toFixed(rounding);
    }
    var ok = 1;
    for (var i = 0; i < 6; i++) {

        var Zk = Number(document.getElementById("Impedance_" + i + "_2").value);
        var Zkb = Number(document.getElementById("Impedance_Zkb_Answer1").value);
        if (i > 2) {
            Zkb = Number(document.getElementById("Impedance_Zkb_Answer2").value);
        }
        var DeltaZk = ((Zk - Zkb) / Zkb) * 100;
        document.getElementById("Impedance_" + i + "_3").value = DeltaZk.toFixed(rounding);


        if (Math.abs(DeltaZk) > 3) {
            document.getElementById("Impedance_" + i + "_3").className = "InputBad";
            ok = 0;

        }
        else {
            document.getElementById("Impedance_" + i + "_3").className = "InputGood";
        }
    }
    if (ok > 0) {
        document.getElementById("Impedance_Warning").className = "warningGood";
        document.getElementById("Impedance_Warning").innerHTML = "«Объём и нормы испытаний электрооборудования» &#9786;";
    } else {
        document.getElementById("Impedance_Warning").className = "warningBad";
        document.getElementById("Impedance_Warning").innerHTML = "ВНИМАНИЕ! &#9785; Согласно «Объём и нормы испытаний электрооборудования»  Zк не должно превышать исходные значения более чем на 3%.";
    }


}

function DivisionsOnOf() {
    // document.getElementById("Impedance_0_0").setAttribute("readonly", true);


    var element = document.getElementById("DivisionsOnOf");

    if (element.checked) {
        for (var i = 0; i < 6; i++) {
            document.getElementById("Divisions_U_" + i).removeAttribute("readonly");
            document.getElementById("Divisions_U_" + i).removeAttribute("class");
            document.getElementById("Impedance_Uc").removeAttribute("class");
            document.getElementById("Impedance_" + i + "_0").setAttribute("readonly", true);
            document.getElementById("Impedance_" + i + "_0").className = "answer";

            document.getElementById("Divisions_I_" + i).removeAttribute("readonly");
            document.getElementById("Divisions_I_" + i).removeAttribute("class");
            document.getElementById("Impedance_Ic").removeAttribute("class");
            document.getElementById("Impedance_" + i + "_1").setAttribute("readonly", true);
            document.getElementById("Impedance_" + i + "_1").className = "answer";


        }
    }
    else {
        for (var i = 0; i < 6; i++) {
            document.getElementById("Divisions_U_" + i).setAttribute("readonly", true);
            document.getElementById("Divisions_U_" + i).className = "OFF";
            document.getElementById("Impedance_Uc").className = "OFF";
            document.getElementById("Impedance_" + i + "_0").removeAttribute("readonly");
            document.getElementById("Impedance_" + i + "_0").removeAttribute("class");

            document.getElementById("Divisions_I_" + i).setAttribute("readonly", true);
            document.getElementById("Divisions_I_" + i).className = "OFF";
            document.getElementById("Impedance_Ic").className = "OFF";
            document.getElementById("Impedance_" + i + "_1").removeAttribute("readonly");
            document.getElementById("Impedance_" + i + "_1").removeAttribute("class");

        }

    }


}
