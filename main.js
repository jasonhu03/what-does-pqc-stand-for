async function loadText(file) {
    const response = await fetch(file);
    const words = await response.json();
    const count = Object.keys(words).length;
    console.log(words);
}

function generatePQC(){
    const p = document.querySelector("#generate-button");
    const output = document.querySelector("#pqc-output");
    p.addEventListener("click", ()=>{
        output.textContent = "Hello";
    });
    console.log("pp");
}
loadText("words.json");
generatePQC();