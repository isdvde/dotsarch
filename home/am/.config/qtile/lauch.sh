#!/bin/bash

# Terminate already running bar instances
killall -q polybar
# If all your bars have ipc enabled, you can also use
# polybar-msg cmd quit

# Launch Polybar, using default config location ~/.config/polybar/config.ini
polybar bar -c ~/.config/qtile/polybar -r 2>&1 | tee -a /tmp/polybar.log & disown
#polybar bar2 -c ~/.config/i3/polybar -r 2>&1 | tee -a /tmp/polybar.log & disown
#polybar bar3 -c ~/.config/i3/polybar -r 2>&1 | tee -a /tmp/polybar.log & disown
#polybar bar4 -c ~/.config/i3/polybar -r 2>&1 | tee -a /tmp/polybar.log & disown

echo "Polybar launched..."
