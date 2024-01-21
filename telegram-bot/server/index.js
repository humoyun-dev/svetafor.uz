const TelegramBot = require("node-telegram-bot-api");
const token = "6830292087:AAEY8TBg7LFq3obWPkkYQYkSB3kQFOFBiP4";

const bot = new TelegramBot(token, { polling: true });
const userState = new Map();

const generateInlineKeyboard = () => {
  return {
    inline_keyboard: [
      [
        {
          text: "Open svetafor.uz",
          web_app: {
            url: "https://bot.svetafor.uz/",
          },
        },
      ],
    ],
  };
};

const generateKeyboard = (userId) => {
  const isRegistered = userState.has(userId);

  return {
    keyboard: [
      [
        {
          text: isRegistered ? "" : "Telefon raqami bilan ro'yxatdan o'ting",
          request_contact: !isRegistered,
        },
      ],
      isRegistered
        ? [
            {
              text: "Do'kon",
              web_app: {
                url: "https://bot.svetafor.uz/",
              },
            },
          ]
        : [],
    ],
    resize_keyboard: true,
  };
};

const handleStartCommand = async (chatId, messageId, userId) => {
  await bot.sendMessage(
    chatId,
    "Assalomu alaykum svetaforuz do'koniga xush kelibsiz.",
    {
      reply_markup: generateKeyboard(userId),
    },
  );
};

const handleRestartCommand = async (chatId, messageId) => {
  await bot.sendMessage(
    chatId,
    "Assalomu alaykum svetaforuz do'koniga xush kelibsiz.",
    {
      reply_markup: generateKeyboard(),
    },
  );
};

const handleShopCommand = async (chatId) => {
  await bot.sendMessage(chatId, "Bizning assosiy do'konimiz", {
    reply_markup: generateInlineKeyboard(),
  });
};

bot.on("contact", (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const phoneNumber = msg.contact.phone_number;

  userState.set(userId, {
    phoneNumber: phoneNumber,
  });

  console.log(`User ${userId} registered with phone number: ${phoneNumber}`);

  bot.sendMessage(
    chatId,
    `Telefon raqamingiz muvaffaqiyatli ro'yxatdan o'tkazildi: ${phoneNumber}`,
    {
      reply_markup: generateKeyboard(userId),
    },
  );
});

const bootstrap = () => {
  bot.on("message", async (msg) => {
    try {
      const chatId = msg.chat.id;
      const text = msg.text;
      const userId = msg.from.id;

      switch (text) {
        case "/start":
          await handleStartCommand(chatId, msg.message_id, userId);
          break;
        case "/restart":
          await handleRestartCommand(chatId, msg.message_id);
          break;
        case "/shop":
          await handleShopCommand(chatId);
          break;
      }
    } catch (error) {
      console.error("Error handling message:", error.message);

      if (error.response && error.response.statusCode === 403) {
        console.log("User has blocked the bot.");
      }
    }
  });
};

bootstrap();
