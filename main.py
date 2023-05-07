serial.set_baud_rate(BaudRate.BAUD_RATE115200)

def on_forever():
    basic.show_string(serial.read_line())
basic.forever(on_forever)
