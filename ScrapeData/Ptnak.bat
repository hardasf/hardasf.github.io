@echo off
title Windows Critical Error
color 0C
mode con: cols=80 lines=25

echo Initializing Windows Critical Error Fix Tool...
ping localhost -n 3 >nul

:: Fake scanning
setlocal enabledelayedexpansion
set "bar="
for /L %%i in (1,1,40) do (
    set "bar=!bar!█"
    cls
    echo Scanning system files...
    echo [!bar!                                        ] %%i%%
    ping localhost -n 1 >nul
)

echo.
echo Malware detected in: C:\Windows\System32
ping localhost -n 2 >nul
echo Attempting automatic repair...
ping localhost -n 2 >nul

:: Fake repair that "fails"
set "bar="
for /L %%i in (1,1,20) do (
    set "bar=!bar!█"
    cls
    echo Repairing...
    echo [!bar!                    ] %%i%%
    ping localhost -n 1 >nul
)

echo.
echo Repair failed.
ping localhost -n 2 >nul

:: The scary part: "Deleting system files"
color 0E
echo Attempting emergency malware removal...
ping localhost -n 2 >nul

for /L %%i in (1,1,100) do (
    cls
    echo Deleting file: C:\Windows\System32\file%%i.dll
    echo Progress: %%i%%
    ping localhost -n 1 >nul
)

:: Shutdown warning
color 0C
echo CRITICAL ERROR: Core system files deleted.
echo Shutting down to prevent further corruption...
ping localhost -n 3 >nul

:: Dramatic beeps
echo ^G
ping localhost -n 1 >nul
echo ^G
ping localhost -n 1 >nul
echo ^G

shutdown -s -t 60 -c "CRITICAL ERROR: Your PC will shut down in 60 seconds. Type 'shutdown -a' to cancel."
