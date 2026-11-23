async function loadText(file) {
    const response = await fetch(file);
    const words = await response.json();
    return words
}
const words = await loadText("words.json")
console.log(words.p)

async function loadImage(src) {
    const img = new Image();
    img.src = src;
    await img.decode();
    return img;
}
const img = await loadImage("background.png");

//phrase generator
function generate() {
    const templates = [["adj", "adj", "noun"], ["noun", "verb", "noun"], ["noun", "adv",  "verb"], ["adj",  "noun", "verb"], ["adj",  "noun", "noun"], ["intj", "adj",  "noun"],["noun", "noun", "noun"], ];
    const t = templates[Math.floor(Math.random() * Object.keys(templates).length)];
    const pqc = [words.p[t[0]][Math.floor(Math.random() * Object.keys(words.p[t[0]]).length)], words.q[t[1]][Math.floor(Math.random() * Object.keys(words.q[t[1]]).length)], words.c[t[2]][Math.floor(Math.random() * Object.keys(words.c[t[2]]).length)]];
    return pqc;
}

let currentFile = null;

function showPQC(){
    const p = document.querySelector("#generate-button");
    const canvas = document.getElementById("pqc-output");
    const ctx = canvas.getContext("2d");
    p.addEventListener("click", ()=>{
        document.querySelector("#share-button").hidden = false;
        canvas.hidden = false;
        let phrase = generate();
        ctx.font = "100px Arial";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0,0, canvas.width, canvas.height);
        phrase.forEach((word, i) => {
            ctx.fillText(word, 50, 500 + i * 100);
        });
        canvas.toBlob(async (blob) => {
            currentFile = new File([blob], "image.png", { type: "image/jpeg" });
        }, "image/png");
    });
}

//share feature
function share(){
    document.querySelector("#share-button").addEventListener("click", async ()=>{
        const canvas = document.getElementById("pqc-output");
        const output = document.querySelector("#p")
        if (!navigator.canShare) {
            output.textContent = `Your browser doesn't support the Web Share API.`;
            return;
        }

        if (navigator.canShare({files:[currentFile]})) {
            try {
            await navigator.share({
                files: [currentFile]
            });
            output.textContent = "Shared!";
            } catch (error) {
            output.textContent = `Error: ${error.message}`;
            }
        } else {
            output.textContent = `Your system doesn't support sharing these files.`;
        }
    });
}

//88x31 buttons

share();
showPQC();