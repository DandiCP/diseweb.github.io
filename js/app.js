const canvas = document.getElementById("canvas");
let selectedElement = null;

/* Guardamos archivos para exportación */
let uploadedFiles = [];

function createElement(type){
  let el;

  switch(type){

    case "section":
      el=document.createElement("section");
      el.style.padding="40px";
      el.style.background="#ffffff";
      break;

    case "container":
      el=document.createElement("div");
      el.style.padding="20px";
      el.style.border="1px dashed #aaa";
      break;

    case "h1":
      el=document.createElement("h1");
      el.textContent="Título";
      break;

    case "p":
      el=document.createElement("p");
      el.textContent="Texto editable";
      break;

    case "button":
      el=document.createElement("button");
      el.textContent="Botón";
      break;

    case "image":
      el=document.createElement("img");
      el.style.maxWidth="100%";
      el.alt="Imagen";
      break;

    case "video":
      el=document.createElement("video");
      el.controls=true;
      el.style.maxWidth="100%";
      break;

    case "file":
      el=document.createElement("a");
      el.textContent="Descargar archivo";
      el.target="_blank";
      break;
  }

  el.style.margin="10px 0";
  el.addEventListener("click",selectElement);

  return el;
}

function selectElement(e){
  e.stopPropagation();

  if(selectedElement){
    selectedElement.classList.remove("selected");
  }

  selectedElement = e.target;
  selectedElement.classList.add("selected");

  const propText = document.getElementById("propText");

  if(selectedElement.tagName === "IMG" || selectedElement.tagName === "VIDEO"){
    propText.value="";
  }else{
    propText.value = selectedElement.textContent || "";
  }
}

/* Eliminar */
document.getElementById("deleteBtn")
.addEventListener("click",()=>{
  if(!selectedElement) return;
  selectedElement.remove();
  selectedElement = null;
  document.getElementById("propText").value="";
});
