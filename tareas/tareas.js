//crear selectores
const user = JSON.parse(localStorage.getItem('user'));
//console.log(user)

const formulario = document.querySelector('#form-todos');
const lista = document.querySelector('#todos-list');
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
            'Content-type':'application/json'
        },
        body:JSON.stringify({text:inputF.value,nombre:user.nombre})
    })

    const listado = document.createElement('li');
    listado.innerHTML = `
     <li id=${lista.id} class="todo-item">
    <button class="delete-btn">&#10006;</button>
    ${inputF.value}
    <button class="check-btn">&#10003;</button>
  </li> `

  lista.appendChild(listado);
  inputF.value = '';
})

cerrarBtn.addEventListener('click', async e=>{
    localStorage.removeItem('user');
    window.location.href = '../home/index.html'
})
