// ============================================
// terminal.js
// ============================================

const outputDiv = document.getElementById('output');
const commandInput = document.getElementById('command-input');
const promptSpan = document.getElementById('prompt');

let commandHistory = JSON.parse(localStorage.getItem('terminal_history') || '[]');
let historyIndex = commandHistory.length;

function updatePrompt() {
    promptSpan.textContent = 'rud1x@venom:~$ ';
}

function saveToHistory(cmd) {
    if (!cmd.trim()) return;
    commandHistory.push(cmd);
    if (commandHistory.length > 100) commandHistory.shift();
    localStorage.setItem('terminal_history', JSON.stringify(commandHistory));
    historyIndex = commandHistory.length;
}

function addCommandLine(command) {
    const block = document.createElement('div');
    block.className = 'command-block';
    block.innerHTML = `
        <div class="command-line-input">
            <span class="prompt-lambda">rud1x@venom:~$</span>
            <span class="command-text"> ${escapeHtml(command)}</span>
        </div>
    `;
    outputDiv.appendChild(block);
    scrollToBottom();
}

function addResponse(response) {
    // Проверяем, что response это строка
    let responseText = '';
    if (typeof response === 'string') {
        responseText = response;
    } else if (response && typeof response.toString === 'function') {
        responseText = response.toString();
    } else {
        responseText = String(response);
    }
    
    const block = document.createElement('div');
    block.className = 'response-block';
    block.innerHTML = `
        <div class="response-text" style="margin-bottom: 8px; white-space: pre-wrap;">${responseText.replace(/\n/g, '<br>')}</div>
    `;
    outputDiv.appendChild(block);
    scrollToBottom();
}

function addPlainText(text) {
    const block = document.createElement('div');
    block.className = 'response-block';
    block.innerHTML = `<div class="response-text" style="white-space: pre-wrap;">${text.replace(/\n/g, '<br>')}</div>`;
    outputDiv.appendChild(block);
    scrollToBottom();
}

function scrollToBottom() {
    setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 5);
    setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 50);
    setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 150);
}

function clearTerminal() {
    outputDiv.innerHTML = '';
    scrollToBottom();
}

function runWelcomeOnStart() {
    const block = document.createElement('div');
    block.className = 'command-block';
    block.innerHTML = `
        <div class="command-line-input">
            <span class="prompt-lambda">rud1x@venom:~$</span>
            <span class="command-text"> welcome</span>
        </div>
    `;
    outputDiv.appendChild(block);
    
    const responseBlock = document.createElement('div');
    responseBlock.className = 'response-block';
    responseBlock.innerHTML = `<div class="response-text" style="margin-bottom: 8px;">
<pre style="font-family: monospace; margin: 0; line-height: 1.2;">
                 .___.__        
_______ __ __  __| _/|__|__  ___
\\_  __ \\  |  \\/ __ | |  \\  \\/  / 
 |  | \\/  |  / /_/ | |  |>    <  
 |__|  |____/\\____ | |__/__/\\_ \\
                  \\/          \\/ 
</pre>
Добро пожаловать в моё терминал-портфолио. (Версия 1.0.0)
────
Исходный код можно найти на GitHub.
────
Для списка доступных команд введите <span style="color: var(--link-color);">help</span>.
        </div>
    `;
    outputDiv.appendChild(responseBlock);
    
    commandHistory.push('welcome');
    localStorage.setItem('terminal_history', JSON.stringify(commandHistory));
    historyIndex = commandHistory.length;
    
    scrollToBottom();
}

function autocomplete() {
    const input = commandInput.value;
    if (!input) return;
    
    const lowerInput = input.toLowerCase();
    const matches = allCommands.filter(cmd => cmd.startsWith(lowerInput));
    
    if (matches.length === 1) {
        commandInput.value = matches[0];
    } else if (matches.length > 1) {
        addPlainText('\n' + matches.join('  ') + '\n');
    }
}

// Главная функция выполнения команд (асинхронная)
async function executeCommand(cmd) {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    
    saveToHistory(trimmed);
    historyIndex = commandHistory.length;
    
    const parts = trimmed.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g);
    if (!parts) {
        addCommandLine(trimmed);
        addResponse(`<span class="error-message">bash: ${escapeHtml(trimmed)}: ошибка разбора команды</span>`);
        return;
    }
    
    const baseCmd = parts[0].toLowerCase();
    const args = parts.slice(1).map(arg => arg.replace(/^["']|["']$/g, ''));
    
    // Добавляем строку с командой
    addCommandLine(trimmed);
    
    // Обработка echo
    if (baseCmd === 'echo') {
        const response = commandList.echo ? commandList.echo(args) : args.join(' ');
        addResponse(response);
        return;
    }
    
    // Поиск по алиасам
    let actualCmd = baseCmd;
    if (typeof aliases !== 'undefined' && aliases[baseCmd]) {
        actualCmd = aliases[baseCmd];
    }
    
    // Выполнение команды
    if (commandList[actualCmd]) {
        try {
            const result = commandList[actualCmd](args);
            
            // Если результат — Promise (асинхронная команда)
            if (result && typeof result.then === 'function') {
                const asyncResult = await result;
                if (asyncResult === 'CLEAR') {
                    clearTerminal();
                } else {
                    addResponse(asyncResult);
                }
            } else {
                // Синхронный результат
                if (result === 'CLEAR') {
                    clearTerminal();
                } else {
                    addResponse(result);
                }
            }
        } catch (error) {
            console.error('Command error:', error);
            addResponse(`<span class="error-message">bash: ${escapeHtml(trimmed)}: ошибка выполнения</span>`);
        }
    } else {
        addResponse(`<span class="error-message">bash: ${escapeHtml(trimmed)}: команда не найдена</span>`);
    }
}

commandInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = commandInput.value;
        executeCommand(cmd);
        commandInput.value = '';
    } else if (e.key === 'Tab') {
        e.preventDefault();
        autocomplete();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            commandInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            commandInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            commandInput.value = '';
        }
    } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        clearTerminal();
    }
});

document.addEventListener('click', () => {
    commandInput.focus();
});

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Инициализация
updatePrompt();
if (typeof loadSavedTheme !== 'undefined') {
    loadSavedTheme();
}
runWelcomeOnStart();
commandInput.focus();