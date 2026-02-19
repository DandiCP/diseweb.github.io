let previewWindow = null;

/* Guardar proyecto */
document.getElementById("saveBtn")
.addEventListener("click",()=>{

  localStorage.setItem("project",canvas.innerHTML);

  updatePreview();

  alert("Proyecto guardado");
});

/* Cargar proyecto */
window.addEventListener("load",()=>{

  const saved = localStorage.getItem("project");

  if(saved){
    canvas.innerHTML = saved;

    canvas.querySelectorAll("*").forEach(el=>{
      el.addEventListener("click",selectElement);
    });
  }
});

/* Vista previa */
document.getElementById("previewBtn")
.addEventListener("click",()=>{

  if(!previewWindow || previewWindow.closed){
    previewWindow = window.open("", "_blank");
  }

  updatePreview();
});

/* Generar HTML completo */
function generateFullHTML(){

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Vista previa</title>
<style>
body{font-family:Arial;margin:0;padding:20px;}
button{cursor:pointer;padding:10px 20px;}
</style>
</head>
<body>
${canvas.innerHTML}
<script>
document.addEventListener("click",function(e){

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
<\/script>
</body>
</html>
`;
}

/* Actualizar vista previa */
function updatePreview(){

  if(previewWindow && !previewWindow.closed){
    previewWindow.document.open();
    previewWindow.document.write(generateFullHTML());
    previewWindow.document.close();
  }
}
