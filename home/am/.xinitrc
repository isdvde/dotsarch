xrdb ~/.Xresources &
#setxkbmap latam &
#xmodmap ~/.config/customLatamLayout &
#xmodmap -e "clear Lock" &

(setxkbmap latam && xmodmap ~/.config/customLatamLayout && xmodmap -e "clear Lock") &



xset -dpms &
xset s off &
xset s off i-dpms &
xinput set-prop 12 290 1 &
xinput set-prop 12 317 1 &
xinput set-prop 12 294 1 &
xinput set-prop 12 316 1 &


exec i3
#exec openbox-session
#exec spectrwm
#exec dwm
#exec dwm61
