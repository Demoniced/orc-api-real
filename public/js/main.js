const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click',deleteSubject)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deleteSubject(){
    const fName = this.parentNode.childNodes[1].innerText
    const  lName = this.parentNode.childNodes[3].innerText
    const age = this.parentNode.childNodes[5].innerText
    const description = this.parentNode.childNodes[7].innerText
    try{
        const response = await fetch('deleteSubject', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'firstNameS': fName,
                'lastNameS': lName,
                'ageS': age,
                'descriptionS': description
            })
    })
        const data = await response.json()
        console.log(data)
        location.reload()
    } .catch(err){
        console.log(err)
    }
}