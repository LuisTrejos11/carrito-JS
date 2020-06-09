// variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.getElementById('vaciar-carrito');
document.addEventListener('DOMContentLoaded', leerLocalStorage);


//listeners
cargarEventListeners();

function cargarEventListeners(){
    // dispara cuando se agregue al carrito
    cursos.addEventListener('click', comprarCurso);
    // cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);
    // vaciar carrito
    vaciarCarrito.addEventListener('click', vaciaCarrito);
}
//funciones 

function comprarCurso(e){
    e.preventDefault();
    // delegation para agregar carrito 
    if(e.target.classList.contains('agregar-carrito')){
        
        const curso = e.target.parentElement.parentElement; 
        //enviamos el curso seleccionado para tomar sus datos 
        leerDatosCurso(curso);
        
    }
}

// leer datos del curso

function leerDatosCurso(curso){

    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCurso);

    console.log(infoCurso);
}

// muestra el curso seleccionado en el carrito
function insertarCarrito(curso){

    const row = document.createElement('tr');
    row.innerHTML= `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}
// elimina el curso del carrito en el DOM
function eliminarCurso(e){
    e.preventDefault();
    
    let curso,
        cursoId;
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso =  e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
        
    }
    eliminarCursoLocalStorage(cursoId);

}
// vacia cursos del carrito en  el dom 
function vaciaCarrito(){
    // forma lenta 
    //listaCursos.innerHTML= '';
   
    // forma recomendada
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }

   

    // Vaciar carrito del localstorage
    vaciarLocalStorage();

    return false;
}

// almacena del carrito a localstorage
function guardarCursoLocalStorage(curso){
    let cursos;
    // toma el valor del localstorage
    cursos = obtenerCursosLocalStorage();

    // el curso seleccionado se agrga al carrito
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos));

}

function obtenerCursosLocalStorage(){
    let cursosLS;

    // comprobar si hay algo en el localstorage 
    if(localStorage.getItem('cursos') === null){
        cursosLS = [];
    }else{
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}
// imprime los cursos del local storage en el carrito 
function leerLocalStorage(){
    let cursosLS;
    cursosLS= obtenerCursosLocalStorage();
    cursosLS.forEach(function(curso){
        const row = document.createElement('tr');
        row.innerHTML= `
            <td>
                <img src="${curso.imagen}" width=100>
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
        `;
        listaCursos.appendChild(row);
    });
   
}
// elemina curso por id localstorage
function eliminarCursoLocalStorage(cursoId){
    let cursosLS;
    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(curso, index){
        if(curso.id === cursoId){
            cursosLS.splice(index, 1);
        }
    });
    //console.log(cursosLS);
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

function vaciarLocalStorage(){
    localStorage.clear();
}