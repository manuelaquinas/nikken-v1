from selenium import webdriver

def get_chrome_options():
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("headless")
    chrome_options.add_argument("no-sandbox")
    chrome_options.add_argument("disable-dev-shm-usage")
    chrome_options.add_argument("disable-gpu")
    return chrome_options