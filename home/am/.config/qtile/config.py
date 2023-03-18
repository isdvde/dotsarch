from libqtile import bar, init, layout, widget
from libqtile.config import Click, Drag, Group, Key, Match, Screen
from libqtile.lazy import lazy
from libqtile.utils import guess_terminal

import os
import subprocess
from libqtile import hook

mod = "mod4"

keys = [
    # A list of available commands that can be bound to keys can be found
    # at https://docs.qtile.org/en/latest/manual/config/lazy.html
    # Switch between windows
    Key([mod], "Left", lazy.layout.left(), desc="Move focus to left"),
    Key([mod], "Right", lazy.layout.right(), desc="Move focus to right"),
    Key([mod], "Down", lazy.layout.down(), desc="Move focus down"),
    Key([mod], "Up", lazy.layout.up(), desc="Move focus up"),
    Key([mod], "space", lazy.layout.next(), desc="Move window focus to other window"),
    # Move windows between left/right columns or move up/down in current stack.
    # Moving out of range in Columns layout will create new column.
    Key([mod, "shift"], "Left", lazy.layout.shuffle_left(), desc="Move window to the left"),
    Key([mod, "shift"], "Right", lazy.layout.shuffle_right(), desc="Move window to the right"),
    Key([mod, "shift"], "Down", lazy.layout.shuffle_down(), desc="Move window down"),
    Key([mod, "shift"], "Up", lazy.layout.shuffle_up(), desc="Move window up"),
    # Grow windows. If current window is on the edge of screen and direction
    # will be to screen edge - window would shrink.
    Key([mod, "control"], "Left", lazy.layout.grow_left(), desc="Grow window to the left"),
    Key([mod, "control"], "Right", lazy.layout.grow_right(), desc="Grow window to the right"),
    Key([mod, "control"], "Down", lazy.layout.grow_down(), desc="Grow window down"),
    Key([mod, "control"], "Up", lazy.layout.grow_up(), desc="Grow window up"),
    Key([mod], "n", lazy.layout.normalize(), desc="Reset all window sizes"),
    # Toggle between split and unsplit sides of stack.
    # Split = all windows displayed
    # Unsplit = 1 window displayed, like Max layout, but still with
    # multiple stack panes
    Key( [mod, "shift"], "Return", lazy.layout.toggle_split(), desc="Toggle between split and unsplit sides of stack",),
    # Toggle between different layouts as defined below
    Key([mod], "Tab", lazy.next_layout(), desc="Toggle between layouts"),
    Key([mod, "shift"], "q", lazy.window.kill(), desc="Kill focused window"),
    Key([mod, "shift"], "r", lazy.reload_config(), desc="Reload the config"),
    Key([mod, "shift"], "e", lazy.shutdown(), desc="Shutdown Qtile"),
    Key([mod, "shift"], "f", lazy.window.toggle_floating(), desc="Toggle FLoating"),
    Key([mod], "f", lazy.window.toggle_fullscreen()),


    Key([mod], "Return", lazy.spawn("xfce4-terminal"), desc="Launch terminal"),
    Key([mod], "e", lazy.spawn("pcmanfm"), desc="Launch File Explorer"),
    Key([mod], "r", lazy.spawn("rofi -modi drun,run -show run"), desc="Launcher"),
    Key([mod], "o", lazy.layout.toggle_split()),
    Key([mod], "l", lazy.spawn("slock"), desc="Lock Screen"),

    Key([mod], "F7", lazy.spawn("amixer -q sset Master 2%- unmute"), desc="Decrease Volume"),
    Key([mod], "F8", lazy.spawn("amixer -q sset Master 2%+ unmute"), desc="IncreasIncrease Volume"),
    # Key(["F7"], lazy.spawn("amixer -q sset Master 2%- unmute"), desc="Decrease Volume"),
    # Key(["F8"], lazy.spawn("amixer -q sset Master 2%+ unmute"), desc="IncreasIncrease Volume"),

    Key([mod], "F10", lazy.spawn("xfce4-screenshooter -f"), desc="Full Screenshot"),
    Key([mod, "control"], "F10", lazy.spawn("xfce4-screenshooter -r"), desc="Select Screenshot"),
    Key([mod, "mod1"], "F10", lazy.spawn("xfce4-screenshooter -w"), desc="Window Screenshot"),
]

# groups = [Group(i) for i in "123456789"]
groups = [
        Group("1", label="1:terms", position=1),
        Group("2", label="2:www", position=2),
        Group("3", label="3:files", position=3),
        Group("4", label="4:tools", position=4),
        Group("5", label="5:remote", position=5),
        Group("6", position=6),
        Group("7", position=7),
        Group("8", position=8),
        Group("9", position=9)
]

for i in groups:
    keys.extend(
        [
            # mod1 + letter of group = switch to group
            Key(
                [mod],
                i.name,
                lazy.group[i.name].toscreen(),
                desc="Switch to group {}".format(i.name),
            ),
            # mod1 + shift + letter of group = switch to & move focused window to group
            Key(
                [mod, "shift"],
                i.name,
                # lazy.window.togroup(i.name, switch_group=True),
                lazy.window.togroup(i.name),
                desc="Switch to & move focused window to group {}".format(i.name),
            ),
            # Or, use below if you prefer not to switch to that group.
            # # mod1 + shift + letter of group = move focused window to group
            # Key([mod, "shift"], i.name, lazy.window.togroup(i.name),
            #     desc="move focused window to group {}".format(i.name)),
        ]
    )

layouts = [
    layout.Columns(
        border_focus=["#005577"],
        border_normal=["#444444"],
        # border_focus_stack=["#1793d1", "#2cb5e6"],
        border_focus_stack=["#1793d1"],
        border_normal_stack=["#444444"],
        border_width=2,
        margin_on_single=6,
        margin=6
    ),
    layout.Max(),
    # Try more layouts by unleashing below layouts.
    # layout.Stack(num_stacks=2),
    # layout.Bsp(),
    # layout.Matrix(),
    # layout.MonadTall(),
    # layout.MonadWide(),
    # layout.RatioTile(),
    # layout.Tile(),
    # layout.TreeTab(),
    # layout.VerticalTile(),
    # layout.Zoomy(),
]

widget_defaults = dict(
    font="sans",
    fontsize=8,
    padding=3,
)
extension_defaults = widget_defaults.copy()

screens = [
    Screen(
        bottom=bar.Bar(
            [
                widget.CurrentLayout(),
                widget.WindowCount(),
                widget.GroupBox(
                    hide_unused=True,
                    active="#eeeeee",
                    highlight_method='block',
                    foreground="#eeeeee",
                    inactive="#eeeeee",
                    highlight_color=["#005577"]
                ),
                widget.WindowName(
                    foreground="#eeeeee",
                ),
                widget.GenPollText(
                    name="Status",
                    fmt="{}", update_interval=1,
                    func=lambda: subprocess.check_output(
                        os.path.expanduser('~') +
                        "/.config/qtile/bar.sh").decode("utf-8"),
                    padding=2

                ),
                widget.Systray(),
            ],
            15,
            background="#222222",
            opacity=0.9,
            margin=4
        ),
    ),
]

# Drag floating layouts.
mouse = [
    Drag([mod], "Button1", lazy.window.set_position_floating(), start=lazy.window.get_position()),
    Drag([mod], "Button3", lazy.window.set_size_floating(), start=lazy.window.get_size()),
    Click([mod], "Button2", lazy.window.bring_to_front()),
]

dgroups_key_binder = None
dgroups_app_rules = []  # type: list
follow_mouse_focus = True
bring_front_click = False
cursor_warp = False
floating_layout = layout.Floating(
    float_rules=[
        # Run the utility of `xprop` to see the wm class and name of an X client.
        *layout.Floating.default_float_rules,
        Match(wm_class="confirmreset"),  # gitk
        Match(wm_class="makebranch"),  # gitk
        Match(wm_class="maketag"),  # gitk
        Match(wm_class="ssh-askpass"),  # ssh-askpass
        Match(title="branchdialog"),  # gitk
        Match(title="pinentry"),  # GPG key password entry
    ]
)
auto_fullscreen = True
focus_on_window_activation = "smart"
reconfigure_screens = True

# If things like steam games want to auto-minimize themselves when losing
# focus, should we respect this or not?
auto_minimize = True

# When using the Wayland backend, this can be used to configure input devices.
wl_input_rules = None

# XXX: Gasp! We're lying here. In fact, nobody really uses or cares about this
# string besides java UI toolkits; you can see several discussions on the
# mailing lists, GitHub issues, and other WM documentation that suggest setting
# this string if your java app doesn't work correctly. We may as well just lie
# and say that we're a working one by default.
#
# We choose LG3D to maximize irony: it is a 3D non-reparenting WM written in
# java that happens to be on java's whitelist.
wmname = "LG3D"

@hook.subscribe.startup_once
def autostart():
    home = os.path.expanduser('~')
    subprocess.Popen([home + '/.config/qtile/autostart.sh'])
