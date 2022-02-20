#!/bin/bash
# Example Bar Action Script for Linux.
# Requires: acpi, iostat.
# Tested on: Debian 10, Fedora 31.
#

datee() {

	DATE=$(date '+%a, %d %^b %H:%M');

	echo -n $DATE;

}

mem() {

	MEM=$(free | grep Mem | sed 's/  */ /g' | cut -d" " -f3 | xargs -I% echo "scale=2; % / 1024" | bc)
	TOT=$(free | grep Mem | sed 's/  */ /g' | cut -d" " -f2 | xargs -I% echo "scale=2; % / 1024" | bc)
	PERC=$(echo "scale=2; ($MEM*100)/$TOT" | bc)


	echo -n "${MEM}M (${PERC}%)"


}


cpuUsage() {

	#LOAD=$(mpstat 1 1 | grep -i Ave | sed -e 's/  */ /g' -e 's/,/\./g' | cut -d" " -f12 )
	#LOAD=$(top -bn1 | grep Cpu | sed -e 's/  */ /g' -e 's/,/\./g' | cut -d" " -f8)
	LOAD=$(cat /proc/loadavg | cut -d" " -f1 | xargs -I% echo "scale=2; %/2" | bc)

	#CPU=$(echo "100.00 - $LOAD" | bc)

	#echo -n "${CPU}%"
	echo -n "${LOAD}"


}

vol() {

	#VOL=$(amixer -M get Master | grep -E -o "\[[0-9]+%\]" | xargs -n1 -I% echo -n "% " | sed 's/  */ /g' | cut -d" " -f1)
	VOL=$(amixer -M get Master | grep -E -o "\[[0-9]+%\]")

	echo -n $VOL

}


home() {

	HD=$(df /home | grep / | sed 's/  */ /g' | cut -d" " -f4 | xargs -I% echo "scale=2; % / 1024" | bc | xargs -I% echo "%M")
	PER=$(df /home | grep / | sed 's/  */ /g' | cut -d" " -f5)

	echo -n "${HD}(${PER})"

}


iface() {

	if=$(ip route | grep default | cut -d" " -f5)
	ip=$(ip route show dev $if | grep kernel | sed 's/  */ /g' | cut -d" " -f7)

	echo -n "$ip"
}



fmore() {

	PER=$(df /mnt/fvckingmore | grep / | sed 's/  */ /g' | cut -d" " -f5)
	echo -n "$(df /mnt/fvckingmore | grep / | sed 's/  */ /g' | cut -d" " -f4 | xargs -I% echo "scale=2; % / 1024" | bc | xargs -I% echo "%M")(${PER})"

}

temper() {

	TEMP=$(cat /sys/class/thermal/thermal_zone0/temp | xargs -I% echo "% / 1000" | bc)

	echo -n "${TEMP}°C"

}


obtain() {

	local current=$(cat /sys/class/net/{w,e}*/statistics/${1}_bytes | paste -sd'+' | bc)

	local cache="/tmp/$1"

	[ -f $cache ] && old=$(cat $cache) || old=0
	echo $current > $cache
	echo "$(( (current-old) / 1024 ))"
}

TRAF() {

	down=$(obtain rx)
	up=$(obtain tx)

	echo "D ${down}K U ${up}K"
} 





while :; do

	#xsetroot -name "  V $(vol)  |  M $(mem)  |  /H $(home) /F $(fmore)  |  $(iface)  $(TRAF)  $(gge)  |  C $(cpuUsage)  |  T $(temper)  |  $(datee)";
	#xsetroot -name "   V $(vol)   |   M $(mem)   |   /H $(home)  /F $(fmore)   |   $(iface)  $(TRAF)  $(gge)   |   C $(cpuUsage)   |   T $(temper)   |   $(datee)";
	echo "V $(vol)   |   M $(mem)   |   /H $(home)  /F $(fmore)   |   $(iface)  $(TRAF)   |   C $(cpuUsage)   |   T $(temper)   |   $(datee)"; 



	#sleep 2;
	sleep 0.5;
done
