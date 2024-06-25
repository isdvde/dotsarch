#!/bin/bash

: '
Script bash for Custom menu on dmenu
for manage Screen Output

	by Adrian Moreno
	8/4/20
'


#PROMPT="Screen Output"
OPTS="Laptop\nVGA Extended\nVGA Single\nManual"
VERIFY="[ "$(xrandr -q | grep VGA | cut -d' ' -f2)" = "disconnected" ]"
SCR1="LVDS1"
SCR1_MODE="1024x600"
SCR2="VGA1"
W=1280
H=720
#W=1360
#H=765
#W=1600
#H=900

SET_MODE() {
	local NAME="${1}x${2}"
	local MODE="$NAME $(cvt $1 $2 | grep Mode | sed 's/  */ /g' | cut -d' ' -f3-)"
	xrandr --newmode $MODE
	xrandr --addmode $SCR2 $NAME
	xrandr --output $SCR1 --primary --mode $SCR1_MODE --output $SCR2 --mode $NAME --right-of $SCR1
}


case $1 in
	#"-d") OPT=$(echo -e "$OPTS" | dmenu -i -S -l 15) ;;
	"-d") OPT=$(echo -e "$OPTS" | rofi -dmenu) ;;
	"-m") [ -n "$2" ] && OPT=$2 || echo "Debe pasar un parametro" ;;
	$(echo $1|grep -E "^$") | *) echo "Opcion incorrecta"; exit 1 ;;
esac

case $OPT in
	Laptop) xrandr --output $SCR1 --primary --mode $SCR1_MODE --output $SCR2 --off; nitrogen --restore ;;
	"VGA Single") $VERIFY || { (SET_MODE ${W} ${H}) && xrandr --output $SCR1 --off --output $SCR2 --primary; nitrogen --restore; } ;;
	"VGA Extended") $VERIFY || (SET_MODE ${W} ${H}); nitrogen --restore; xrandr --output $SCR1 --primary; nitrogen --restore; ;;
	"Manual") arandr ;;
esac
