fx_version 'cerulean'
game 'gta5'

name "w_loading"
description "Modern Fivem Loading Screen"
author "sedres"
version "3.0"

loadscreen 'ui/index.html'
-- ui_page 'ui/index.html'


files {
	'ui/index.html',
	'ui/assets/*.*',
	'config/Music/*.*',
	'config/Background/*.*',
	'config/*.json',
}

loadscreen_cursor 'yes'
loadscreen_manual_shutdown 'yes' -- Comment to disable manual shutdown


client_scripts {
	'client/*.lua'
}
