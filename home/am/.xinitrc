if [ -d /etc/X11/xinit/xinitrc.d ] ; then
    for f in /etc/X11/xinit/xinitrc.d/?* ; do
        [ -x "$f" ] && . "$f"
    done
    unset f
fi


xrdb ~/.Xresources &
#setxkbmap latam &
#xmodmap ~/.config/customLatamLayout &
#xmodmap -e "clear Lock" &

(setxkbmap latam && xmodmap ~/.config/customLatamLayout && xmodmap -e "clear Lock") &



xset -dpms &
xset s off &
xset s off i-dpms &
#xinput set-prop 12 290 1 &
#xinput set-prop 12 317 1 &
#xinput set-prop 12 294 1 &
#xinput set-prop 12 316 1 &
#xinput set-prop 13 310 1 &
XINPUTDEV=$(xinput  | egrep Touch | egrep -E -w -o "id=[0-9]+" | sed -E "s/id=//g")
XINPUTPROP=$(xinput list-props ${XINPUTDEV} | egrep "Accel" | head -1 | egrep -E -o -w "\([0-9]+\)" | sed -E "s/\(([0-9]+)\)/\1/g")
#xinput set-prop ${XINPUTDEV} ${XINPUTPROP} 0.6 &
xset r rate 200 60 &

# exec i3
#exec openbox-session

if text -z "$DBUS_SESSION_BUS_ADDRESS"; then
   eval $(dbus-launch --sh-syntax --exit-with-session)
fi

bash ~/.config/openbox/autostart
exec xfwm4
#exec dbus-launch --exit-with-session xfwm4


