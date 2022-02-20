#!/bin/bash

#TEMP=$(acpi -t | cut -d" " -f 4)
TEMP=$(cat /sys/class/thermal/thermal_zone0/temp | xargs -I% echo "% / 1000" | bc)

echo "${TEMP}°C"
echo "${TEMP}°C"

([[ $(echo "$TEMP > 60" | bc) -eq 1 ]] && [[ $(echo "$TEMP <= 80" | bc) -eq 1 ]]) && echo "#B58900"


[[ $(echo "$TEMP > 80" | bc) -eq 1 ]] && exit 33

exit 0

