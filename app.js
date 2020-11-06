const input = document.querySelector('#input')
const searchBtn = document.querySelector('#search')
const notFound = document.querySelector('.not__found')
const def = document.querySelector('.def')
const audio = document.querySelector('.audio')
const loading = document.querySelector('.loading')
const api = '88298462-2076-4980-a18d-c137803baa60'

searchBtn.addEventListener('click', (e) => {

    e.preventDefault();
    audio.innerHTML = ''
    def.innerHTML = ''
    notFound.innerHTML = ''
    let word = input.value;
    if((word === '') || (typeof word == 'number')){
        console.log('error')
        alert('Please enter a word');
    }else{

    getData(word);}
})

async function getData(word){
    loading.style.display = 'block' 
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${api}`)
    const data = await response.json()
    setTimeout(() => {
    if(!data.length){
        loading.style.display = 'none';
        notFound.innerText = "Result not found!"
        
    }
    
    if(typeof data[0] === 'string'){
        loading.style.display = 'none';
        def.innerText = "Did you mean:"
        data.forEach(elem => {
            const spanElement = document.createElement('button');
            spanElement.textContent = elem
            spanElement.classList.add('suggested')
            notFound.appendChild(spanElement)
        })
          
    }

    loading.style.display = 'none';
    const definition = data[0].shortdef[0];
    def.innerText = definition

    const sound = data[0].hwi.prs[0].sound.audio;
    if(sound){
        renderSound(sound);
    }
    console.log(data)
    
},1000)}

renderSound = sound => {
    let subfolder = sound.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${sound}.wav?key=${api}`;
    const player = document.createElement('audio')
    player.src = soundSrc
    player.controls = true
    audio.appendChild(player)

}

notFound.addEventListener('click', fetchItem);

function fetchItem(e)
{
    if(e.target.parentElement.className === 'not__found' ){
        input.value = e.target.textContent
    } 
}