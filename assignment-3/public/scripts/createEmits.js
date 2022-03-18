/**
 * Performs a script to take the emited data to realtime apply it to site.
 *
 */
function createEmit () {
  const socket = window.io.connect()
  socket.on('issue', emitData => {
    const target = document.querySelector('#issues-window')

    const elem2 = document.createElement('td')
    const linebreak = document.createElement('BR')

    elem2.innerText =
    `Title: ${emitData.title}.
    Action: ${emitData.action}.
    State changed to: ${emitData.state}.
    Changed by: ${emitData.user}.`

    elem2.classList.add('emitElem')

    target.appendChild(elem2)
    target.appendChild(linebreak)
  })
}

createEmit()
