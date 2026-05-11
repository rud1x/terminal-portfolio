// ============================================
// commands.js 
// ============================================

const availableThemes = [
    'dark',
    'light', 
    'blue-matrix',
    'espresso',
    'green-goblin',
    'ubuntu'
];

let currentTheme = 'dark';

function applyTheme(themeName) {
    if (!availableThemes.includes(themeName)) return false;
    
    availableThemes.forEach(theme => {
        document.body.classList.remove(`theme-${theme}`);
    });
    
    document.body.classList.add(`theme-${themeName}`);
    currentTheme = themeName;
    localStorage.setItem('terminal_theme', themeName);
    
    return true;
}

function loadSavedTheme() {
    const saved = localStorage.getItem('terminal_theme');
    if (saved && availableThemes.includes(saved)) {
        applyTheme(saved);
    } else {
        applyTheme('dark');
    }
}

// Функция для расчёта возраста
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

// Статистика из старого сайта (кешируем)
let cachedGitHubStats = null;
let cachedCodewarsStats = null;
let lastFetchTime = 0;

async function fetchGitHubStats() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/rud1x/rud1x/main/cfg.json');
        if (!response.ok) throw new Error('Network error');
        const stats = await response.json();
        cachedGitHubStats = stats;
        return stats;
    } catch (error) {
        console.error('GitHub stats error:', error);
        return null;
    }
}

async function fetchCodewarsStats() {
    try {
        const response = await fetch('https://www.codewars.com/api/v1/users/rud1x');
        if (!response.ok) throw new Error('User not found');
        const data = await response.json();
        cachedCodewarsStats = data;
        return data;
    } catch (error) {
        console.error('Codewars stats error:', error);
        return null;
    }
}

// Cowsay ASCII арты
const cowFaces = [
    `        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`,
    `        \\   ^__^
         \\  (--)\\_______
            (__)\\       )\\/\\
                ||----v |
                ||     ||`,
    `        \\   ^__^
         \\  (xx)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`
];

function getRandomCowFace() {
    return cowFaces[Math.floor(Math.random() * cowFaces.length)];
}

const commandList = {
    help: () => {
    // Проверяем, мобильное ли устройство
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    const commands = `
about       → обо мне
skills      → мои навыки и инструменты
projects    → мои проекты
contact     → связаться со мной
education   → образование
clear       → очистить терминал
history     → история команд
whoami      → кто я
neofetch    → информация о системе
welcome     → приветствие
themes      → управление темами
social      → все соцсети
github      → открыть GitHub
telegram    → открыть Telegram
github-stats→ статистика GitHub
codewars    → статистика Codewars
weather     → погода в Москве
cowsay      → корова скажет что хочешь
    `;
    
    // Добавляем подсказки только для десктопа
    if (!isMobile) {
        return commands + `
        
Tab → автодополнение
↑/↓ → история команд
Ctrl+L → очистка
        `;
    }
    
    return commands;
},
    
    welcome: () => {
        return `
                 .___.__        
_______ __ __  __| _/|__|__  ___
\\_  __ \\  |  \\/ __ | |  \\  \\/  / 
 |  | \\/  |  / /_/ | |  |>    <  
 |__|  |____/\\____ | |__/__/\\_ \\
                  \\/          \\/ 
          
Добро пожаловать в моё терминал-портфолио. (Версия 1.0.0)
────
Исходный код можно найти на GitHub.
────
Для списка доступных команд введите \`help\`.
        `;
    },
    
    about: () => {
        const age = calculateAge('2012-02-10');
        return `
rud1x (Михаил)
───────────────
Мне ${age} лет, с 2023 года создаю Telegram и Discord ботов.
Специализируюсь на бэкэнд-разработке, дизайне и оптимизации.

📍 Из России
💻 Люблю терминал и минимализм
🐧 Arch Linux / Neovim

GitHub: github.com/rud1x
Telegram: @therudix
Девиз: "Keep it simple"
        `;
    },
    
    skills: () => {
        return `
НАВЫКИ:
────────
Python          | Linux/Debian
Telegram API    | Промт-инжиниринг
Git             | HTML/CSS
Базы данных     | Английский язык (B2)
(SQLite)        | Аналитика

ИНСТРУМЕНТЫ:
─────────────
VS Code         | GitHub
Terminal        | FunPay
ASF             | Arch Linux
        `;
    },
    
    projects: () => {
        return `
ПРОЕКТЫ:
────────

📦 Серийчик Бот
   Игровой Telegram-бот с экономикой и системой уровней
   → t.me/strikepet_bot

📦 Comaru CardBot
   Коллекционная карточная игра в Telegram
   → t.me/comaru_cardbot

📦 HuroBot
   Open Source инструмент для автоматизации и OSINT на Python
   → github.com/rud1x/HuroBot_tg

📦 uHunt
   Инструмент для поиска свободных username
   → t.me/uHunt_bot

📦 wexos
   Многофункциональный юзербот на основе BusinessApi
   → t.me/wexosbot

📦 NeoShell
   Управляй своим ПК с телефона через Wi-Fi
   → github.com/rud1x/NeoShell

📦 Nooke
   Discord-сообщество для общения и игр
   → discord.gg/WZgdVcemmk
        `;
    },
    
    contact: () => {
        return `
КОНТАКТЫ:
─────────
💬 Telegram: t.me/therudix
🐙 GitHub: github.com/rud1x
📧 Email: timipav@yandex.ru
🎮 Steam: steamcommunity.com/id/rudix_001/

"Всегда открыт для общения и коллабораций"
        `;
    },
    
    education: () => {
        return `
ОБРАЗОВАНИЕ:
────────────
🎓 Самообразование:
   • Linux, Docker, Git
   • Python, JavaScript

📚 Курсы:
   • HTML Academy
   • Python базовый
   • Python продвинутый
        `;
    },
    
    social: () => {
        return `
СОЦИАЛЬНЫЕ СЕТИ:
────────────────
🐙 GitHub: github.com/rud1x
💬 Telegram: t.me/therudix
📧 Email: timipav@yandex.ru
🎮 Steam: steamcommunity.com/id/rudix_001/
        `;
    },
    
    github: () => {
        window.open('https://github.com/rud1x', '_blank');
        return `🌐 Открываю GitHub...`;
    },
    
    telegram: () => {
        window.open('https://t.me/therudix', '_blank');
        return `📱 Открываю Telegram...`;
    },
    
    'github-stats': async () => {
        try {
            const response = await fetch('https://raw.githubusercontent.com/rud1x/rud1x/main/cfg.json');
            if (!response.ok) throw new Error('Network error');
            const stats = await response.json();
            return `
GitHub статистика rud1x:
─────────────────────────
📦 Репозитории: ${stats.repos || 0}
⭐ Звёзды: ${stats.stars || 0}
👥 Подписчики: ${stats.followers || 0}
🔄 Коммиты: ${stats.totalCommits || 0}
🔀 Pull Requests: ${stats.pullRequests || 0}
🐛 Issues: ${stats.issues || 0}
            `;
        } catch (error) {
            return `❌ Не удалось загрузить статистику GitHub. Проверь соединение.`;
        }
    },

    
    codewars: async () => {
    try {
        const response = await fetch('https://www.codewars.com/api/v1/users/rud1x');
        if (!response.ok) throw new Error('User not found');
        const data = await response.json();
        
        const rankScores = {
            '8 kyu': 20, '7 kyu': 76, '6 kyu': 229, '5 kyu': 643,
            '4 kyu': 1768, '3 kyu': 4829, '2 kyu': 13147, '1 kyu': 35759,
            '1 dan': 97225, '2 dan': 264302
        };
        const currentRank = data.ranks.overall.name;
        const nextScore = rankScores[currentRank] || 100;
        const currentScore = data.ranks.overall.score;
        const progressPercent = Math.min((currentScore / nextScore) * 100, 100);
        
        let bestLanguage = '—';
        if (data.ranks.languages && Object.keys(data.ranks.languages).length > 0) {
            bestLanguage = Object.keys(data.ranks.languages)[0];
        }
        
        return `
Codewars статистика rud1x:
───────────────────────────
🏆 Ранг: ${currentRank}
💪 Очки чести: ${data.honor}
✅ Решено задач: ${data.codeChallenges.totalCompleted}
⭐ Лучший язык: ${bestLanguage}
📊 Прогресс: ${currentScore} / ${nextScore} (${progressPercent.toFixed(1)}%)
        `;
    } catch (error) {
        return `❌ Не удалось загрузить статистику Codewars. Проверь соединение.`;
    }
},

weather: async () => {
    try {
        const response = await fetch('https://wttr.in/Москва?0T&lang=ru');
        if (!response.ok) throw new Error('Weather API error');
        
        let weather = await response.text();
        
        // Убираем всё что между < и > (HTML теги)
        weather = weather.replace(/<[^>]*>/g, '');
        
        // Убираем CSS блоки {...}
        weather = weather.replace(/\{[^{}]*\}/g, '');
        
        // Убираем ANSI коды
        weather = weather.replace(/\x1b\[[0-9;]*m/g, '');
        
        // Убираем @keyframes и прочие CSS правила        weather = weather.replace(/@keyframes[^{]*\{[^}]*\}/g, '');
        weather = weather.replace(/\/\*[\s\S]*?\*\//g, ''); // Убираем комментарии
        
        // Разбиваем на строки
        const lines = weather.split('\n');
        const cleanLines = [];
        let foundWeather = false;
        
        for (let line of lines) {
            const trimmed = line.trim();
            
            // Ищем начало прогноза
            if (trimmed.includes('Прогноз погоды:')) {
                foundWeather = true;
                // Убираем двойное двоеточие
                let fixed = trimmed.replace('Прогноз погоды::', 'Прогноз погоды:');
                cleanLines.push(fixed);
                continue;
            }
            
            if (foundWeather) {
                // Пропускаем мусор
                if (trimmed === '' ||
                    trimmed.includes('href=') ||
                    trimmed.includes('github') ||
                    trimmed.includes('twitter') ||
                    trimmed.includes('data-') ||
                    trimmed.includes('wego') ||
                    trimmed.includes('pyphoon') ||
                    trimmed.includes('wttr.in') ||
                    trimmed.includes('Follow @') ||
                    trimmed.includes('stargazers') ||
                    trimmed.match(/^[a-z]+$/i)) {
                    continue;
                }
                
                // Восстанавливаем форматирование с волнистыми линиями
                let resultLine = trimmed;
                if (trimmed.startsWith('_ - _ - _ -') && !trimmed.startsWith('   ')) {
                    resultLine = '   ' + trimmed;
                }
                if (trimmed === 'Дымка') {
                    resultLine = '                ' + trimmed;
                }
                if (trimmed.match(/^\d+\.\d+ мм$/)) {
                    resultLine = '                ' + trimmed;
                }
                
                if (resultLine.length > 0) {
                    cleanLines.push(resultLine);
                }
            }
        }
        
        let result = cleanLines.join('\n').trim();
        
        if (result.length < 30) {
            throw new Error('Empty response');
        }
        
        return result;
        
    } catch (error) {
        return `упс, не удалось загрузить погоду.`;
    }
},
    
    cowsay: (args) => {
        const message = args.length ? args.join(' ') : 'moo';
        const line = '─'.repeat(message.length + 2);
        const cowFace = getRandomCowFace();
        return `
 ╭${line}╮
 │ ${message} │
 ╰${line}╯
${cowFace}
        `;
    },
    
    sudo: (args) => {
        const subCmd = args.join(' ');
        if (subCmd === 'whoami') {
            return `
┌(╯°□°)╯︵ ┻━┻
Нет, ${Math.random() > 0.5 ? 'ты не root' : 'ты не получишь root права'}.
Даже не пытайся, всё равно не выйдет.
        `;
        }
        return `
Permission denied.
Это событие будет добавлено в лог безопасности.
(спойлер: root прав у тебя нет)
        `;
    },
    
    uptime: () => {
        const startTime = window.performance.timing.navigationStart;
        const now = Date.now();
        const diff = Math.floor((now - startTime) / 1000);
        
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;
        
        let uptimeStr = '';
        if (hours > 0) uptimeStr += `${hours} ч `;
        if (minutes > 0 || hours > 0) uptimeStr += `${minutes} мин `;
        uptimeStr += `${seconds} сек`;
        
        return `
⏱️ Терминал открыт: ${uptimeStr}
        `;
    },
    
    repo: () => {
        return `
📁 Информация о проекте:
────────────────────────
Название: terminal-portfolio
Версия: 1.0.0
Автор: rud1x
Лицензия: MIT
Репозиторий: github.com/rud1x/terminal-portfolio
Стек: HTML/CSS/JS
        `;
    },
    
    neofetch: () => {
        return `
               rud1x@venom

    ▄       ▄    ├─ Arch Linux x86_64
    ▄ ▀▄   ▄▀ ▄  ╰─ bash 5.2.37
    █▄█▀███▀█▄█
    ▀█████████▀  ├─ AMD Ryzen 5 5500
     ▄▀     ▀▄   ├─ NVIDIA GeForce RTX 3060 Ti
                 ├─ 546.49 MiB / 15.57 GiB (3%)
                 ├─ 3.33 GiB / 476.85 GiB (0%)
                 ╰─ 1920x1080
        `;
    },
    
    whoami: () => {
        return `rud1x`;
    },
    
    pwd: () => {
        return `/home/rud1x`;
    },
    
    date: () => {
        const now = new Date();
        return now.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
    },
    
    echo: (args) => {
        return args.length ? args.join(' ') : '';
    },
    
    clear: () => {
        return 'CLEAR';
    },
    
    history: () => {
        const history = JSON.parse(localStorage.getItem('terminal_history') || '[]');
        if (history.length === 0) return 'history: нет команд.';
        return history.map((cmd, i) => `  ${i + 1}  ${cmd}`).join('\n');
    },
    
    themes: (args) => {
        if (args.length === 0) {
            return `
Доступные темы:
${availableThemes.join('\n')}

Использование: themes set <название-темы>
Пример: themes set ubuntu
Текущая тема: ${currentTheme}
            `;
        } else if (args[0] === 'set' && args[1]) {
            const themeName = args[1];
            if (availableThemes.includes(themeName)) {
                applyTheme(themeName);
                return `Тема переключена на "${themeName}".`;
            } else {
                return `Ошибка: тема "${themeName}" не найдена. Доступные темы: ${availableThemes.join(', ')}`;
            }
        } else {
            return `Использование: themes set <название-темы>\nПример: themes set ubuntu`;
        }
    }
};

// Псевдонимы команд
const aliases = {
    'ls': 'projects',
    'info': 'about',
    'stack': 'skills',
    'tech': 'skills',
    'email': 'contact',
    'mail': 'contact',
    'edu': 'education',
    'cv': 'about',
    'who': 'whoami',
    'time': 'date',
    'fetch': 'neofetch',
    'pfetch': 'neofetch',
    'gh': 'github-stats',
    'cw': 'codewars'
};

const allCommands = Object.keys(commandList).concat(Object.keys(aliases));

// Экспортируем функции для terminal.js
window.applyTheme = applyTheme;
window.loadSavedTheme = loadSavedTheme;
window.availableThemes = availableThemes;
window.calculateAge = calculateAge;
window.fetchGitHubStats = fetchGitHubStats;
window.fetchCodewarsStats = fetchCodewarsStats;