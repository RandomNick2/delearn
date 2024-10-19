from aiogram import Router
from aiogram.filters import CommandStart
from aiogram.types import Message

from keyboard import start_keyboard

user_router = Router()


@user_router.message(CommandStart())
async def start(message: Message):
    await message.answer(
        'Добро пожаловать в Quizio\nВ нашем приложении вы можете получить Quiz Token.',
        reply_markup=start_keyboard.as_markup()
    )
