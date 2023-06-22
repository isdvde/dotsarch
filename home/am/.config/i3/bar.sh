#!/bin/bash

DATE() ( local DATE=$(date '+%a, %d %^b %H:%M'); echo -n $DATE; )

INTERNET() (
	ping -c1 -W1 8.8.8.8 > /dev/null && echo -n "ON" || echo -n "OFF" 
)

MEM() (
	# local MEM=$(free | grep Mem | sed 's/  */ /g' | cut -d" " -f3 | xargs -I% echo "scale=2; % / 1024" | bc);
	# local TOT=$(free | grep Mem | sed 's/  */ /g' | cut -d" " -f2 | xargs -I% echo "scale=2; % / 1024" | bc);
	local TOT=$(cat /proc/meminfo | grep -Ei "memtotal" | sed -r "s/(  +)/ /g" | cut -d' ' -f2 | paste -sd' ' | sed -r "s/(.*)/scale=2; \1 \/ 1024/g" | bc)
	local MEM=$(cat /proc/meminfo | grep -Ei "memtotal|memfree|buffer|cached" | head -4 | sed -r "s/(  +)/ /g" | cut -d' ' -f2 | paste -sd' ' | sed -r "s/(.*) (.*) (.*) (.*)/scale=2; ((\1 - \2) - (\3 + \4))\/1024/g" | bc)
	local PERC=$(echo "scale=2; ($MEM*100)/$TOT" | bc);
	echo -n "${MEM}M (${PERC}%)";
)

CPU() (
	local LOAD=$(cat /proc/loadavg | cut -d" " -f1 | xargs -I% echo "scale=2; (%/4)*100" | bc | sed 's/\..*//g');
	echo -n "${LOAD}";
)

VOL() (
	local VOL=$(amixer -M get Master | grep -E -o "\[[0-9]+%\]"	| head -1);
	echo -n $VOL;
)

HOME() (
	local HD=$(df /home | grep / | sed 's/  */ /g' | cut -d" " -f4 | xargs -I% echo "scale=2; % / 1024/1024" | bc | xargs -I% echo "%G");
	local PER=$(df /home | grep / | sed 's/  */ /g' | cut -d" " -f5);
	echo -n "${HD}(${PER})";
)

IFACE() (
	local if=$(ip route | grep default | cut -d" " -f5);
	local ip=$(ip route show dev $if | grep kernel | sed 's/  */ /g' | cut -d" " -f7);
	echo -n "$ip";
)

FMORE() (
	local PER=$(df /mnt/fvckingmore | grep / | sed 's/  */ /g' | cut -d" " -f5);
	echo -n "$(df /mnt/fvckingmore | grep / | sed 's/  */ /g' | cut -d" " -f4 | xargs -I% echo "scale=2; % / 1024/1024" | bc | xargs -I% echo "%G")(${PER})";
)

TEMP() (
	local TEMP=$(cat /sys/class/thermal/thermal_zone0/temp | xargs -I% echo "% / 1000" | bc);
	echo -n "${TEMP}°C";
)

TRAF() (
	OBTAIN() (
		local current=$(cat /sys/class/net/{w,e}*/statistics/${1}_bytes | paste -sd'+' | bc);
		local cache="/tmp/${1}g";
		[ -f $cache ] && old=$(cat $cache) || old=0;
		echo $current > $cache;
		echo "$(( (current-old) / 1024 ))";
	)

	local down=$(OBTAIN rx);
	local up=$(OBTAIN tx);
	echo "D ${down}K U ${up}K";
) 

BAT() (
	echo $(acpi -b | sed -r "s/(  +|\t)/ /g" | cut -d' ' -f4 | sed "s/,//g")
)

WINDOW() (
	echo $(xprop -id $(xprop -root _NET_ACTIVE_WINDOW | cut -d ' ' -f 5) WM_NAME | sed -nr 's/.*= "(.*)"$/\1/p')
)

while :; do
	#echo "V $(VOL)   |   M $(MEM)   |   /H $(HOME)  /F $(FMORE)   |   $(IFACE)  $(TRAF)   |   B $(BAT)   |   C $(CPU)   |   $(DATE)"; 
	#echo "V $(VOL)   |   M $(MEM)   |   /H $(HOME)  /F $(FMORE)   |   $(IFACE)  $(TRAF)   |   C $(CPU)   |   $(DATE)"; 
	echo -n "V $(VOL)  |  M $(MEM)  |  /H $(HOME)  |  $(IFACE)  |  C $(CPU)  |  $(DATE)"; 
	# echo -n "V $(VOL)  |  M $(MEM)  |  /H $(HOME)  |  $(IFACE)  |  C $(CPU)"; 
	sleep 1;
done
