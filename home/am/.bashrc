# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

reset="\[\033[0m\]"
bold="\[\033[1m\]"
default="\[\033[39m\]"
black="\[\033[30m\]"
red="\[\033[31m\]"
green="\[\033[32m\]"
yellow="\[\033[33m\]"
blue="\[\033[34m\]"
magenta="\[\033[35m\]"
cyan="\[\033[36m\]"
white="\[\033[97m\]"

# don't put duplicate lines or lines starting with space in the history.
# See bash(1) for more options
HISTCONTROL=ignoreboth

# append to the history file, don't overwrite it
shopt -s histappend

# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# set variable identifying the chroot you work in (used in the prompt below)
if [ -z "${debian_chroot:-}" ] && [ -r /etc/debian_chroot ]; then
    debian_chroot=$(cat /etc/debian_chroot)
fi

# uncomment for a colored prompt, if the terminal has the capability; turned
# off by default to not distract the user: the focus in a terminal window
# should be on the output of commands, not on the prompt
force_color_prompt=yes

# enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'
    #alias dir='dir --color=auto'
    #alias vdir='vdir --color=auto'

    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
fi

# Alias definitions.

if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi

# enable programmable completion features (you don't need to enable
# this, if it's already enabled in /etc/bash.bashrc and /etc/profile
# sources /etc/bash.bashrc).
if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi

#CASE INSENSITIVE
bind "set completion-ignore-case on"
bind "set show-all-if-ambiguous on"

#export PS1="\n[\u@\h:\w]\n\t \$?\n\\$ \[$(tput sgr0)\]"
#export PS1="\033[0m\n[ \u@\h:\w ]\n\\$ "
#export PS1="\n\033[1m\033[31m[\033[0m\033[32m\u\033[96m@\033[32m\h:\033[33m\w\033[31m\033[1m]\n\\$ \033[0m"
#PS1="\n\033[1;31m[ \033[0;32m\u\033[0;96m@\033[0;32m\h:\033[0;33m\w\033[1;31m ]\n\033[00m$ \[$(tput sgr0)\]"
#PS1="\n\[\033[1;31m\][ \[\033[0;32m\]\u\[\033[0;96m\]@\[\033[0;32m\]\h:\[\033[0;33m\]\w\[\033[1;31m\] ]\n\[\033[00m\]$ \[$(tput sgr0)\]"
#PS1="\n$bold$red[ $reset$green\u$reset$cyan@$reset$green\h:$reset$yellow\w$reset$bold$red ]\n$reset$ \[$(tput sgr0)\]"
PS1="\n$bold$red[$green\u$blue@$green\h:$yellow\w$bold$red]$default$ $reset\[$(tput sgr0)\]"

alias l='ls -XCF --group-directories-first'
alias ll='ls -lXh --group-directories-first'
alias la='ls -lXha --group-directories-first'
alias xx='startx'

export HISTFILESIZE=
export HISTSIZE=
export VISUAL=vim
export EDITOR=$VISUAL
export PATH=$PATH:/sbin:/bin:/usr/bin:/usr/local/bin:/usr/sbin

export PGHOST=localhost
export PGPORT=5432
export PGDATA="/home/am/pgsql/data"
export PATH="/home/am/pgsql/bin:${PATH}"
export PATH="/home/am/php/bin:/home/am/php/sbin:${PATH}"

export JAVA_HOME=/usr/local/src/jdk13
export PATH=${JAVA_HOME}/bin:${PATH}
