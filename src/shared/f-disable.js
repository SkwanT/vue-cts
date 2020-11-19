export const fdisable = {
    updated() {
        let elements = document.querySelectorAll("input[type=text]")

        for (const element of elements) {
            element.disabled = "disabled";
            element.style.backgroundColor = "white";
            element.style.border = "none";
            element.placeholder = "";
        }
    }

};