fx_version 'cerulean'
game 'gta5'

name "sd_loading"
description "Fivem Basic Loading Screen"
author "sedres"
version "1.0"

loadscreen 'web/loading.html'
loadscreen_cursor 'yes'

files { 'web/loading.html',
	'web/JS/*', 'web/CSS/*', 'web/assets/*', 'web/assets/**/*' }

client_scripts {
	'client/main.lua',
}

server_script 'server/main.lua'
