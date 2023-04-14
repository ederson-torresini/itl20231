# ITL 2023.1

Projeto de condomínio de casas inteligentes.

## Aulas de programação

Tópicos abordados:

- Variáveis
- Lógica booleana
- Estruturas
  - Decisão
  - repetição
- Protocolos
  - Serial
  - I2C
  - SPI
- Sensores
  - Botões
  - Luminosidade
  - Acelerômetro
  - Magnetômetro
  - Inclinação
  - Temperatura
  - Pinos
- Atuadores
  - LEDs
  - Pinos
    - Música
- Rádio
  - Potência
  - Canais/frequências
- Jogo
  - _Sprite_
  - Placar

## Calendário de projetos

Quatro projetos quinzenais e um final.

### LED que acende no escuro

Datas: 10/04 e 17/04.

Sugestão de código (código base retirado do ChatGPT):
```js
let lightLevel = 0
loops.everyInterval(1000, function () {
    // lê o valor do sensor de luminosidade
    lightLevel = input.lightLevel()
    if (lightLevel <= 128) {
        // se o valor for igual ou menor que 100, define o valor do pino P1 como 1
        pins.digitalWritePin(DigitalPin.P1, 1)
        music.playTone(523, music.beat(BeatFraction.Whole))
    } else {
        // caso contrário, define o valor do pino P1 como 0
        pins.digitalWritePin(DigitalPin.P1, 0)
        music.playTone(131, music.beat(BeatFraction.Whole))
    }
})
```

### Jogo com rádio

Datas: 24/04 e 01/05.

Continuação do projeto anterior, com a adição o uso de pilhas para mobilidade com o Micro:bit.

### Interruptor de circuitos

Datas: 08/05 e 15/05.

Continuação do projeto anterior, com a adição de transistores para ligar uma série de LEDs.

### Comunicação serial/I2C/SPI

Datas: 22/05 e 29/05.

Continuação do projeto anterior, com a adição de um sistema microcontrolado (Arduino) ou microprocessado (Raspberry Pi) para comunicação com fio: serial, I2C ou SPI.

### Projeto mensal final

Datas: 06/06 a 19/06.

Casa inteligente.
