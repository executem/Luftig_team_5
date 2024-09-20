import pygame_widgets
import pygame
from pygame_widgets.slider import Slider
from pygame_widgets.textbox import TextBox

# pygame setup
pygame.init()
screen = pygame.display.set_mode((350, 750))
clock = pygame.time.Clock()
running = True

ac = pygame.image.load("software/ac.png").convert()
ac = pygame.transform.scale(ac, (200,200))

temperatureSliderCoordinates = (40,230)
temperatureSlider = Slider(screen, temperatureSliderCoordinates[0], temperatureSliderCoordinates[1], 200, 15, min=16, max=26, step=1)
temperatureOutput = TextBox(screen, temperatureSliderCoordinates[0] + 230, temperatureSliderCoordinates[1], 25, 25, fontSize=15)

powerSliderCoordinates = (temperatureSliderCoordinates[0], temperatureSliderCoordinates[1] + 30)
powerSlider = Slider(screen, powerSliderCoordinates[0], powerSliderCoordinates[1], 200, 15, min=0, max=100, step=1)
powerOutput = TextBox(screen, powerSliderCoordinates[0] + 230, powerSliderCoordinates[1], 30, 25, fontSize=15)

run = True
while run:
    events = pygame.event.get()
    for event in events:
        if event.type == pygame.QUIT:
            pygame.quit()
            run = False
            quit()

    # fill the screen with a color to wipe away anything from last frame
    screen.fill("purple")

    # RENDER YOUR GAME HERE
    screen.blit(ac, (75, 10),)

    temperatureOutput.setText(temperatureSlider.getValue())
    powerOutput.setText(powerSlider.getValue())

    pygame_widgets.update(event)

    # flip() the display to put your work on screen
    pygame.display.flip()

    clock.tick(60)  # limits FPS to 60

pygame.quit()