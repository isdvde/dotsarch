"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => General
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Sets how many lines of history VIM has to remember
set history=500

" Enable filetype plugins
filetype plugin on
filetype indent on

" Set to auto read when a file is changed from the outside
set autoread

" With a map leader it's possible to do extra key combinations
" like <leader>w saves the current file
let mapleader = " "


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => VIM user interface
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

"Always show current position
set ruler

" Height of the command bar
set cmdheight=1

" A buffer becomes hidden when it is abandoned
"set hid

" Ignore case when searching
set ignorecase

" When searching try to be smart about cases 
set smartcase

" Highlight search results
set hlsearch

" Makes search act like search in modern browsers
set incsearch 

" Don't redraw while executing macros (good performance config)
" set lazyredraw 

" For regular expressions turn magic on
" set magic

" Show matching brackets when text indicator is over them
set showmatch 
" How many tenths of a second to blink when matching brackets
" set mat=2

" No annoying sound on errors
""set noerrorbells
""set novisualbell
""set t_vb=
""set tm=500

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Colors and Fonts
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Enable syntax highlighting
"syntax on

" Enable 8 colors palette in Gnome Terminal
set t_Co=8


"set background=dark

" Set utf8 as standard encoding and en_US as the standard language
set encoding=utf8

" Use Unix as the standard file type
set ffs=unix,dos,mac

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Files, backups and undo
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Turn backup off, since most stuff is in SVN, git et.c anyway...
set nobackup
set nowb
set noswapfile

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Text, tab and indent related
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Use spaces instead of tabs
""set expandtab

" Be smart when using tabs ;)
set smarttab

" 1 tab == 4 spaces
set tabstop=4
set shiftwidth=4
set softtabstop=4

" Linebreak on 500 characters
" set lbr
" set tw=500

set ai "Auto indent
set si "Smart indent
" set wrap "Wrap lines



"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Moving around, tabs, windows and buffers
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Map <Space> to / (search) and Ctrl-<Space> to ? (backwards search)
" map <space> /
" map <c-space> ?

" Disable highlight when <leader><cr> is pressed
map <silent> <leader><cr> :noh<cr>

" Smart way to move between windows
" map <C-j> <C-W>j
" map <C-k> <C-W>k
" map <C-h> <C-W>h
" map <C-l> <C-W>l

" Close the current buffer
" map <leader>bd :Bclose<cr>:tabclose<cr>gT

" Close all the buffers
" map <leader>ba :bufdo bd<cr>

map <leader>l :bnext<cr>
map <leader>h :bprevious<cr>

" Useful mappings for managing tabs
" map <leader>tn :tabnew<cr>
" map <leader>to :tabonly<cr>
" map <leader>tc :tabclose<cr>
" map <leader>tm :tabmove 
" map <leader>t<leader> :tabnext 

" Return to last edit position when opening files (You want this!)
" au BufReadPost * if line("'\"") > 1 && line("'\"") <= line("$") | exe "normal! g'\"" | endif


""""""""""""""""""""""""""""""
" => Status line
""""""""""""""""""""""""""""""
" Always show the status line
set laststatus=2

" Format the status line
"set statusline=\ %F%m%r%h\ %w\ \ CWD:\ %r%{getcwd()}%h\ \ \ Line:\ %l\ \ Column:\ %c


"set number
syntax on
set autoindent
set nu
set rnu
"set wrap linebreak nolist
"set textwidth=80
set colorcolumn=80

""""""""""""""""""""""""""""
" BEGIN PLUGINS

call plug#begin('~/.vim/plugged')

Plug 'preservim/nerdtree'
Plug 'easymotion/vim-easymotion'
Plug 'itchyny/lightline.vim'
Plug 'vim-airline/vim-airline'
call plug#end()

" END PLUGINS
"""""""""""""""""""""""""""


""""""""""""""""""""""""""
" BEGIN PLUGINS OPTIONS

let g:SuperTabDefaultCompletionType    = '<C-n>'
let g:SuperTabCrMapping                = 0

let g:UltiSnipsEditSplit="vertical"
let g:UltiSnipsListSnippets="<c-t>"
set background=dark
"set colorscheme=gruvbox


" END PLUGINS OPTIONS
""""""""""""""""""""""""""

"""""""""""""""""""""""""
" BEGIN MAPPING

map <Leader>f <Plug>(easymotion-s2)

nnoremap <leader>n :NERDTreeToggle<CR>
inoremap <C-c> <Esc>
nnoremap <silent> <Leader>t :TagbarToggle<CR>
nnoremap <silent> <Leader>p :FZF<CR>
"set t_Co=8





" END MAPPING
"""""""""""""""""""""""
