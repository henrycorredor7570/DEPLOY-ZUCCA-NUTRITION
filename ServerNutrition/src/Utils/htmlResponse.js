const htmlResponse = () => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Exito!!!</title>
</head>
<body style="
background-color: #242424;
margin: 0;
padding: 0;
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
">
<div style="
    box-sizing: border-box;
    width: 300px;
    height: 254px;
    background: rgba(217, 217, 217, 0.58);
    border: 1px solid white;
    box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
    backdrop-filter: blur(6px);
    border-radius: 17px;
    text-align: center;
    cursor: pointer;
    transition: all 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    font-weight: bolder;
    color: black;"
    onmouseover="this.style.border = '1px solid black'; this.style.transform = 'scale(1.05)';"
    onmouseout="this.style.border = '1px solid white'; this.style.transform = 'scale(1)';"
    onmousedown="this.style.transform = 'scale(0.95) rotateZ(1.7deg)';"
    onmouseup="this.style.transform = 'scale(1)';"
    onclick="window.close();">
    Autenticado con éxito, puedes hacer click aqui para cerrar la pestaña
</div>
</body>
</html>
    `
}

module.exports = htmlResponse