const fileInput = document.getElementById("fileInput");
const buttonOptions = document.getElementById("buttonOptions");

/* Mostrar propiedades al seleccionar */
document.addEventListener("click", ()=>{

  if(selectedElement && selectedElement.tagName === "BUTTON"){
    buttonOptions.style.display="block";

    document.getElementById("btnBgColor").value =
      rgbToHex(selectedElement.style.backgroundColor || "#ffffff");

    document.getElementById("btnTextColor").value =
      rgbToHex(selectedElement.style.color || "#000000");

    document.getElementById("btnLink").value =
      selectedElement.dataset.link || "";

    document.getElementById("btnNewTab").checked =
      selectedElement.dataset.newtab === "true";

    document.getElementById("btnType").value =
      selectedElement.type || "button";

    document.getElementById("btnAlert").value =
      selectedElement.dataset.alert || "";

  } else {
    buttonOptions.style.display="none";
  }

});

/* Texto */
document.getElementById("propText")
.addEventListener("input",e=>{
  if(selectedElement &&
     selectedElement.tagName !== "IMG" &&
     selectedElement.tagName !== "VIDEO"){
    selectedElement.textContent = e.target.value;
  }
});

/* Color fondo */
document.getElementById("btnBgColor")
.addEventListener("input",e=>{
  if(selectedElement?.tagName==="BUTTON"){
    selectedElement.style.backgroundColor=e.target.value;
  }
});

/* Color texto */
document.getElementById("btnTextColor")
.addEventListener("input",e=>{
  if(selectedElement?.tagName==="BUTTON"){
    selectedElement.style.color=e.target.value;
  }
});

/* Tipo botón */
document.getElementById("btnType")
.addEventListener("change",e=>{
  if(selectedElement?.tagName==="BUTTON"){
    selectedElement.type=e.target.value;
  }
});

/* Enlace */
document.getElementById("btnLink")
.addEventListener("input",e=>{
  if(selectedElement?.tagName==="BUTTON"){
    selectedElement.dataset.link=e.target.value;
  }
});

/* Nueva pestaña */
document.getElementById("btnNewTab")
.addEventListener("change",e=>{
  if(selectedElement?.tagName==="BUTTON"){
    selectedElement.dataset.newtab=e.target.checked;
  }
});

/* Alerta simple */
document.getElementById("btnAlert")
.addEventListener("input",e=>{
  if(selectedElement?.tagName==="BUTTON"){
    selectedElement.dataset.alert=e.target.value;
  }
});

/* Comportamiento del botón */
canvas.addEventListener("click",e=>{

  if(e.target.tagName==="BUTTON"){

    const link = e.target.dataset.link;
    const newTab = e.target.dataset.newtab === "true";
    const alertMsg = e.target.dataset.alert;

    if(alertMsg){
      alert(alertMsg);
    }

    if(link){
      if(newTab){
        window.open(link,"_blank");
      } else {
        window.location.href=link;
      }
    }
  }
});

/* Subir archivo */
fileInput.addEventListener("change",e=>{

  if(!selectedElement){
    alert("Selecciona primero un elemento.");
    return;
  }

  const file = e.target.files[0];
  if(!file) return;

  const url = URL.createObjectURL(file);

  if(selectedElement.tagName === "IMG"){
    selectedElement.src = "assets/" + file.name;
  }
  else if(selectedElement.tagName === "VIDEO"){
    selectedElement.src = "assets/" + file.name;
  }
  else if(selectedElement.tagName === "A"){
    selectedElement.href = "assets/" + file.name;
    selectedElement.textContent = file.name;
  }
});

/* Utilidad convertir RGB a HEX */
function rgbToHex(rgb) {
  if(!rgb) return "#000000";
  if(rgb.startsWith("#")) return rgb;

  const result = rgb.match(/\d+/g);
  if(!result) return "#000000";

  return "#" + result
    .map(x => parseInt(x).toString(16).padStart(2,"0"))
    .join("");
}
