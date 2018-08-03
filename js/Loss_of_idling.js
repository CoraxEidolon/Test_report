/* Потери холостого хода */
function LossOfIdling() {
    var rounding =Number(document.getElementById("Idling_round").value);; //Округлять до
    var Number2=Number(document.getElementById("Number2").value);
    var Pc = Number(document.getElementById("Idling_Pc").value);
    var Ic = document.getElementById("Idling_Ic").value;
    document.getElementById('SumPcAnswer').innerHTML = "(";
    var SumPc = 0;
    for (var i = 0; i < 3; i++) {
        var VResult= ((Pc/Number2)*Number( document.getElementById( "Idling_"+i+"_1").value )).toFixed(rounding);
        var IResult=(Ic*Number( document.getElementById( "Idling_"+i+"_3").value )).toFixed(rounding);
        document.getElementById( "Idling_"+i+"_2").value = VResult;//ватты
        document.getElementById( "Idling_"+i+"_4").value = IResult;//амперы
        document.getElementById('SumPcAnswer').innerHTML += VResult;
        SumPc+=Number(VResult);
        if (i!=2){document.getElementById('SumPcAnswer').innerHTML +=" + ";}
    }
    SumPc/=Number2;
    document.getElementById('SumPcAnswer').innerHTML += ")/"+Number2+" = "+SumPc+ "(Вт)";

    var PXXFactory = Number(document.getElementById("PXX_Factory").value);
    var UNominal = Number(document.getElementById("U_nominal").value);
    var Volt=Number(document.getElementById("Idling_0_0").value);
    var PowerN=Number(document.getElementById("powerN").value);

    var PXXAnswer = (SumPc * Math.pow((UNominal/Volt),PowerN));
    PXXAnswer/=1000; //Перевод в килловаты
    document.getElementById('decisionPxx').innerHTML = SumPc + " * (" + UNominal + "/" + Volt + ")";
    document.getElementById('PowerNSpan').innerHTML="<sup>"+PowerN+"</sup> =";
    document.getElementById('PxxAnswer').innerHTML = PXXAnswer.toFixed(rounding) + " (КВт)";
    var Discrepancy = (((PXXFactory - PXXAnswer) / PXXFactory) * 100).toFixed(rounding);

    if (Discrepancy<0) { document.getElementById('Idling_Discrepancy').innerHTML="Увеличение"; }
    else { document.getElementById('Idling_Discrepancy').innerHTML="Уменьшение"; }
    document.getElementById('Idling_Discrepancy').innerHTML+=" PXX  по сравнению с PXX(завод.) на ";
    document.getElementById('Idling_Discrepancy_Answer').innerHTML=Math.abs(Discrepancy).toFixed(rounding) +" %";
    if (Math.abs(Discrepancy)>=30){
        document.getElementById("Idling_Warning").className ="warningBad";
        document.getElementById('Idling_Warning').innerHTML=" ВНИМАНИЕ! &#9785; согласно «Объём и нормы испытаний электрооборудования», отличие измеренных значений от исходных данных не должно превышать 30%.";
    }
    else {
        document.getElementById("Idling_Warning").className ="warningGood";
        document.getElementById('Idling_Warning').innerHTML="«Объём и нормы испытаний электрооборудования» &#9786;";
    }

}


function VoltChange() {
    document.getElementById('Idling_1_0').value = document.getElementById("Idling_0_0").value;
    document.getElementById('Idling_2_0').value = document.getElementById("Idling_0_0").value;
}
