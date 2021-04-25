const startCheck = () => {
    $("#div_0").fadeOut(interval, () => {
        $("#div_1").fadeIn(interval, () => {
            freeRadios(1);
        });
    });
}
const getMainUnit = () => {
    let score = {
        leo: 0,
        more: 0,
        vivid: 0,
        wonder: 0,
        night: 0
    };
    score[getSelectedUnit(1)] += 10;
    score[getSelectedUnit(2)] += 11;
    score[getSelectedUnit(3)] += 12;
    let max_score = 0;
    let unit = null;
    for (let u in score) {
        if (score[u] > max_score) {
            unit = u;
            max_score = score[u];
        }
    }
    return unit;
}
const getSelectedUnit = (id) => {
    const form_id = "form_" + id;
    const input_id = "input_" + id;
    return document.getElementById(form_id)[input_id].value;
}
const resetCheck = () => {
    $("#div_4").fadeOut(interval, () => {
        setAllRadios();
        for (let u of document.getElementsByClassName("div_unit")) {
            u.style.display = "none";
        }
        $("#div_1").fadeIn(interval, () => {
            freeRadios(1);
        });
    });
}
const setAllRadios = () => {
    setRadios(1, radio1);
    setRadios(2, radio2);
    setRadios(3, radio3);
}
const setRadios = (id, radios_default) => {
    let form = document.getElementById("form_" + id);
    while (form.firstChild) {
        form.removeChild(form.firstChild);
    }
    let radios = JSON.parse(JSON.stringify(radios_default));
    let count = 1;
    while (radios.length) {
        let i = Math.floor(Math.random() * radios.length);
        let radio = radios[i];
        radios.splice(i, 1);
        let input = document.createElement("input");
        input.type = "radio";
        input.name = "input_" + id;
        input.id = "input_" + id + "_" + count;
        input.classList.add("radio_check");
        input.value = radio.unit;
        input.disabled = true;
        form.appendChild(input);
        let label = document.createElement("label");
        label.htmlFor = "input_" + id + "_" + count;
        label.classList.add("label_check");
        label.classList.add(radio.unit);
        label.innerText = radio.text;
        form.appendChild(label);
        count += 1;
    }
}
const fixRadios = (id) => {
    for (let f of document.getElementById("form_" + id)) {
        f.disabled = true;
    }
}
const freeRadios = (id) => {
    for (let f of document.getElementById("form_" + id)) {
        f.disabled = false;
    }
}