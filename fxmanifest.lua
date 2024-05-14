fx_version 'cerulean'
game 'gta5'

name "w_loading"
description "Fivem Loading Screen"
author "sedres"
version "2.0"



loadscreen 'web/loading.html'
loadscreen_cursor 'yes'

files { 'web/loading.html',
	'web/JS/*', 'web/CSS/*', 'web/assets/*', 'web/config.js' }

client_scripts {
	'client/main.lua',
}

server_script 'server/main.lua'
