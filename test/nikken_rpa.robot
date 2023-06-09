*** Settings ***
Library   SeleniumLibrary
Library   Process
Library   OperatingSystem
Library   ${CURDIR}/Scraping.py
Library   ${CURDIR}/config/chrome_options.py

*** Variables ***
${NIKKEN_ID}
${URL}   https://nikken.aquinasnetwork.tech/?nikken_id=${NIKKEN_ID}&name=John%20Doe&language=en
${MAX_STAGE}   4

*** Keywords ***
Open Nikken Page
    ${chrome_options}   Get Chrome Options
    Open Browser   ${URL}   chrome   options=${chrome_options}
    Maximize Browser Window
    Sleep   2

Iterate Over Stages
    Wait Until Page Contains Element   xpath://a[contains(@href, '/stage/1')]   10
    Sleep   2
    Click Element   xpath://a[contains(@href, '/stage/1')]
    Sleep   2
    FOR   ${stage_code}   IN RANGE   1   ${MAX_STAGE} + 1
        # Click stage button
        Wait Until Location Is   https://nikken.aquinasnetwork.tech/stage/${stage_code}   10
        # Calculate number of levels with scraping
        ${html_code}   Get Source
        ${levels}   Get Stage Levels   ${html_code}
        # For each level call 'Complete Level' keyword
        FOR   ${level_code}   IN RANGE   1   ${levels} + 1
            Complete Level   ${stage_code}   ${level_code}
        END
        Sleep   2
    END

Complete Level
    [Arguments]   ${stage_code}   ${level_code}
    # Click card
    Wait Until Page Contains Element   xpath://div[contains(@id, 'journey')]/div/div[contains(@class, 'row')][${level_code}]   10
    Execute Javascript   document.querySelector('#journey > div.container > div:nth-child(${level_code + 1})').scrollIntoView()
    Sleep   2
    Click Element   xpath://div[contains(@id, 'journey')]/div/div[contains(@class, 'row')][${level_code}]
    Sleep   2
    # Click download button
    Click Element   xpath://div[contains(@id, 'ModalCenter-${stage_code}-${level_code}')]//div[contains(@class, 'modal-structure')]/div[2]/a
    Sleep   2
    # Close file tab
    ${window_handles}   Get Window Handles
    Switch Window   ${window_handles}[1]
    Close Window
    Switch Window   ${window_handles}[0]
    Sleep   2
    # Close level (check if finish level exist)
    ${count}   Get Element Count   xpath://div[contains(@id, 'ModalCenter-${stage_code}-${level_code}')]//button[contains(text(), 'Finish level')]
    IF   ${count} > 0
        Click Element   xpath://div[contains(@id, 'ModalCenter-${stage_code}-${level_code}')]//button[contains(text(), 'Finish level')]
    ELSE
        Click Element   xpath://div[contains(@id, 'ModalCenter-${stage_code}-${level_code}')]//button[contains(@class, 'btn-close')]
    END
    Sleep   2

*** Test Cases ***
Nikken Test
    Open Nikken Page
    Iterate Over Stages
    [Teardown]   Close Browser
