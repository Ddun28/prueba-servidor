//crear selectores
const user = JSON.parse(localStorage.getItem('user'));
//console.log(user)

if(!user){
    //caso de que el usuario no este en LS
    window.location.href = '../home/index.html'
}