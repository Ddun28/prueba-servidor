//crear selectores
const user = JSON.parse(localStorage.getItem('user'));
//console.log(user)

const formulario = document.querySelector('#form-todos');
const lista = document.querySelector('#form-list');
const inputF = document.querySelector('#form-input');
const cerrarBtn = document.querySelector('#cerrar-btn');

if(!user){
    //caso de que el usuario no este en LS
    window.location.href = '../home/index.html'
}

formulario.addEventListener('submit', async e=>{
    e.preventDefault();

    await fetch('http://localhost:3000/tareas',{
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify({text:inputF.value,nombre:user.nombre})
    })

    obtenerLista();
})

const obtenerLista = async ()=>{
    const respuesta = await fetch('http://localhost:3000/tareas', {
        method:'GET'
    });
    const list = await respuesta.json();
    const userList = list.filter(lista => lista.nombre === user.nombre);
    //console.log(userList)
    userList.forEach(lista => {
        const listado = document.createElement('li');
        listado.innerHTML = `${i.text}`
        lista.appendChild(listado)
    })
}