/* appearance */
static const char *fonts[] = {
	"Sans:size=7"
};

/* Colors */
static const char normbordercolor[] = "#444444";
static const char normbgcolor[]     = "#222222";
static const char normfgcolor[]     = "#bbbbbb";
static const char selbordercolor[]  = "#005577";
static const char selbgcolor[]      = "#005577";
static const char selfgcolor[]      = "#eeeeee";

static const char *colors[][3]      = {
 			      /* fg         bg         border */
	[SchemeNorm] = { normfgcolor, normbgcolor, normbordercolor },
	[SchemeSel]  = { selfgcolor, selbgcolor,  selbordercolor  },
};


/* Basic Tweaks */
static const unsigned int borderpx  = 2;        /* border pixel of windows */
static const unsigned int snap      = 10;       /* snap pixel */
static const int showbar            = 1;        /* 0 means no bar */
static const int topbar             = 0;        /* 0 means bottom bar */

static const unsigned int systraypinning = 0;   /* 0: sloppy systray follows selected monitor, >0: pin systray to monitor X */
static const unsigned int systrayonleft = 0;    /* 0: systray in the right corner, >0: systray on left of status text */
static const unsigned int systrayspacing = 2;   /* systray spacing */
static const int systraypinningfailfirst = 1;   /* 1: if pinning fails, display systray on the first monitor, False: display systray on the last monitor*/
static const int showsystray        = 1;        /* 0 means no systray */


/* tagging */
static const char *tags[] = {
	"1:terms", "2:www",
	"3:files", "4:tools",
	"5:remote", "6",
	"7", "8", "9"
};

static const Rule rules[] = {
	/* class      instance    title       tags mask     isfloating   monitor */
	{ "Gimp",	NULL,	NULL,	0,	1,	-1 },
};

/* layout(s) */
static const float mfact	= 0.5; /* factor of master area size [0.05..0.95] */
static const int nmaster	= 1;	/* number of clients in master area */
static const int resizehints	= 0;	/* 1 means respect size hints in tiled resizals */
static const int lockfullscreen = 1; /* 1 will force focus on the fullscreen window */

static const Layout layouts[] = {
	/* symbol     arrange function */
	{ "[]=",      tile },
	{ "[M]",      monocle },    /* first entry is default */
	{ "><>",      NULL },    /* no layout function means floating behavior */
};

/* key definitions */
#define MODKEY Mod4Mask
#define ALTKEY Mod1Mask
#define CTRLKEY ControlMask
#define TAGKEYS(KEY,TAG) \
	{ MODKEY,                       KEY,      view,           {.ui = 1 << TAG} }, \
	{ MODKEY|ControlMask,           KEY,      toggleview,     {.ui = 1 << TAG} }, \
	{ MODKEY|ShiftMask,             KEY,      tag,            {.ui = 1 << TAG} }, \
	{ MODKEY|ControlMask|ShiftMask, KEY,      toggletag,      {.ui = 1 << TAG} },

/* helper for spawning shell commands in the pre dwm-5.0 fashion */
#define SHCMD(cmd) { .v = (const char*[]){ "/bin/sh", "-c", cmd, NULL } }

/* commands */

static const char *roficmd[]	= { "rofi", "-modi", "drun,run", "-show", "run", NULL };
static const char *termcmd[]	= { "xfce4-terminal", NULL };
static const char *filemgr[]	= { "pcmanfm", NULL };
static const char *ss[]		= { "xfce4-screenshooter", "-f", NULL };
static const char *ssw[]	= { "xfce4-screenshooter","-w", NULL };
static const char *ssr[]	= { "xfce4-screenshooter", "-r", NULL };
static const char *vup[]	= { "amixer", "-q", "sset", "Master", "5%+", "unmute" , NULL };
static const char *vdown[]	= { "amixer", "-q", "sset", "Master", "5%-", "unmute" , NULL };
static const char *slock[]	= { "slock", NULL };


static Key keys[] = {
    /* modifier                     key             function        argument */
	{ MODKEY,		XK_r,		spawn,		{.v = roficmd } },
	{ MODKEY,		XK_Return,	spawn,		{.v = termcmd } },

	{ MODKEY,		XK_e,		spawn,		{.v = filemgr } },
	{ 0,			XK_F10,		spawn,		{.v = ss } },
	{ ALTKEY,		XK_F10,		spawn,		{.v = ssw } },
	{ CTRLKEY,		XK_F10,		spawn,		{.v = ssr } },
	{ MODKEY,		XK_l,		spawn,		{.v = slock } },
	{ 0,			XK_F8,		spawn,		{.v = vup } },
	{ 0,			XK_F7,		spawn,		{.v = vdown } },
	{ ALTKEY,		XK_F8,		spawn,		{.v = vup } },
	{ ALTKEY,		XK_F7,		spawn,		{.v = vdown } },

	{ MODKEY,		XK_f,		togglefullscr,	{0} },
	{ MODKEY,		XK_b,		togglebar,	{0} },
	{ MODKEY,		XK_Right,	focusstack,	{.i = +1 } },
	{ MODKEY,		XK_Left,	focusstack,	{.i = -1 } },
	{ MODKEY,		XK_comma,	incnmaster,	{.i = +1 } },
	{ MODKEY,		XK_period,	incnmaster,	{.i = -1 } },
	{ MODKEY|ControlMask,	XK_Left,	setmfact,	{.f = -0.05} },
	{ MODKEY|ControlMask,	XK_Right,	setmfact,	{.f = +0.05} },
	{ MODKEY|ShiftMask,	XK_Return,	zoom,		{0} },
	{ MODKEY,		XK_Tab,		view,		{0} },
	{ MODKEY|ShiftMask,	XK_q,		killclient,	{0} },
	{ MODKEY,		XK_p,		setlayout,	{.v = &layouts[0]} },
	{ MODKEY,		XK_o,		setlayout,	{.v = &layouts[1]} },
	{ MODKEY|ShiftMask,	XK_f,		setlayout,	{.v = &layouts[2]} },
	{ MODKEY,		XK_space,	setlayout,	{0} },
	{ MODKEY|ShiftMask,	XK_space,	togglefloating, {0} },

 	/* { MODKEY|ShiftMask,	XK_p,			resetlayout,	{0} }, */

	{ MODKEY,		XK_0,		view,		{.ui = ~0 } },
	{ MODKEY|ShiftMask,	XK_0,		tag,		{.ui = ~0 } },
	{ MODKEY,		XK_Up,		focusmon,	{.i = -1 } },
	{ MODKEY,		XK_Down,	focusmon,	{.i = +1 } },
	{ MODKEY|ShiftMask,	XK_Up,		tagmon,		{.i = -1 } },
	{ MODKEY|ShiftMask,	XK_Down,	tagmon,		{.i = +1 } },


	TAGKEYS(	XK_1,	0)
	TAGKEYS(	XK_2,	1)
	TAGKEYS(	XK_3,	2)
	TAGKEYS(	XK_4,	3)
	TAGKEYS(	XK_5,	4)
	TAGKEYS(	XK_6,	5)
	TAGKEYS(	XK_7,	6)
	TAGKEYS(	XK_8,	7)
	TAGKEYS(	XK_9,	8)
	{ MODKEY|ShiftMask,	XK_e,		quit,		{0} },
};


/* button definitions */
/* click can be ClkLtSymbol, ClkStatusText, ClkWinTitle, ClkClientWin, or ClkRootWin */
static Button buttons[] = {
	/* click                event mask      button          function        argument */
	/* { ClkLtSymbol,          0,              Button1,        setlayout,      {0} }, */
	/* { ClkLtSymbol,          0,              Button3,        setlayout,      {.v = &layouts[2]} }, */
	{ ClkTagBar,            MODKEY,         Button1,        tag,            {0} },
	{ ClkTagBar,            MODKEY,         Button3,        toggletag,      {0} },

	{ ClkWinTitle,          0,              Button2,        zoom,           {0} },
	{ ClkStatusText,        0,              Button2,        spawn,          {.v = termcmd } },
	{ ClkClientWin,         MODKEY,         Button1,        movemouse,      {0} },
	{ ClkClientWin,         MODKEY,         Button2,        togglefloating, {0} },
	{ ClkClientWin,         MODKEY,         Button3,        resizemouse,    {0} },
	{ ClkTagBar,            0,              Button1,        view,           {0} },
	{ ClkTagBar,            0,              Button3,        toggleview,     {0} },
	{ ClkTagBar,            MODKEY,         Button1,        tag,            {0} },
	{ ClkTagBar,            MODKEY,         Button3,        toggletag,      {0} },
};

