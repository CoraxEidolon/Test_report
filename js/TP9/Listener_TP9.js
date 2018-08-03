function onLoad() {
    document.getElementById("countButton").addEventListener("click", Calculate);
    document.getElementById("reportButton").addEventListener("click", CreateReport);
    document.getElementById("docxTemplateInput").addEventListener("change", readTemplateFile);
    document.getElementById("coefficient").addEventListener("change", coefficient);
}