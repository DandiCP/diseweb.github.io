document.getElementById("exportBtn")
.addEventListener("click", async ()=>{

  const zip = new JSZip();

  /* Crear carpeta assets */
  const assetsFolder = zip.folder("assets");

  /* Agregar archivos */
  uploadedFiles.forEach(fileData=>{
    assetsFolder.file(fileData.name, fileData.file);
  });

  /* Generar HTML limpio */
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Exportado</title>
</head>
<body>
${canvas.innerHTML}
</body>
</html>
`;

  zip.file("index.html", htmlContent);

  const content = await zip.generateAsync({type:"blob"});

  const link = document.createElement("a");
  link.href = URL.createObjectURL(content);
  link.download = "website.zip";
  link.click();
});
