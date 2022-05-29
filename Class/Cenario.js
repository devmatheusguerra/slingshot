class Cenario {
  constructor (lancador) {
    this.x_atual = 0
    this.lancadorController = lancador
    this.createCron()
    this.createPosicao()
    this.setRegua()
  }

  setBackgroundSquare () {
    const table = document.createElement('table');
    table.style.margin = '0';
    table.style.padding = '0';
    document.body.style.padding = '0';
    document.body.style.margin = '0';
    table.style.height = window.innerHeight + 'px';
    table.style.borderCollapse = 'collapse'
    table.style.position = 'absolute';
    table.style.top = '0px';
    table.style.left = '0px';
    table.style.zIndex = '-1';
    
    for(let i = parseInt(window.innerHeight / 100); i > 0 ; i--) {
      const row = document.createElement('tr');
      for(let j = 0; j < 1000; j++) {
        const cell = document.createElement('td');
        cell.style.width = '97px';
        cell.style.height = '100px';
        cell.style.border = '1px solid black';
        cell.style.backgroundColor = 'transparent';
        cell.innerHTML = `
        <span> H = ${i.toFixed(1)}</span>
        <br>
        <span> D = ${j.toFixed(1)}</span>
        `;

        row.appendChild(cell);
      }
      table.appendChild(row);
    }

    
    document.body.appendChild(table);

  }

  createCron () {
    let timer = document.createElement('div')
    timer.style.position = 'fixed'
    timer.style.left = '0px'
    timer.style.top = '0px'
    timer.style.color = '#000'
    timer.style.fontSize = '20px'
    timer.style.textAlign = 'center'
    timer.style.width = "max-content"
    timer.style.padding = "0 5px"
    timer.style.backgroundColor = "rgba(255,255,255,0.5)"
    document.body.appendChild(timer)
    this.timer = timer
  }

  atualizarCron (time) {
    this.timer.innerHTML =
      '<p><b>Tempo decorrido: </b>' + time.toFixed(2) + ' segundos</p>'
  }

  createPosicao () {
    let position = document.createElement('div')
    position.style.backgroundColor = 'rgba(255,255,255,.5)'
    position.style.width = '200px'
    position.style.position = 'fixed'
    position.style.right = '0px'
    position.style.top = '0px'
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
    this.position.innerHTML += '<b>X: </b>' + this.x_atual.toFixed(1) + ' metros'
    this.position.innerHTML += '<br>'
    this.position.innerHTML += '<b>Y: </b>' + y.toFixed(1) + ' metros'
    this.position.innerHTML += '<hr>'
    this.position.innerHTML += '<b>Altura Máxima: </b>' + this.lancadorController.altura.toFixed(1) + ' metros'
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
    let width = window.innerWidth * 100
    for (let i = 0; i <= width; i += 100) {
      const div = document.createElement('div')
      div.classList.add('marker')
      div.setAttribute('id', 'p' + i / 100)
      div.style.left = i + 'px'
      div.setAttribute('distance', String(i / 100) + ' m')
      this.regua.appendChild(div)
    }
  }
}
