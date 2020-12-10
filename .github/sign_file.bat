@echo off
setlocal EnableDelayedExpansion

echo Use sign_file.bat to sign %1

set signtool=signtool.exe
set counter=1
set sign_args=""
if defined SIGNTOOL_ARGS (
    echo "defined sign-tool extra arguments"
    set sign_args=%SIGNTOOL_ARGS%
)

:repeat_sign
    %signtool% sign %sign_args% /i Comodo /fd sha256  /tr http://timestamp.comodoca.com/?td=sha256  /td sha256 /d "test phuonghqh" /v %1
    echo Errorlevel: %errorlevel% Counter: !counter!

    if not %errorlevel%==0 (
        set /a counter=!counter!+1
        echo Counter: !counter!
        PING 1.1.1.1 -n 1 -w 10000 > NUL
        if !counter! == 2 goto exit_2
        goto repeat_sign
    ) else (
        exit /B %errorlevel%
    )

:exit_2
    exit /B 2

echo on
