'use strict';

(() => {
  const cardinal = globalThis.Cardinal.default;
  const source = document.querySelector('#source-input');
  const output = document.querySelector('#result-output');
  const theme = document.querySelector('#theme-select');
  const lineNumbers = document.querySelector('#line-numbers');
  const firstLine = document.querySelector('#first-line');
  const indicator = document.querySelector('#status-indicator');
  const status = document.querySelector('#status-text');
  const initialSource = [
    '#!/usr/bin/env node',
    '// Cardinal preserves source layout and comments.',
    'const release = {',
    '  package: "@stackline/cardinal",',
    '  compatible: true',
    '};',
    '',
    'console.log(release.package);'
  ].join('\n');

  document.querySelector('#highlight-button').addEventListener('click', highlight);
  document.querySelector('#reset-button').addEventListener('click', () => {
    source.value = initialSource;
    theme.value = 'default';
    lineNumbers.checked = false;
    firstLine.value = '1';
    highlight();
  });
  document.querySelector('#copy-output-button').addEventListener('click', async (event) => {
    await navigator.clipboard.writeText(stripAnsi(currentResult));
    flash(event.currentTarget);
  });
  document.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-copy]');
    if (!button) return;
    await navigator.clipboard.writeText(button.dataset.copy);
    flash(button);
  });
  for (const input of [source, theme, lineNumbers, firstLine]) input.addEventListener('input', highlight);

  let currentResult = '';
  source.value = initialSource;
  highlight();

  function highlight() {
    try {
      currentResult = cardinal.highlight(source.value, {
        theme: theme.value,
        linenos: lineNumbers.checked,
        firstline: Math.max(1, Number(firstLine.value) || 1)
      });
      renderAnsi(currentResult);
      document.querySelector('#source-count').textContent = `${source.value.length.toLocaleString()} characters`;
      status.textContent = 'Highlighted with the production package bundle.';
      indicator.classList.remove('error');
    } catch (error) {
      currentResult = '';
      output.textContent = error.message;
      status.textContent = 'The default parser rejected this source.';
      indicator.classList.add('error');
    }
  }

  function renderAnsi(value) {
    output.textContent = '';
    const matcher = /\u001b\[([0-9;]+)m/g;
    let activeClass = '';
    let cursor = 0;
    let match;
    while ((match = matcher.exec(value))) {
      appendText(value.slice(cursor, match.index), activeClass);
      const code = match[1].split(';').pop();
      activeClass = code === '39' || code === '0' ? '' : `ansi-${code}`;
      cursor = matcher.lastIndex;
    }
    appendText(value.slice(cursor), activeClass);
  }

  function appendText(value, className) {
    if (!value) return;
    if (!className) return output.append(document.createTextNode(value));
    const span = document.createElement('span');
    span.className = className;
    span.textContent = value;
    output.append(span);
  }

  function stripAnsi(value) {
    return value.replace(/\u001b\[[0-9;]*m/g, '');
  }

  function flash(button) {
    const original = button.textContent;
    button.textContent = 'Copied';
    setTimeout(() => { button.textContent = original; }, 1200);
  }
})();
