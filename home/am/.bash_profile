#
# ~/.bash_profile
#

[[ -f ~/.bashrc ]] && . ~/.bashrc

if [[ -z $DISPLAY ]] && [[ $(tty) = /dev/tty1 ]]; then startx; fi

export PGHOST=localhost
export PGPORT=5432
export PGDATA="/home/am/pgsql/data"
PATH=$PATH:/home/am/pgsql/bin
