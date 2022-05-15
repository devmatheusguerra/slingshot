class Cenario {
  constructor () {
    this.x_atual = 0
    this.createCron()
    this.createPosicao()
    this.setRegua()
  }

  createCron () {
    let timer = document.createElement('div')
    timer.style.position = 'fixed'
    timer.style.right = '10px'
    timer.style.top = '0px'
    timer.style.height = '100px'
    timer.style.color = '#000'
    timer.style.fontSize = '20px'
    timer.style.textAlign = 'center'
    timer.style.lineHeight = '100px'
    document.body.appendChild(timer)
    this.timer = timer
  }

  atualizarCron (time) {
    this.timer.innerHTML =
      '<b>Tempo decorrido: </b>' + time.toFixed(2) + ' segundos'
  }

  createPosicao () {
    let position = document.createElement('div')
    position.style.position = 'fixed'
    position.style.right = '10px'
    position.style.top = '100px'
    position.style.color = '#000'
    position.style.fontSize = '20px'
    position.style.textAlign = 'left'
    position.innerHTML = '<b>Posição: </b>'
    document.body.appendChild(position)
    this.position = position
  }

  atualizarPosicao (x = false, y) {
    if (x) this.x_atual = x

    // Exibe a posição atual
    this.position.innerHTML = `
        <b style='display:block;height:fit-content'>Posição: </b>`
    this.position.innerHTML +=
      '<b>X: </b>' + this.x_atual.toFixed(2) + ' metros | '
    this.position.innerHTML += '<b>Y: </b>' + y.toFixed(2) + ' metros'
  }

  setBackground (path) {
    document.body.style.width = '30000vw'
    document.body.style.backgroundImage = 'url(' + path + ')'
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundRepeat = 'repeat-x'
  }

  setRegua () {
    this.regua = document.createElement('div')
    this.regua.classList.add('regua')
    document.body.appendChild(this.regua)
    let width = window.innerWidth * 25
    for (let i = 0; i <= width; i += 100) {
      const div = document.createElement('div')
      div.classList.add('marker')
      div.style.left = i + 'px'
      div.setAttribute('distance', String(i / 100) + ' m')
      this.regua.appendChild(div)
    }
  }
}
