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
    this.velocidade = variables.velocidade
    this.angulo = variables.angulo
    this.radianos = (Math.PI * this.angulo) / 180
    this.gravidade = variables.gravidade
    this.escala = variables.escala

    // Variáveis de controle (DEPENDENTES DAS VARIÁVEIS ACIMA)
    this.vel_x = Math.cos(this.radianos) * this.velocidade * this.escala
    this.vel_y = Math.sin(this.radianos) * this.velocidade * this.escala
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
  lancar () {
    const objeto = new Objeto({
      width: 30,
      height: 30,
      velocidade: this.velocidade
    });

    objeto.setBall({ color: '#F00' });
    objeto.setPosition({ x: this.x, y: this.y });
    objeto.render();
    objeto.rotate();

    // Cria um intervalo para atualizar a posição do objeto
    const frames_total = this.tempo_total_lancamento * 50;
    let frame = 0;

    const movimento = setInterval(() => {

        this.x = (this.x + this.vel_x) * this.escala;

        this.y = (this.y + (this.vel_y)) * this.escala;

        this.vel_y -= this.gravidade;

        objeto.setPosition({ x: this.x, y: this.y });
        
        frame++;
        if(frame >= frames_total)
        {
            objeto.stopRotate();
            clearInterval(movimento);
            return;
        }
    }, 20);

  }
}
