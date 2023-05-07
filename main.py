def on_received_number(receivedNumber):
    pins.digital_write_pin(DigitalPin.P0, 1)
    game.game_over()
radio.on_received_number(on_received_number)

def on_button_pressed_a():
    global canal
    canal = canal - 1
    radio.set_group(canal)
    basic.show_number(canal)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    radio.send_number(canal)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global canal
    canal = canal + 1
    radio.set_group(canal)
    basic.show_number(canal)
input.on_button_pressed(Button.B, on_button_pressed_b)

canal = 0
canal = 1
radio.set_group(canal)
radio.set_transmit_power(7)
pins.digital_write_pin(DigitalPin.P0, 0)
basic.show_number(canal)