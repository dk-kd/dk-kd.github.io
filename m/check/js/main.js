window.addEventListener("load", () => {
    setAllRadios();
    document.getElementById("form_1").addEventListener("change", () => {
        fixRadios(1);
        $("#div_1").fadeOut(interval, () => {
            $("#div_2").fadeIn(interval, () => {
                freeRadios(2);
            });
        });
    });
    document.getElementById("form_2").addEventListener("change", () => {
        fixRadios(2);
        $("#div_2").fadeOut(interval, () => {
            $("#div_3").fadeIn(interval, () => {
                freeRadios(3);
            });
        });
    });
    document.getElementById("form_3").addEventListener("change", () => {
        fixRadios(3);
        const main_unit = getMainUnit();
        document.getElementById("div_" + main_unit).style.display = "block";
        $("#div_3").fadeOut(interval, () => {
            $("#div_4").fadeIn(interval);
        });
    });
});