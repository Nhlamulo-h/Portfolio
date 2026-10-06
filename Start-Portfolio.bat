@echo off
title Nhlamulo Gemini Hlatywayo Portfolio Launcher
cls
echo ======================================================================
echo   NHLAMULO GEMINI HLATYWAYO - FULL-STACK DEVELOPER PORTFOLIO
echo ======================================================================
echo.
echo   Launching your portfolio in your default web browser...
echo.
start "" "%~dp0index.html"
echo   [OK] Portfolio launched successfully!
echo.
echo   - Main Portfolio: index.html
echo   - Dedicated Project Page: projects.html
echo   - Resume PDF: assets\Nhlamulo CV .pdf
echo.
echo ======================================================================
timeout /t 4 >nul
exit
