function CreateReport() {
    document.getElementById("docxTemplateInput").click();

}


readTemplateFile = function (evt) {
    // Получить первый (и только!) Файл из объекта FileList
    var f = evt.target.files[0];

    if (f) {
        var r = new FileReader();
        r.onload = function (e) {
            var contents = e.target.result;
            doc = new window.Docxgen(contents);

            /* ########## Создаем результирующий массив и заполняем его ########## */
            var arResult = {};

            /* ========== Потери холостого хода ========== */
            arResult["Idling_Pc"] = document.getElementById("Idling_Pc").value;
            arResult["Idling_Ic"] = document.getElementById("Idling_Ic").value;
            arResult["Number2"] = document.getElementById("Number2").value;
            arResult["PXXFactory"] = document.getElementById("PXX_Factory").value;
            arResult["PowerN"] = document.getElementById("powerN").value;
            arResult["SumPcAnswer"] = document.getElementById("SumPcAnswer").innerHTML;
            arResult["decisionPxx"] = document.getElementById("decisionPxx").innerHTML;
            arResult["PxxAnswer"] = document.getElementById("PxxAnswer").innerHTML;
            arResult["IdlingDiscrepancy"] = document.getElementById("Idling_Discrepancy").innerHTML;
            arResult["IdlingDiscrepancyAnswer"] = document.getElementById("Idling_Discrepancy_Answer").innerHTML;

            for (var i = 0; i < 5; i++) {
                for (var j = 0; j < 3; j++) {
                    arResult["Idling_" + j + "_" + i] = document.getElementById("Idling_" + j + "_" + i).value;
                }
            }

            /* ========== Измерение полного сопротивления К.З.(Zк). ========== */
            for (var i = 0; i < 6; i++) {
                for (var j = 0; j < 4; j++) {
                    arResult["Z_" + i + "_" + j] = document.getElementById("Impedance_" + i + "_" + j).value;
                }
            }
            for (var i = 1; i < 3; i++) {
                arResult["Unom" + i] = Number(document.getElementById("Unom" + i).value);
                arResult["Uк" + i] = Number(document.getElementById("Uк" + i).value);
                arResult["Inom" + i] = Number(document.getElementById("Inom" + i).value);
                arResult["Zkb" + i] = document.getElementById("Impedance_Zkb_Answer" + i).value;
            }

            /* ========== Сопротивление обмоток постоянному току ========== */
            for (var i = 0; i < 21; i++) {
                for (var j = 0; j < 4; j++) {
                    arResult["R_" + i + "_" + j] = document.getElementById("winding_" + i + "_" + j).value;
                }
            }

            if (Number(document.getElementById("Tizm_BH").value) > 0) {
                arResult["Tizm"] = "+" + document.getElementById("Tizm_BH").value;
            } else {
                arResult["Tizm"] = document.getElementById("Tizm_BH").value;
            }
            if (Number(document.getElementById("Tpriv_BH").value) > 0) {
                arResult["Tpriv"] = "+" + document.getElementById("Tpriv_BH").value;
            } else {
                arResult["Tpriv"] = document.getElementById("Tpriv_BH").value;
            }
            if (Number(document.getElementById("Tzav_BH").value) > 0) {
                arResult["Tzav"] = "+" + document.getElementById("Tzav_BH").value;
            } else {
                arResult["Tzav"] = document.getElementById("Tzav_BH").value;
            }
            /* ########## Массив создан =) ########## */

            var buf = JSON.stringify(arResult);
            var data = JSON.parse(buf);
            doc.setData(data);
            doc.render();
            out = doc.getZip().generate({
                type: "blob"
            })
            var d = new Date();
            var name = d.getDate()+"."+Number(d.getMonth() + 1)+"."+d.getFullYear()+"_"+d.getHours()+";"+d.getMinutes();
            saveAs(out, "ПРОТОКОЛ ИСПЫТАНИЙ АТ-6_"+name+".docx")
        }
        r.readAsBinaryString(f);
    } else {
        alert("Failed to load file");
    }
};