radio.onReceivedNumber(function on_received_number(receivedNumber: number) {
    pins.digitalWritePin(DigitalPin.P0, 1)
    game.gameOver()
})
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    canal = canal - 1
    radio.setGroup(canal)
    basic.showNumber(canal)
})
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    radio.sendNumber(canal)
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
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
