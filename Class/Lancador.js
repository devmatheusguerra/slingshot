class Lancador {
  constructor (variables) {
    // Verifica as variáveis obrigatórias
    if (
      !variables.hasOwnProperty('x') ||
      !variables.hasOwnProperty('y') ||
      !variables.hasOwnProperty('velocidade') ||
      !variables.hasOwnProperty('angulo') ||
      !variables.hasOwnProperty('gravidade') ||
      !variables.hasOwnProperty('escala')
    ) {
      console.warn('Informações insuficientes para lançamento')
      console.warn(
        'Dados necessários: x, y, velocidade, angulo, cor, gravidade, escala'
      )
      return false
    }

    this.x = variables.x
    this.y = variables.y
    this.angulo = variables.angulo
    this.radianos = (Math.PI * this.angulo) / 180
    this.escala = variables.escala
    this.velocidade = variables.velocidade * this.escala
    this.gravidade = variables.gravidade * this.escala
    this.fps = variables.fps || 60
    // Variáveis de controle (DEPENDENTES DAS VARIÁVEIS ACIMA)
    this.vel_x = Math.cos(this.radianos) * this.velocidade
    this.vel_y = Math.sin(this.radianos) * this.velocidade
    this.tempo_total_lancamento =
      (2 * this.velocidade * Math.sin(this.radianos)) / this.gravidade
    this.altura_maxima =
      (100 * Math.sin(this.radianos) ** 2) / (2 * this.gravidade)
    this.alcance_total =
      this.velocidade * Math.cos(this.radianos) * this.tempo_total_lancamento
  }

  // Getters
  get velocidades () {
    return { X: this.vel_x, Y: this.vel_y }
  }

  get tempo () {
    return this.tempo_total_lancamento
  }

  get altura () {
    return this.altura_maxima
  }

  get alcance () {
    return this.alcance_total
  }

  // Métodos
  posicao_x_aos (tempo) {
    return this.x + this.vel_x * tempo
  }

  posicao_y_aos (tempo) {
    return this.y + this.vel_y * tempo - (this.gravidade * tempo ** 2) / 2
  }

  lancar () {
    // Criando o projétil
    const objeto = new Objeto({
      width: 30,
      height: 30,
      velocidade: this.velocidade / this.escala
    })

    objeto.setImage('./bola.png')
    objeto.setPosition({ x: this.x, y: this.y })
    objeto.render()
    objeto.rotate()

    // Criando o cenário
    let cenario = new Cenario()
    cenario.setBackground('./scene.png')
    // Criando o timer
    const tempo_em_milissegundos = this.tempo_total_lancamento * 1000
    console.log(this.tempo_total_lancamento)
    this.current_time = 0
    this.timer = setInterval(() => {
      this.current_time += 1000 / this.fps
      if (this.current_time >= tempo_em_milissegundos) {
        clearInterval(this.timer)
        objeto.stopRotate()
        objeto.setPosition({ y: 0 });
        cenario.atualizarPosicao(false, 0)
        cenario.atualizarCron(this.current_time / 1000)
      } else {
        let x = this.posicao_x_aos(this.current_time / 1000)
        let y = this.posicao_y_aos(this.current_time / 1000)
        objeto.setPosition({ x, y })
        cenario.atualizarCron(this.current_time / 1000)
        cenario.atualizarPosicao(x/ this.escala, y/ this.escala)
      }
    }, 1000 / this.fps);
  }
}
