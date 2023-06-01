def on_button_pressed_a():
    global numero, numeroled
    if check == 0:
        numero += -1
    if check == 1:
        numeroled += -1
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    global nfinal, check, radiosemi
    if check == 0:
        nfinal = numero
        check = 1
    elif check == 1:
        radiosemi = nfinal * 10
        radio.send_number(radiosemi + numeroled)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global numero, numeroled
    if check == 0:
        numero += 1
    if check == 1:
        numeroled += 1
input.on_button_pressed(Button.B, on_button_pressed_b)

radiosemi = 0
nfinal = 0
check = 0
numeroled = 0
numero = 0
radio.set_group(1)
radio.set_transmit_power(7)
numero = 1
numeroled = 0
check = 0

def on_forever():
    global numero, numeroled
    if check == 0:
        basic.show_number(numero)
    elif check == 1:
        basic.show_number(numeroled)
    if numero >= 13:
        numero = 1
    elif numero <= 0:
        numero = 12
    if numeroled >= 3:
        numeroled = 0
    elif numeroled < 0:
        numeroled = 2
basic.forever(on_forever)
