REM path to signtool.exe
IF EXIST "%ProgramFiles(x86)%\Windows Kits\10\bin\x64\signtool.exe" (
    SET SIGNTOOL="%ProgramFiles(x86)%\Windows Kits\10\bin\x64\signtool.exe"
)

IF EXIST "%ProgramFiles(x86)%\Windows Kits\10\bin\x86\signtool.exe" (
    SET SIGNTOOL_EXE="%ProgramFiles(x86)%\Windows Kits\10\bin\x64\signtool.exe"
)

IF EXIST "%ProgramFiles%\Microsoft SDKs\Windows\v7.1\Bin\signtool.exe" (
    SET SIGNTOOL_EXE="%ProgramFiles%\Microsoft SDKs\Windows\v7.1\Bin\signtool.exe"
)

echo %SIGNTOOL_EXE%
