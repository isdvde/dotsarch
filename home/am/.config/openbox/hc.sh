#!/bin/bash

xdotool behave_screen_edge top-right exec bash -c "rofi -modi drun,run -show drun -icon-theme 'Papirus-Dark' -show-icons" &
xdotool behave_screen_edge top-left exec bash -c "rofi -modi window -show window -icon-theme 'Papirus-Dark' -show-icons" &


