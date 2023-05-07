serial.setBaudRate(BaudRate.BaudRate115200)
basic.forever(function () {
    basic.showString(serial.readLine())
})
