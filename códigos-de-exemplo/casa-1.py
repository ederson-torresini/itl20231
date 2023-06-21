def on_received_number(receivedNumber):
    if receivedNumber == 10:
        pins.digital_write_pin(DigitalPin.P0, 0)
        basic.show_number(0)
    if receivedNumber == 11:
        pins.digital_write_pin(DigitalPin.P0, 1)
        basic.show_number(1)
    if receivedNumber == 12:
        pins.digital_write_pin(DigitalPin.P1, 0)
        basic.show_number(2)
    if receivedNumber == 13:
        pins.digital_write_pin(DigitalPin.P1, 1)
        basic.show_number(3)
    if receivedNumber == 14:
        pins.digital_write_pin(DigitalPin.P2, 0)
        basic.show_number(4)
    if receivedNumber == 15:
        pins.digital_write_pin(DigitalPin.P2, 1)
        basic.show_number(5)
radio.on_received_number(on_received_number)

radio.set_group(1)
radio.set_transmit_power(7)
basic.show_number(1)
