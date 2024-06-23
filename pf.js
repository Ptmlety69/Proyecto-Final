function inicio() {
    document.body.style.backgroundImage = "url('frut inicio.jpeg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
}

function invierno() {
    document.body.style.backgroundImage = "url('frut invierno.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
}

function primavera() {
    document.body.style.backgroundImage = "url('frut primavera.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
}

function otoño() {
    document.body.style.backgroundImage = "url('frut otoño.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
}

function verano() {
    document.body.style.backgroundImage = "url('frut verano.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
}

let user = document.getElementById('usuario');
let contra = document.getElementById('contraseña');
let IS = document.getElementById('IS');
let frutas = document.getElementById('productos');
let datos = document.getElementById('registrotabla');
let cant = document.getElementById('cant');
let prec = document.getElementById('prec');
let cinco = document.getElementById('cinco');
let diez = document.getElementById('diez');
let quince = document.getElementById('quince');
let botonG = document.getElementById('Guardar');
let botonV = document.getElementById('Vaciar');

let imgURL = '';
let productos = [];
let total = 0;

document.addEventListener("DOMContentLoaded", carga);

function carga() {
    if (localStorage.getItem("productos") === null) {
        productos = [];
    } else {
        productos = JSON.parse(localStorage.getItem("productos"));
    }

    let salida = "";
    total = 0;

    productos.forEach((prod, indice) => {
        salida += `<tr>
                    <td>${prod.fruta}</td>
                    <td><img src="${prod.img}" alt="${prod.fruta}" style="width: 100px; height: 100px; border-radius:50%;"></td>
                    <td>${prod.cant}</td>
                    <td>${prod.prec}</td>
                    <td>${prod.subt}</td>
                    <td>${prod.imp}</td>
                    <td>${prod.tot}</td>
                    <td> <input type="button" value="Eliminar" onclick="eliminar(${indice})">
                    <input type="button" value="Modificar" onclick="modificar(${indice})"> </td>
                </tr>`;
        total += parseFloat(prod.tot);
    });
    
    document.getElementById('registrotabla').innerHTML = salida;
    document.getElementById('ntotal').textContent = `El total a pagar es: $${total.toFixed(2)}`;
}


botonG.addEventListener("click", () => {
    switch (frutas.value) {
        case "Manzana":
            imgURL = "manzana.jpg";
            break;
        case "Pera":
            imgURL = "pera.jpg";
            break;
        case "Durazno":
            imgURL = "durazno.jpg";
            break;
        case "Mango":
            imgURL = "mango.jpg";
            break;
        case "Sandia":
            imgURL = "sandia.jpg";
            break;
        case "Uva":
            imgURL = "uva.jpg";
            break;
    }

    let impu = 0;
    if (cinco.checked) {
        impu = 0.05;
    } else if (diez.checked) {
        impu = 0.10;
    } else if (quince.checked) {
        impu = 0.15;
    }

    let subt = parseFloat(cant.value) * parseFloat(prec.value);
    let imp = subt * impu;
    let tot = subt - imp;

    let prod = {
        fruta: frutas.value,
        img: imgURL,
        cant: cant.value,
        prec: prec.value,
        subt: subt,
        imp: imp,
        tot: tot
    };

    productos.push(prod);
    localStorage.setItem("productos", JSON.stringify(productos));
    carga();
});

botonV.addEventListener("click", () => {
    let confirma = confirm("¿Estás seguro de que quieres vaciar la tabla?");
    if (confirma) {
        localStorage.clear();
        productos = [];
        total = 0;
        carga();
    }
});

function eliminar(indice) {
    total -= parseFloat(productos[indice].tot);
    productos.splice(indice, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    carga();
}


IS.addEventListener("click", () => {
    let confirma = confirm("Datos guardados correctamente");
});


//----------------------------------------------------//


document.getElementById('generarPDF').addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let yOffset = 10;
    doc.text("Listado de Productos", 10, yOffset);
    yOffset += 10;

    productos.forEach((prod, indice) => {
        doc.text(`Producto: ${prod.fruta}`, 10, yOffset);
        yOffset += 10;
        doc.text(`Cantidad: ${prod.cant}`, 10, yOffset);
        yOffset += 10;
        doc.text(`Precio: ${prod.prec}`, 10, yOffset);
        yOffset += 10;
        doc.text(`Subtotal: ${prod.subt}`, 10, yOffset);
        yOffset += 10;
        doc.text(`Impuesto: ${prod.imp}`, 10, yOffset);
        yOffset += 10;
        doc.text(`Total: ${prod.tot}`, 10, yOffset);
        yOffset += 20;  // Agrega un poco más de espacio entre productos
    });

    doc.text(`Total a pagar: $${total.toFixed(2)}`, 10, yOffset);

    doc.save("productos.pdf");
});
