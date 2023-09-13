#!/bin/bash

#xset s off &
#xset -dpms &
redshift -O 3400 &
#xcompmgr -c -t-5 -l-5 -r6 -o1 -fF -I.07 -O.07 -D2 -C &
picom --animations --animation-window-mass 0.5 --animation-stiffness 230.0 --animation-for-open-window zoom --animation-dampening 21.0 &
# picom &

if xrandr -q | egrep VGA | egrep connected -q; then
	# { xrandr --newmode 720 74.50  1280 1344 1472 1664  720 723 728 748 -hsync +vsync; xrandr --addmode VGA1 720; xrandr --output VGA1 --mode 720 --primary --output LVDS1 --off; } &
	{ xrandr --newmode 768 85.86  1368 1440 1584 1800  768 769 772 795  -HSync +Vsync; xrandr --addmode VGA1 768; xrandr --output VGA1 --mode 768 --primary --output LVDS1 --off; } &
fi


nitrogen --restore &
lxpolkit &
dunst &
bash ~/.local/dwm/bar.sh &
