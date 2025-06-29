# 🧪 Тесты для проекта "Сервис межгалактической аналитики"
Этот модуль покрывает тестами логику и пользовательский интерфейс проекта: от утилит до хука анализа CSV-файлов и интеграции компонентов.

## 📄 Сценарии тестирования
✅ Юнит-тесты
utils/analysis.ts
Парсинг потокового ответа от API (transformAnalysisData)

Преобразование объекта Highlights в массив (convertHighlightsToArray)

Проверка на CSV-файл (isCsvFile)

Валидация ответа от сервера (validateServerResponse)

Обработка ошибок (InvalidServerResponseError)

utils/storage.ts
Добавление записи в историю (addToHistory)

Удаление записи из истории (removeFromHistory)

Очистка всей истории (clearHistory)

utils/formatDate.ts
Преобразование timestamp в дату формата ДД.ММ.ГГГГ

🪝 Тесты кастомных хуков
hooks/use-csv-analysis.ts
Успешная обработка потока данных с вызовом onData и onComplete

Обработка ошибок и вызов onError при некорректном ответе

Завершение анализа по done: true

## 🧩 Интеграционные тесты компонентов
HighlightsSection + HighlightCard
Хайлайты отображаются на странице при передаче пропсов

Отображается заглушка при пустом массиве

Хайлайты корректно визуализируются после анализа CSV-файла

Данные сохраняются в localStorage и доступны в истории

## ⚙️ Установка и запуск тестов
<pre lang="bash"> 
# Установить зависимости (если еще не установлены)
npm install

# Запуск всех тестов
npm run test

# Запуск тестов с отображением покрытия
npm run test:coverage

# Запуск конкретного файла
npx vitest run src/utils/analysis.test.ts
</pre>
## 🧰 Используемые технологии
Vitest - Фреймворк для написания и запуска тестов
@testing-library/react - Тестирование React-компонентов с точки зрения пользователя
jsdom -	Эмуляция DOM в среде Node.js
TypeScript - Статическая типизация для безопасности тестов
mocking (vi) - Моки функций, глобальных API (fetch и др.)

## 📁 Структура тестов
<pre lang="bash"> 
src/
├── __tests__/                 # Интеграционные тесты
│   ├── hooks/
│   │   └── use-csv-analysis.test.ts
│   └── components/
│       ├── HighlightsSection.test.tsx
│       └── HighlightCard.test.tsx
├── utils/
│   └── analysis.test.ts
│   └── storage.test.ts
│   └── formatDate.test.ts
</pre>
