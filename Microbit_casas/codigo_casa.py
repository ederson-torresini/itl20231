def on_received_number(receivedNumber):
    global numeroRecebido
    numeroRecebido = receivedNumber
radio.on_received_number(on_received_number)

def led2():
    if numeroRecebido == 60: #Trocar 60 pelo numero da casa(se for casa 1 bota 10... se for casa 12 bota 120)
        if pins.digital_read_pin(DigitalPin.P0) == 0:
            pins.digital_write_pin(DigitalPin.P0, 1)
        else:
            pins.digital_write_pin(DigitalPin.P0, 0)
    if numeroRecebido == 61: #Trocar 61 pelo numero da casa(se for casa 1 bota 11... se for casa 12 bota 121)
        if pins.digital_read_pin(DigitalPin.P1) == 0:
            pins.digital_write_pin(DigitalPin.P1, 1)
        else:
            pins.digital_write_pin(DigitalPin.P1, 0)
    if numeroRecebido == 62: #Trocar 62 pelo numero da casa(se for casa 1 bota 12... se for casa 12 bota 122)
        if pins.digital_read_pin(DigitalPin.P2) == 0:
            pins.digital_write_pin(DigitalPin.P2, 1)
        else:
            pins.digital_write_pin(DigitalPin.P2, 0)
def draw():
    if pins.digital_read_pin(DigitalPin.P0) == 0 and pins.digital_read_pin(DigitalPin.P1) == 0 and pins.digital_read_pin(DigitalPin.P2) == 0:
        basic.show_leds("""
            . . . . .
                        . . . . .
                        . . . . .
                        . . . . .
                        # . # . #
        """)
    if pins.digital_read_pin(DigitalPin.P0) == 0 and pins.digital_read_pin(DigitalPin.P1) == 1 and pins.digital_read_pin(DigitalPin.P2) == 0:
        basic.show_leds("""
            . . # . .
                        . . # . .
                        . . # . .
                        . . # . .
                        # . # . #
        """)
    if pins.digital_read_pin(DigitalPin.P0) == 0 and pins.digital_read_pin(DigitalPin.P1) == 0 and pins.digital_read_pin(DigitalPin.P2) == 1:
        basic.show_leds("""
            . . . . #
                        . . . . #
                        . . . . #
                        . . . . #
                        # . # . #
        """)
    if pins.digital_read_pin(DigitalPin.P0) == 0 and pins.digital_read_pin(DigitalPin.P1) == 1 and pins.digital_read_pin(DigitalPin.P2) == 1:
        basic.show_leds("""
            . . # . #
                        . . # . #
                        . . # . #
                        . . # . #
                        # . # . #
        """)
        if pins.digital_read_pin(DigitalPin.P0) == 1 and pins.digital_read_pin(DigitalPin.P1) == 1 and pins.digital_read_pin(DigitalPin.P2) == 1:
            basic.show_leds("""
                # . # . #
                                # . # . #
                                # . # . #
                                # . # . #
                                # . # . #
            """)
    if pins.digital_read_pin(DigitalPin.P0) == 1 and pins.digital_read_pin(DigitalPin.P1) == 0 and pins.digital_read_pin(DigitalPin.P2) == 1:
        basic.show_leds("""
            # . . . .
                        # . . . .
                        # . . . .
                        # . . . .
                        # . # . #
        """)
    if pins.digital_read_pin(DigitalPin.P0) == 1 and pins.digital_read_pin(DigitalPin.P1) == 0 and pins.digital_read_pin(DigitalPin.P2) == 1:
        basic.show_leds("""
            # . . . #
                        # . . . #
                        # . . . #
                        # . . . #
                        # . # . #
        """)
    if pins.digital_read_pin(DigitalPin.P0) == 1 and pins.digital_read_pin(DigitalPin.P1) == 1 and pins.digital_read_pin(DigitalPin.P2) == 0:
        basic.show_leds("""
            # . # . .
                        # . # . .
                        # . # . .
                        # . # . .
                        # . # . #
        """)
numeroRecebido = 0
radio.set_group(1)
radio.set_transmit_power(7)

def on_forever():
    led2()
    draw()
basic.forever(on_forever)
