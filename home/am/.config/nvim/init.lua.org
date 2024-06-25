-- Install packer
local install_path = vim.fn.stdpath 'data' .. '/site/pack/packer/start/packer.nvim'
local is_bootstrap = false
if vim.fn.empty(vim.fn.glob(install_path)) > 0 then
  is_bootstrap = true
  vim.fn.system { 'git', 'clone', '--depth', '1', 'https://github.com/wbthomason/packer.nvim', install_path }
  vim.cmd [[packadd packer.nvim]]
end

require('packer').startup(function(use)
  -- Package manager
  use 'wbthomason/packer.nvim'


  use { -- Highlight, edit, and navigate code
    'nvim-treesitter/nvim-treesitter',
    run = function()
      pcall(require('nvim-treesitter.install').update { with_sync = true })
    end,
  }

  use { -- Additional text objects via treesitter
    'nvim-treesitter/nvim-treesitter-textobjects',
    after = 'nvim-treesitter',
  }

  -- Git related plugins
  use 'tpope/vim-fugitive'
  use 'tpope/vim-rhubarb'
  use 'lewis6991/gitsigns.nvim'

  -- use 'navarasu/onedark.nvim' -- Theme inspired by Atom
  use 'https://gitlab.com/__tpb/monokai-pro.nvim' -- Monokai  Theme
  use 'nvim-lualine/lualine.nvim' -- Fancier statusline
  use 'lukas-reineke/indent-blankline.nvim' -- Add indentation guides even on blank lines
  use "terrortylor/nvim-comment" -- Nvim Commnet gcc for Line
  -- use 'tpope/vim-sleuth' -- Detect tabstop and shiftwidth automatically
  -- use 'nmac427/guess-indent.nvim' -- Detect tabstop and shiftwidth automatically
  use 'ap/vim-css-color' -- CSS Color
  use 'jwalton512/vim-blade' -- Blade support nvim
  use 'fannheyward/telescope-coc.nvim'

  use {
    'nvim-tree/nvim-tree.lua',
    requires = {
      'nvim-tree/nvim-web-devicons', -- optional, for file icons
    },
  }

  use {
    'phaazon/hop.nvim',
    branch = 'v2',
    config = function()
      require'hop'.setup {}
    end
  }

  use {'akinsho/bufferline.nvim', tag = "v3.*", requires = 'nvim-tree/nvim-web-devicons'} -- Buffer Tabs
  use 'natecraddock/sessions.nvim' -- Session Manager
  use  'natecraddock/workspaces.nvim' --Workspaces Manager

  use "windwp/nvim-autopairs" --Close Autopair

  use { 'neoclide/coc.nvim', branch = 'release'}

  -- Fuzzy Finder (files, lsp, etc)
  use { 'nvim-telescope/telescope.nvim', branch = '0.1.x', requires = { 'nvim-lua/plenary.nvim' } }

  -- Fuzzy Finder Algorithm which requires local dependencies to be built. Only load if `make` is available
  use { 'nvim-telescope/telescope-fzf-native.nvim', run = 'make', cond = vim.fn.executable 'make' == 1 }

  -- Add custom plugins to packer from ~/.config/nvim/lua/custom/plugins.lua
  local has_plugins, plugins = pcall(require, 'custom.plugins')
  if has_plugins then
    plugins(use)
  end

  if is_bootstrap then
    require('packer').sync()
  end
end)
-- PLUGINS INSTALL#############################################################

-- When we are bootstrapping a configuration, it doesn't
-- make sense to execute the rest of the init.lua.
--
-- You'll need to restart nvim, and then it will work.
if is_bootstrap then
  print '=================================='
  print '    Plugins are being installed'
  print '    Wait until Packer completes,'
  print '       then restart nvim'
  print '=================================='
  return
end

-- Automatically source and re-compile packer whenever you save this init.lua
local packer_group = vim.api.nvim_create_augroup('Packer', { clear = true })
vim.api.nvim_create_autocmd('BufWritePost', {
  command = 'source <afile> | silent! LspStop | silent! LspStart | PackerCompile',
  group = packer_group,
  pattern = vim.fn.expand '$MYVIMRC',
})

-- CONFIG OPTIONS###############################################################
-- [[ Setting options ]]
-- See `:help vim.o`

-- Set highlight on search
vim.o.hlsearch = false

-- Make line numbers default
vim.o.number = true
vim.o.relativenumber = true

-- Enable mouse mode
vim.o.mouse = ''

-- Enable break indent
vim.o.breakindent = true

-- Save undo history
vim.o.undofile = true

-- Case insensitive searching UNLESS /C or capital in search
vim.o.ignorecase = true
vim.o.smartcase = true

-- Decrease update time
vim.o.updatetime = 250
vim.wo.signcolumn = 'yes'

-- Set colorscheme
vim.o.termguicolors = true
vim.g.monokaipro_filter = "classic"
vim.cmd [[colorscheme monokaipro]]

-- Set completeopt to have a better completion experience
vim.o.completeopt = 'menuone,noselect'

-- [[ Basic Keymaps ]]
-- Set <space> as the leader key
-- See `:help mapleader`
--  NOTE: Must happen before plugins are required (otherwise wrong leader will be used)
vim.g.mapleader = ' '
vim.g.maplocalleader = ' '


-- [[ Highlight on yank ]]
-- See `:help vim.highlight.on_yank()`
local highlight_group = vim.api.nvim_create_augroup('YankHighlight', { clear = true })
vim.api.nvim_create_autocmd('TextYankPost', {
  callback = function()
    vim.highlight.on_yank()
  end,
  group = highlight_group,
  pattern = '*',
})

-- Set lualine as statusline
-- See `:help lualine.txt`
require('lualine').setup {
  options = {
    icons_enabled = false,
    theme = 'monokaipro',
    component_separators = '|',
    section_separators = '',
  },
}

-- Enable Comment.nvim
require('nvim_comment').setup()

-- Enable `lukas-reineke/indent-blankline.nvim`
-- See `:help indent_blankline.txt`
require('indent_blankline').setup {
  char = '┊',
  show_trailing_blankline_indent = false,
}

-- Gitsigns
-- See `:help gitsigns.txt`
require('gitsigns').setup {
  signs = {
    add = { text = '+' },
    change = { text = '~' },
    delete = { text = '_' },
    topdelete = { text = '‾' },
    changedelete = { text = '~' },
  },
}

-- [[ Configure Telescope ]]
-- See `:help telescope` and `:help telescope.setup()`
require('telescope').setup {
  defaults = {
    mappings = {
      i = {
        ['<C-u>'] = false,
        ['<C-d>'] = false,
      },
    },
  },
  extensions = {
    coc = {
        theme = 'ivy',
        prefer_locations = true, -- always use Telescope locations to preview definitions/declarations/implementations etc
    }
  },
}

-- Enable telescope fzf native, if installed
pcall(require('telescope').load_extension, 'fzf')
pcall(require('telescope').load_extension, 'coc')

-- [[ Configure Treesitter ]]
-- See `:help nvim-treesitter`
require('nvim-treesitter.configs').setup {
  -- Add languages to be installed here that you want installed for treesitter
  ensure_installed = { 'c', 'cpp', 'lua', 'python', 'typescript', 'help', 'php', 'javascript', 'bash', 'vim' },

  highlight = { enable = true },
  indent = { enable = true, disable = { 'python' } },
  -- incremental_selection = {
  --   enable = true,
  --   keymaps = {
  --     init_selection = '<c-space>',
  --     node_incremental = '<c-space>',
  --     scope_incremental = '<c-s>',
  --     node_decremental = '<c-backspace>',
  --   },
  -- },
  textobjects = {
    select = {
      enable = true,
      lookahead = true, -- Automatically jump forward to textobj, similar to targets.vim
      -- keymaps = {
      --   -- You can use the capture groups defined in textobjects.scm
      --   ['aa'] = '@parameter.outer',
      --   ['ia'] = '@parameter.inner',
      --   ['af'] = '@function.outer',
      --   ['if'] = '@function.inner',
      --   ['ac'] = '@class.outer',
      --   ['ic'] = '@class.inner',
      -- },
    },
    move = {
      enable = true,
      set_jumps = true, -- whether to set jumps in the jumplist
      -- goto_next_start = {
      --   [']m'] = '@function.outer',
      --   [']]'] = '@class.outer',
      -- },
      -- goto_next_end = {
      --   [']M'] = '@function.outer',
      --   [']['] = '@class.outer',
      -- },
      -- goto_previous_start = {
      --   ['[m'] = '@function.outer',
      --   ['[['] = '@class.outer',
      -- },
      -- goto_previous_end = {
      --   ['[M'] = '@function.outer',
      --   ['[]'] = '@class.outer',
      -- },
    },
    swap = {
      enable = true,
      -- swap_next = {
      --   ['<leader>a'] = '@parameter.inner',
      -- },
      -- swap_previous = {
      --   ['<leader>A'] = '@parameter.inner',
      -- },
    },
  },
}

-- Setup neovim lua configuration
--

-- Load Filetree
require("nvim-tree").setup({
  open_on_setup = true
})

-- Load Tabs  Line
require("bufferline").setup{}

-- Load Sessions Manager
require("sessions").setup()

-- Load Workspaces Manager
require("workspaces").setup()


require'nvim-treesitter.configs'.setup {
  autotag = {
    enable = true,
  }
}

require("nvim-autopairs").setup({
  enable_check_bracket_line = false,
  fast_wrap = {
    map = '<C-e>',
  },
})

require'hop'.setup {}

-- require('guess-indent').setup {
--   auto_cmd = true,  -- Set to false to disable automatic execution
--   override_editorconfig = false, -- Set to true to override settings set by .editorconfig
--   -- filetype_exclude = {  -- A list of filetypes for which the auto command gets disabled
--   --   "netrw",
--   --   "tutor",
--   -- },
--   -- buftype_exclude = {  -- A list of buffer types for which the auto command gets disabled
--   --   "help",
--   --   "nofile",
--   --   "terminal",
--   --   "prompt",
--   -- },
-- }

-- KEYMAPS ###############################################################
-- Keymaps for better default experience
-- See `:help vim.keymap.set()`
-- vim.keymap.set({ 'n', 'v' }, '<Space>', '<Nop>', { silent = true })

-- Remap for dealing with word wrap
vim.keymap.set('n', 'k', "v:count == 0 ? 'gk' : 'k'", { expr = true, silent = true })
vim.keymap.set('n', 'j', "v:count == 0 ? 'gj' : 'j'", { expr = true, silent = true })

-- See `:help telescope.builtin`
vim.keymap.set('n', '<leader>?', require('telescope.builtin').oldfiles, { desc = '[?] Find recently opened files' })
vim.keymap.set('n', '<leader><space>b', require('telescope.builtin').buffers, { desc = '[ ] Find existing buffers' })
vim.keymap.set('n', '<leader>/', function()
  -- You can pass additional configuration to telescope to change theme, layout, etc.
  require('telescope.builtin').current_buffer_fuzzy_find(require('telescope.themes').get_dropdown {
    winblend = 10,
    previewer = false,
  })
end, { desc = '[/] Fuzzily search in current buffer]' })

vim.keymap.set('n', '<leader>sf', require('telescope.builtin').find_files, { desc = '[S]earch [F]iles' })
vim.keymap.set('n', '<leader>sh', require('telescope.builtin').help_tags, { desc = '[S]earch [H]elp' })
vim.keymap.set('n', '<leader>sw', require('telescope.builtin').grep_string, { desc = '[S]earch current [W]ord' })
vim.keymap.set('n', '<leader>sg', require('telescope.builtin').live_grep, { desc = '[S]earch by [G]rep' })
vim.keymap.set('n', '<leader>sd', require('telescope.builtin').diagnostics, { desc = '[S]earch [D]iagnostics' })


-- Diagnostic keymaps
vim.keymap.set('n', '[d', vim.diagnostic.goto_prev)
vim.keymap.set('n', ']d', vim.diagnostic.goto_next)
vim.keymap.set('n', '<leader>e', vim.diagnostic.open_float)
vim.keymap.set('n', '<leader>q', vim.diagnostic.setloclist)

-- LSP settings.
--  This function gets run when an LSP connects to a particular buffer.

-- NERDTree Keymap
vim.keymap.set('n', '<leader>.', ':NvimTreeToggle<cr>')

-- Change window remap
vim.keymap.set('n', '<C-Down>', '<C-w>j', { silent  = true })
vim.keymap.set('n', '<C-Up>', '<C-w>k', { silent  = true })
vim.keymap.set('n', '<C-Right>', '<C-w>l', { silent  = true })
vim.keymap.set('n', '<C-Left>', '<C-w>h', { silent  = true })

-- vim.keymap.set({ 'n', 'i' }, '<C-PageDown>', 'gt', { silent  = true })
-- vim.keymap.set({ 'n', 'i' }, '<C-PageUp>', 'gT', { silent  = true })
vim.keymap.set({ 'n', 'i' }, '<C-PageDown>', ':bn<cr>', { silent  = true })
vim.keymap.set({ 'n', 'i' }, '<C-PageUp>', ':bp<cr>', { silent  = true })
vim.keymap.set({ 'n', 'i' }, '<C-w>', ':bd<cr>', { silent  = true })
vim.keymap.set({ 'n'}, '<leader><C-w>', ':bd!<cr>', { silent  = true })

-- Hop Keymap
vim.keymap.set({'n'}, '<leader>h', ':HopWord<cr>', { silent  = true })


-- vim.keymap.set({'n'},'<leader>ds', ":<C-u>CocList outline<cr>", { silent  = true })
-- vim.keymap.set({'n'},'<leader>ws', ":<C-u>CocList -I symbols", { silent  = true })

vim.keymap.set({'n'},'<leader>ds', ":<C-u>Telescope coc document_symbols<cr>", { silent  = true })
vim.keymap.set({'n'},'<leader>ws', ":<C-u>Telescope coc workspace_symbols", { silent  = true })
-- KEYMAPS ###############################################################

-- COC
-- vim.api.nvim_set_keymap("n", "<leader>.", "<Plug>(coc-codeaction)", {})
vim.api.nvim_set_keymap("n", "<leader>l", ":CocCommand eslint.executeAutofix<CR>", {})
vim.api.nvim_set_keymap("n", "gd", "<Plug>(coc-definition)", {silent = true})
vim.api.nvim_set_keymap("n", "K", ":call CocActionAsync('doHover')<CR>", {silent = true, noremap = true})
vim.api.nvim_set_keymap("n", "<leader>rn", "<Plug>(coc-rename)", {})
vim.api.nvim_set_keymap("n", "<leader>f", ":CocCommand prettier.formatFile<CR>", {noremap = true})
vim.api.nvim_set_keymap("i", "<C-Space>", "coc#refresh()", { silent = true, expr = true })
vim.api.nvim_set_keymap("i", "<TAB>", "coc#pum#visible() ? coc#pum#next(1) : '<TAB>'", {noremap = true, silent = true, expr = true})
vim.api.nvim_set_keymap("i", "<S-TAB>", "coc#pum#visible() ? coc#pum#prev(1) : '<C-h>'", {noremap = true, expr = true})
vim.api.nvim_set_keymap("i", "<CR>", "coc#pum#visible() ? coc#pum#confirm() : '<C-G>u<CR><C-R>=coc#on_enter()<CR>'", {silent = true, expr = true, noremap = true})

vim.opt.shiftwidth = 2
vim.opt.tabstop = 2
vim.g.shiftwidth = 4
vim.g.tabstop = 2
-- The line beneath this is called `modeline`. See `:help modeline`
-- vim: ts=2 sts=2 sw=2 et
