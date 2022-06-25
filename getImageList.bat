@echo off
set dirpath=%~dp0\images
dir %dirpath%  /b /a-d /-p /o:gn > "%~dp0\imageIndex.txt"
exit