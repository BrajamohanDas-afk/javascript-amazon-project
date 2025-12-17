// const xhr = new XMLHttpRequest()

//     xhr.addEventListener('load', ()=>{
//         console.log(xhr.response)
//     })
//     xhr.open('GET', 'https://supersimplebackend.dev/greeting')
//     xhr.send();

// const hello = fetch('https://supersimplebackend.dev/greeting')
//     .then((response)=>{
//         return response.text();
//     }).then((hello)=>{
//         console.log(hello);
//     })

// async function hi() {
//     const hello = await fetch('https://supersimplebackend.dev/greeting');
//     const text  = await hello.text();
//     console.log(text);
//     // console.log(hello);
// }

// hi();

// async function hi() {
//     try {
//         const hello = await fetch('https://amazon.com', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//         name: 'Brajamohan Das'
//         })
//     })
//     const text  = await hello.text();
//         console.log(text);    
//     }catch(error){
//         console.log('Unexpected error : Please try again later');
//     }

// }

// hi();

async function hi() {
    try {
        const hello = await fetch('https://supersimplebackend.dev/greeting', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(response.status >= 400){
        throw response;
    }
    const text  = await hello.text();
        console.log(text);    
    }catch(error){
        if(error.status === 400){
            await error.json();
        }else{
            console.log('Network error.Please try agin later');
        }
    }
}

hi();

