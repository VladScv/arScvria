@echo off
set dirpath=%~dp0\images
set dirpath2=%~dp0\data
dir %dirpath%  /b /a-d /-p /o:gn > "%~dp0\imageIndex.txt"
dir %dirpath2%  /b /a-d /-p /o:gn > "%~dp0\dataIndex.txt"
exit