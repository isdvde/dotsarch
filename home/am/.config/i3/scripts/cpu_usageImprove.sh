#/bin/bash

LOAD=$(mpstat 1 1 | grep -i average | sed -e 's/  */ /g' -e 's/,/\./g' | cut -d" " -f12 )


CPU=$(echo "100.00 - $LOAD" | bc)

echo "${CPU}%"
echo "${CPU}%"

[ $(echo "$CPU > 70" | bc) -eq 1 ] && exit 33

exit 0



