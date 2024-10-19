import os

from aiogram.types import WebAppInfo
from aiogram.utils.keyboard import InlineKeyboardBuilder

from config import WEBAPP_URL

start_keyboard = InlineKeyboardBuilder()
start_keyboard.button(text='Запустить', web_app=WebAppInfo(url=WEBAPP_URL))
