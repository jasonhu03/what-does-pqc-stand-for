function wishing(){
    const p = document.querySelector("#wishing-well-button");
    const dialog = document.querySelector("#dialog-box");
    p.addEventListener("click", ()=>{
        dialog.showModal();
    })
}

wishing();