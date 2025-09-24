@echo off
title Sistema Pizzaria

:: Muda o diretorio para a pasta onde o script esta localizado
cd /d "%~dp0"

echo Iniciando o sistema da pizzaria...

:: Roda o comando para iniciar o programa
npm start

echo.
echo O programa foi finalizado. Pressione qualquer tecla para fechar esta janela.
pause
