import asyncio
from playwright.async_api import async_playwright
import os
from datetime import datetime, timedelta

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        # 1. Verify Landing Page
        print("Verifying Landing Page...")
        await page.goto("http://localhost:3001")
        await page.wait_for_selector("text=Oldway")
        await page.screenshot(path="landing_final.png", full_page=True)
        
        # 2. Verify Full Booking Flow
        print("Verifying Full Booking Flow...")
        await page.goto("http://localhost:3001/booking")
        
        # Step 1: Service
        await page.wait_for_selector("text=Выберите услугу")
        await page.click("button:has-text('Мужская стрижка')")
        await page.click("button:has-text('Далее')")
        
        # Step 2: Barber
        await page.wait_for_selector("text=Выберите мастера")
        await page.click("button:has-text('Мейрамбек')")
        await page.click("button:has-text('Далее')")
        
        # Step 3: Date & Time
        await page.wait_for_selector("text=Дата и время")
        # Click the first available time slot
        await page.click("button:has-text(':00')") 
        await page.click("button:has-text('Далее')")
        
        # Step 4: Details
        await page.wait_for_selector("text=Ваши контакты")
        await page.fill("input[placeholder='Введите ваше имя']", "Test User")
        await page.fill("input[placeholder='+7 (___) ___-__-__']", "+77011234567")
        await page.click("button:has-text('Подтвердить запись')")
        
        # Confirmation Page
        await page.wait_for_url("**/booking/confirmation")
        await page.wait_for_selector("text=Запись подтверждена")
        await page.screenshot(path="booking_confirmation.png")
        print("Booking confirmed!")
        
        # 3. Verify Admin Dashboard and Schedule
        print("Verifying Admin Schedule...")
        await page.goto("http://localhost:3001/admin/login")
        await page.fill("input[type='password']", "admin123")
        await page.click("button:has-text('Войти')")
        
        # Wait for redirect to /admin/bookings first
        await page.wait_for_url("**/admin/bookings")
        
        await page.goto("http://localhost:3001/admin/schedule")
        # Use a more reliable selector from the actual code
        await page.wait_for_selector("h1:has-text('Управление расписанием')")
        await page.screenshot(path="admin_schedule.png")
        
        # 4. Verify Admin Bookings (should see the new booking)
        print("Verifying Admin Bookings...")
        await page.goto("http://localhost:3001/admin/bookings")
        await page.wait_for_selector("text=Test User")
        await page.screenshot(path="admin_bookings_with_data.png")
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
