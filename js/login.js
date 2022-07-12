let elEmail=document.querySelector('.email-input');
let elPassword=document.querySelector('.password-input');
let elForm=document.querySelector('.form');
let elError=document.querySelector('.error-message');

elForm.addEventListener('submit',e=>{
    e.preventDefault();
    data();
})
// eve.holt@reqres.in
// cityslicka
let data=()=>{
    fetch('https://reqres.in/api/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            email:elEmail.value,
            password:elPassword.value,
        })
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.token){
            window.localStorage.setItem('token',data.token);
            elError.classList.remove('active')
            window.location.replace('home.html')
        }
        else{
            elError.classList.add('active');
        }
    });
}