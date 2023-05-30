radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 40) {
        pino_0 = 0
        pins.digitalWritePin(DigitalPin.P0, 0)
    }
    if (receivedNumber == 41) {
        pino_0 = 1
        pins.digitalWritePin(DigitalPin.P0, 1)
    }
    if (receivedNumber == 42) {
        pino_1 = 0
        pins.digitalWritePin(DigitalPin.P1, 0)
    }
    if (receivedNumber == 43) {
        pino_1 = 1
        pins.digitalWritePin(DigitalPin.P1, 1)
    }
    if (receivedNumber == 44) {
        pino_2 = 0
        pins.digitalWritePin(DigitalPin.P2, 0)
    }
    if (receivedNumber == 45) {
        pino_2 = 1
        pins.digitalWritePin(DigitalPin.P2, 1)
    }
})
function desenhar_gráfico () {
    if (pino_0 == 0 && pino_1 == 0 && pino_2 == 0) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            # . # . #
            `)
    }
    if (pino_0 == 1 && pino_1 == 0 && pino_2 == 0) {
        basic.showLeds(`
            # . . . .
            # . . . .
            # . . . .
            # . . . .
            # . # . #
            `)
    }
    if (pino_0 == 0 && pino_1 == 1 && pino_2 == 0) {
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            . . # . .
            # . # . #
            `)
    }
    if (pino_0 == 0 && pino_1 == 0 && pino_2 == 1) {
        basic.showLeds(`
            . . . . #
            . . . . #
            . . . . #
            . . . . #
            # . # . #
            `)
    }
    if (pino_0 == 1 && pino_1 == 1 && pino_2 == 0) {
        basic.showLeds(`
            # . # . .
            # . # . .
            # . # . .
            # . # . .
            # . # . #
            `)
    }
    if (pino_0 == 0 && pino_1 == 1 && pino_2 == 1) {
        basic.showLeds(`
            . . # . #
            . . # . #
            . . # . #
            . . # . #
            # . # . #
            `)
    }
    if (pino_0 == 1 && pino_1 == 0 && pino_2 == 1) {
        basic.showLeds(`
            # . . . #
            # . . . #
            # . . . #
            # . . . #
            # . . . #
            `)
    }
    if (pino_0 == 1 && pino_1 == 1 && pino_2 == 1) {
        basic.showLeds(`
            # . # . #
            # . # . #
            # . # . #
            # . # . #
            # . # . #
            `)
    }
}
let pino_2 = 0
let pino_1 = 0
let pino_0 = 0
radio.setGroup(1)
radio.setTransmitPower(7)
let casa = 4
pino_0 = 0
pino_1 = 0
pino_2 = 0
basic.showNumber(casa)
basic.pause(1000)
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    # . # . #
    `)
