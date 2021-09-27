const socket = io()

const ventedOutData = document.querySelector('#vent-out-input')
const submitVent = document.querySelector('#vent')
const ventOutForm = document.querySelector('#vent-out-form')
const ventTemplate = document.querySelector('#vent-template').innerHTML
const vents = document.querySelector('#vents')

$('textarea').autoResize()
socket.on('vent', function(data) {
    if(data === '') return vents.innerHTML = ''
    const html = Mustache.render(ventTemplate, {data})
    vents.insertAdjacentHTML('afterbegin', html)
})

ventOutForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if(ventedOutData === '') return
    submitVent.setAttribute('disabled', 'disabled')
    ventedOutData.innerHTML.replace('\n', '<br/>')
    const data = {
        data: ventedOutData.value
    }
    socket.emit('ventSubmitted', data, (data) => {
        submitVent.removeAttribute('disabled')
        ventedOutData.value = ''
        ventedOutData.focus()
    })
})