document.querySelectorAll(".component").forEach(comp=>{
  comp.addEventListener("dragstart",e=>{
    e.dataTransfer.setData("type",comp.dataset.type);
  });
});

canvas.addEventListener("dragover",e=>{
  e.preventDefault();
});

canvas.addEventListener("drop",e=>{
  e.preventDefault();
  const type=e.dataTransfer.getData("type");
  const element=createElement(type);
  canvas.appendChild(element);
});

