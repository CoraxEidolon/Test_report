/* Сопротивление обмоток постоянному току */
function ResistanceDCWindings(strok) {
    var rounding = Number(document.getElementById("winding_round").value); ; //Округлять до
    var K = Number(document.getElementById("coefficient").value);
    var Tizm = Number(document.getElementById("Tizm_BH").value);
    var Tzav = Number(document.getElementById("Tzav_BH").value);
    var ok=1;
    for (var i = 0; i < strok; i++) {
        var Rizm = Number(document.getElementById("winding_" + i + "_0").value);
        var Rzav = Number(document.getElementById("winding_" + i + "_2").value);

        var Rpriv=Rizm*((K+Tzav)/(K+Tizm));
        document.getElementById("winding_" + i + "_1").value=Rpriv.toFixed(rounding);
        var percent =((Rpriv.toFixed(rounding)-Rzav)/Rzav)*100;
        document.getElementById("winding_" + i + "_3").value=percent.toFixed(rounding);

        if (Math.abs(percent.toFixed(rounding))>2) {
            document.getElementById("winding_" + i + "_3").className = "InputBad";
            ok=0;
        }
        else {
            document.getElementById("winding_" + i + "_3").className = "InputGood";
        }
    }
    if (ok>0) {
        document.getElementById("winding_Warning").className = "warningGood";
        document.getElementById("winding_Warning").innerHTML = "«Объём и нормы испытаний электрооборудования» &#9786;";
    } else {
        document.getElementById("winding_Warning").className = "warningBad";
        document.getElementById("winding_Warning").innerHTML = "ВНИМАНИЕ!  &#9785; согласно «Объём и нормы испытаний электрооборудования», значение сопротивления не должны отличаться более чем на 2% от значения сопротивления заводских измерений.";
    }
}

function coefficient() {
    document.getElementById("coefficient2").value = document.getElementById("coefficient").value;

}

function Tizm() {
    document.getElementById("Tizm_CH").value = document.getElementById("Tizm_BH").value;
    document.getElementById("Tizm_HH").value = document.getElementById("Tizm_BH").value;
}

function Tpriv() {
    document.getElementById("Tpriv_CH").value = document.getElementById("Tpriv_BH").value;
    document.getElementById("Tpriv_HH").value = document.getElementById("Tpriv_BH").value;
}

function Tzav() {
    document.getElementById("Tzav_CH").value = document.getElementById("Tzav_BH").value;
    document.getElementById("Tzav_HH").value = document.getElementById("Tzav_BH").value;
}