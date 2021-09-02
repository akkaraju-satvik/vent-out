const socket = io()

const ventedOutData = document.querySelector('#vent-out-input')
const submitVent = document.querySelector('#vent')
const ventOutForm = document.querySelector('#vent-out-form')
const ventTemplate = document.querySelector('#vent-template').innerHTML
const vents = document.querySelector('#vents')

socket.on('vent', function(data) {
    const html = Mustache.render(ventTemplate, {data})
    vents.insertAdjacentHTML('beforeend', html)
})

ventOutForm.addEventListener('submit', (e) => {
    e.preventDefault()

    submitVent.setAttribute('disabled', 'disabled')
    ventedOutData.innerHTML.replace('\n', '<br/>')
    socket.emit('ventSubmitted', ventedOutData.value, (data) => {
        submitVent.removeAttribute('disabled')
        ventedOutData.value = ''
        ventedOutData.focus()
        console.log(data)
    })
})