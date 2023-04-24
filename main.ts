radio.onReceivedNumber(function (receivedNumber) {
    luzremoto = receivedNumber
    music.playTone(349, music.beat(BeatFraction.Eighth))
})
let luzlocal = 0
let luzremoto = 0
radio.setGroup(1)
radio.setTransmitPower(7)
loops.everyInterval(1000, function () {
    luzlocal = input.lightLevel()
    radio.sendNumber(luzlocal)
    basic.showLeds(`
        # . . . .
        . . . . .
        # . . . .
        . . . . .
        # . . . .
        `)
    if (luzlocal <= 100 && luzremoto <= 100) {
        pins.digitalWritePin(DigitalPin.P1, 1)
        pins.digitalWritePin(DigitalPin.P2, 1)
        basic.showLeds(`
            # . # . #
            . . # . #
            # . # . #
            . . # . #
            # . # . #
            `)
    } else if (luzlocal <= 200 && luzremoto <= 200) {
        pins.digitalWritePin(DigitalPin.P1, 1)
        pins.digitalWritePin(DigitalPin.P2, 0)
        basic.showLeds(`
            # . # . .
            . . # . .
            # . # . #
            . . # . #
            # . # . #
            `)
    } else {
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 0)
        basic.showLeds(`
            # . . . .
            . . . . .
            # . . . .
            . . . . .
            # . # . #
            `)
    }
})
