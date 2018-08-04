function onLoad() {
    document.getElementById("countButton").addEventListener("click", Calculate);
    document.getElementById("reportButton").addEventListener("click", CreateReport);
    document.getElementById("docxTemplateInput").addEventListener("change", readTemplateFile);
    document.getElementById("Tizm_BH").addEventListener("change", Tizm);
    document.getElementById("Tpriv_BH").addEventListener("change", Tpriv);
    document.getElementById("Tzav_BH").addEventListener("change", Tzav);
    document.getElementById("DivisionsOnOf").addEventListener("change", DivisionsOnOf);

}