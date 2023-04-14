input.onButtonPressed(Button.A, function () {
    pins.digitalWritePin(DigitalPin.P1, 1)
    music.playTone(262, music.beat(BeatFraction.Whole))
    basic.showIcon(IconNames.Square)
})
input.onButtonPressed(Button.B, function () {
    pins.digitalWritePin(DigitalPin.P1, 0)
    music.playTone(349, music.beat(BeatFraction.Whole))
    basic.showIcon(IconNames.SmallSquare)
})
basic.showIcon(IconNames.Heart)
loops.everyInterval(10000, function () {
    if (input.lightLevel() <= 128) {
        pins.digitalWritePin(DigitalPin.P1, 1)
        basic.showIcon(IconNames.Diamond)
    } else {
        pins.digitalWritePin(DigitalPin.P1, 0)
        basic.showIcon(IconNames.SmallDiamond)
    }
})
