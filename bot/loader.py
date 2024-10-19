import asyncio
import os

from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.enums.parse_mode import ParseMode

from handlers import user_router

from config import BOT_TOKEN


async def start():
    bot = Bot(token=BOT_TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
    dp = Dispatcher(storage=MemoryStorage())

    dp.include_router(user_router)

    me = await bot.get_me()
    print('Started')
    print(me.username)

    try:
        # await bot.delete_webhook(drop_pending_updates=True)
        await dp.start_polling(bot)

    except Exception as e:
        print(e)


if __name__ == "__main__":
    try:
        asyncio.run(start())
    except (KeyboardInterrupt, SystemExit):
        print('Bot stopped')
