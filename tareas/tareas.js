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
        listado.innerHTML = `
         <li id=${i.id} class="todo-item">
        <button class="delete-btn">&#10006;</button>
        <p class="${i.checked ? 'check-todo': false }"> ${i.text} </p>
        <button class="check-btn">&#10003;</button>
      </li> `
        lista.appendChild(listado)
    });
    obtenerLista();
}

    cerrarBtn.addEventListener('click', async e=>{
        localStorage.removeItem('user');
        window.location.href = '../home/index.html'
    })

    lista.addEventListener('click', async e=>{
        if(e.target.classList.contains('delete-btn')){
            //console.log('eliminar')
            const id = e.target.parentElement.id;
            await fetch(`http://localhost:3000/tareas/${id}`, {
                method:'DELETE'
            });
            e.target.parentElement.remove();
        }else if(e.target.classList.contains('check-btn')){
            //console.log('')
            const id = e.target.parentElement.id;

            const respuestaJSON = await fetch(`http://localhost:3000/tareas/${id}`,{
            method:'PATCH',
            headers:{'Content-type':'application/json'
           },
           body:JSON.stringify({checked:target.parentElement.classList.contains('check-todo')?false : true })
        });
        const response = await respuestaJSON.json();
        console.log(response);
        e.target.parentElement.classList.toggle('check-todo');
           
    }})

