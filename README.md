# 💻 terminal - portfolio

**Терминал-портфолио разработчика.**  
Проект, который превращает обычное портфолио в интерактивную консоль.

🔗 **Демо:** [rud1x.github.io/terminal-portfolio](https://rud1x.github.io/terminal-portfolio)

---

## ✨ Особенности

- 🖥️ Полноценный CLI-интерфейс в браузере
- 🎨 6 цветовых тем: `dark`, `light`, `blue-matrix`, `espresso`, `green-goblin`, `ubuntu`
- ⌨️ Автодополнение по `Tab`, история команд по стрелкам
- 🌐 Интеграция с GitHub API и Codewars API
- 📱 Адаптивный дизайн (мобильные устройства)
- 🐄 Пасхалки: `cowsay`, `sudo`

---

## 📋 Доступные команды

| Команда | Описание |
|---------|----------|
| `about` | Информация обо мне |
| `skills` | Мои навыки и инструменты |
| `projects` | Мои проекты |
| `contact` | Контакты |
| `education` | Образование |
| `neofetch` | Информация о системе |
| `themes` | Управление темами |
| `github-stats` | Статистика GitHub |
| `codewars` | Статистика Codewars |
| `weather` | Погода в Москве |
| `cowsay` | Корова скажет что хочешь |
| `clear` / `history` / `whoami` | Стандартные утилиты |

---

## 🎨 Кастомизация

Все данные находятся в `js/commands.js`:

- Личная информация → `about`
- Навыки → `skills`
- Проекты → `projects`
- Контакты → `contact`
- Цветовые темы → `availableThemes`

---

## 📁 Структура проекта

```
terminal-portfolio/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── commands.js    # Все команды и данные
    └── terminal.js    # Ядро терминала
```

---

## 🐧 Вдохновение

Проект вдохновлён [satnaing/terminal-portfolio](https://github.com/satnaing/terminal-portfolio)
---

## 📄 Лицензия

MIT © [rud1x](https://github.com/rud1x)
