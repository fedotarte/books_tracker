# Используем официальный образ Node.js в качестве базового
FROM node:14-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируем файлы package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальной исходный код приложения
COPY . .

# Собираем приложение NestJS
RUN npm run build

# Открываем порт, на котором будет работать приложение
EXPOSE 5000

# Запускаем приложение
CMD ["node", "dist/main"]
