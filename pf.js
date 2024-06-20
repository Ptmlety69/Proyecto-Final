function inicio() {
    document.body.style.backgroundImage = "url('fondo1.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
}
function invierno() {
    document.body.style.backgroundImage = "url('invierno.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
}
function primavera() {
    document.body.style.backgroundImage = "url('primavera.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
}
function otoño() {
    document.body.style.backgroundImage = "url('otoño.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
}
function verano() {
    document.body.style.backgroundImage = "url('verano.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
}
let user=document.getElementById('usuario')
let contra= document.getElementById('contraseña')
let IS=document.getElementById('IS')
let frutas= document.getElementById('productos')
let datos= document.getElementById('registrotabla')
let cant=document.getElementById('cant')
let prec=document.getElementById('prec')
let cinco=document.getElementById('cinco')
let diez=document.getElementById('diez')
let quince=document.getElementById('quince')
let botonG=document.getElementById('Guardar')
let botonV=document.getElementById('Vaciar')

let imgURL = '';



let productos = []

document.addEventListener("DOMContentLoaded", carga)

function carga() {
    if (localStorage.getItem("productos") === null) {
        productos = []
    } else {
        productos = JSON.parse(localStorage.getItem("productos"))
    }

    let salida = ""

    productos.forEach((prod, indice) => {
        salida += `<tr>
                    <td>${prod.fruta}</td>
                  <td><img src="${prod.img}" alt="${prod.fruta}" style="width: 100px; height: 100px; border-radius:50%;"></td>
                    <td>${prod.cant}</td>
                    <td>${prod.prec}</td>
                    <td>${prod.subt}</td>
                    <td>${prod.imp}</td>
                    <td>${prod.tot}</td>
                    <td> <input type="button" value="Eliminar"  id="elim" onclick="eliminar(${indice})">
                    <input type="button" value="Modificar" onclick="modificar(${indice})"> </td>
                </tr>`
        
    });

                    

    document.getElementById('registrotabla').innerHTML = salida;
   
}

// botonA.addEventListener("click",()=>{
//     botones.style.display = "flex"
//     botones2.style.display = "none"
//     productos[indice].nombre=nombre.value
//     productos[indice].rfc=rfc.value
//     productos[indice].pues=pues.value
//     productos[indice].suel=suel.value
//     productos[indice].dt=dt.value
//     productos[indice].imp=imp.value
//     localStorage.setItem("productos",JSON.stringify(productos))
//     carga()
// })

// function quitar(i) {
//     botones.style.display = "none"
//     botones2.style.display = "flex"
//     let confirma = confirm("¿Estás seguro(a)(e) de que quieres Eliminar el alumno "+productos[i].nombre+"?")
//     if (confirma) {
//         productos.splice(i,1)
//         localStorage.setItem("productos",JSON.stringify(productos))
        
//         carga()
//     }
// }
 

botonG.addEventListener("click", () => {
    //imagen
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
    if(cinco.checked){
            impu=0.05
            }else if(diez.checked){
                impu=0.10
            }else{
                impu=0.15
            }
    let prod = {
        fruta: frutas.value,
        img: imgURL,
        cant: cant.value,
        prec: prec.value,
        subt: (parseFloat(cant.value) * parseFloat(prec.value)),
        imp: (parseFloat(cant.value) * parseFloat(prec.value))*impu,
        tot: (parseFloat(cant.value) * parseFloat(prec.value))-(impu*(parseFloat(cant.value) * parseFloat(prec.value)))
    }
    productos.push(prod)

    localStorage.setItem("productos", JSON.stringify(productos))
    carga()
})

botonV.addEventListener("click", () => {
    let confirma = confirm("¿Estás seguro de que quieres vaciar la tabla?")
    if (confirma) {
        localStorage.clear()
        carga()
    }
});

// botonC.addEventListener("click", () => {
//     let a = prompt("Nombre del trabajador a Eliminar")
//     if (productos.find(alu => alu.nombre === a)) {
//         productos = productos.filter(al => al.nombre != a);
//         localStorage.setItem("productos", JSON.stringify(productos))
//         carga()
//     } else {
//         alert("trabajador no existe")
//     }
// });

// function eliminar(indice) {
//     productos.splice(indice, 1)
//     localStorage.setItem("productos", JSON.stringify(productos))
//     carga()
// }

// function modificar(i) {
//     indice=1
//     nombre.value=productos[i].nombre
//     rfc.value=productos[i].rfc
//     pues.value=productos[i].pues
//     suel.value=productos[i].suel
//     dt.value=productos[i].dt
//     imp.value=productos[i].imp
//     botones.style.display = "none"
//     botones2.style.display = "flex"
// }



//colocanco imagenes en la tabla