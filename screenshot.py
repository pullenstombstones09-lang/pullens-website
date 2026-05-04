from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto('http://localhost:3000')
    page.wait_for_load_state('networkidle')
    page.screenshot(path='screenshot-desktop.png', full_page=True)

    # Mobile
    page.set_viewport_size({"width": 390, "height": 844})
    page.goto('http://localhost:3000')
    page.wait_for_load_state('networkidle')
    page.screenshot(path='screenshot-mobile.png', full_page=True)

    browser.close()
    print("Screenshots saved")
