#!/bin/bash

if [ $(ps -e | egrep bar2 | wc -l) -gt 1 ]; then pkill bar2.sh; fi &
xset s off &
xset -dpms &
redshift -O 3400 &
xcompmgr -c -t-5 -l-5 -r6 -o1 -fF -I.07 -O.07 -D2 -C &

if xrandr -q | egrep VGA | egrep connected -q; then
	{ xrandr --newmode 720 74.50  1280 1344 1472 1664  720 723 728 748 -hsync +vsync; xrandr --addmode VGA1 720; xrandr --output VGA1 --mode 720 --primary --output LVDS1 --off; } &
	#{ xrandr --newmode 720 74.50  1280 1344 1472 1664  720 723 728 748 -hsync +vsync; xrandr --addmode VGA-0 720; xrandr --output VGA-0 --mode 720 --primary --output eDP --off; } &
fi

nitrogen --restore &
lxpolkit &
dunst &
bash ~/.dwm/bar.sh &
