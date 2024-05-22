#!/bin/bash

WALL_FORLDER="/home/am/pictures"
WALL="animatedwall.gif"

killall mpv; xwinwrap -g 1920x1080+0+0 -ni -ov -- mpv --loop-file=inf --speed=1 -wid WID ${WALL_FORLDER}/${WALL} &

