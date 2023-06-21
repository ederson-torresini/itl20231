raspberrypi = ""
serial.set_baud_rate(BaudRate.BAUD_RATE115200)
canal = 100
radio.set_group(canal)
basic.show_icon(IconNames.HAPPY)

def on_forever():
    global raspberrypi
    raspberrypi = serial.read_line()
    radio.send_number(parse_float(raspberrypi))
    basic.show_string(raspberrypi)
basic.forever(on_forever)
