radio.onReceivedNumber(function (receivedNumber) {
    pins.digitalWritePin(DigitalPin.P0, 1)
    game.gameOver()
})
input.onButtonPressed(Button.A, function () {
    canal = canal - 1
    radio.setGroup(canal)
    basic.showNumber(canal)
})
input.onButtonPressed(Button.AB, function () {
    radio.sendNumber(canal)
})
input.onButtonPressed(Button.B, function () {
    canal = canal + 1
    radio.setGroup(canal)
    basic.showNumber(canal)
})
let canal = 0
canal = 1
radio.setGroup(canal)
radio.setTransmitPower(7)
pins.digitalWritePin(DigitalPin.P0, 0)
basic.showNumber(canal)
