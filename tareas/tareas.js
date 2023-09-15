//crear selectores
const user = JSON.parse(localStorage.getItem('user'));
console.log(user)

const formulario = document.querySelector('#form-todos');
const lista = document.querySelector('#todos-list');
const inputF = document.querySelector('#form-input');
const cerrarBtn = document.querySelector('#cerrar-btn');

if(!user){
    //caso de que el usuario no este en LS
    window.location.href = '../home/index.html'
}

formulario.addEventListener('submit', async e => {
    e.preventDefault();
    await fetch('http://localhost:3000/tareas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text:inputF.value, nombre:user.nombre})
    })

    obtenerLista();
});

const obtenerLista = async () => {
    //la ruta a la cual se va a consultar
    const respuesta = await fetch('http://localhost:3000/tareas', {
        method: 'GET'
    })
    const list = await respuesta.json();
    //comparar el nombre del objeto json con el nombre de la persona logueada
    const userList = list.filter(lista => lista.nombre === user.nombre)
    //console.log(userList)
    userList.forEach(i => {
        const listado = document.createElement('li');
        listado.innerHTML = `
        <li id=${i.id} class="todo-item">
        <button class="delete-btn">&#10006;</button>
        <p class="${i.checked ? 'check-todo' : false}">${i.text}</p>
        <button class="check-btn">&#10003;</button>
      </li>
        `
        lista.appendChild(listado);
    });
}

obtenerLista();

cerrarBtn.addEventListener('click', async e=> {
    localStorage.removeItem('user');
    window.location.href = '../home/index.html'
})

lista.addEventListener('click', async e=> {
    if(e.target.classList.contains('delete-btn')) {
        const id = e.target.parentElement.id;
        await fetch(`http://localhost:3000/tareas/${id}`, {
        method: 'DELETE'
        })
        e.target.parentElement.remove();
        //console.log(id)
        //console.log('eliminar');
    } else if(e.target.classList.contains('check-btn')) {
        const id = e.target.parentElement.id;
        console.log('check');
        const respuestaJSON = await fetch(`http://localhost:3000/tareas/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({checked:e.target.parentElement.classList.contains('check-todo')? false : true})
        });
        const response = await respuestaJSON.json();
        console.log(response);
        e.target.parentElement.classList.toggle('check-todo');
    }
})
