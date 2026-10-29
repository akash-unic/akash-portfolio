import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getDebuggerUrl(port) {
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json`);
      const list = await res.json();
      const page = list.find(item => item.type === 'page');
      if (page && page.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch (e) {}
    await wait(300);
  }
  throw new Error('Could not find chrome target');
}

async function main() {
  const nextPort = 3060;
  const cdpPort = 9270;

  console.log('Starting next server...');
  const nextServer = spawn('C:\\nvm4w\\nodejs\\node.exe', ['node_modules/next/dist/bin/next', 'start', '-p', String(nextPort)], {
    env: { ...process.env, PATH: 'C:\\nvm4w\\nodejs;' + process.env.PATH },
    stdio: 'ignore'
  });

  await wait(3500);

  const chromeProcess = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${cdpPort}`,
    '--window-size=390,844',
    `http://localhost:${nextPort}`
  ]);

  try {
    const wsUrl = await getDebuggerUrl(cdpPort);
    const ws = new WebSocket(wsUrl);
    let id = 1;
    const callbacks = new Map();
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && callbacks.has(msg.id)) {
        callbacks.get(msg.id)(msg);
        callbacks.delete(msg.id);
      }
    };
    await new Promise(r => ws.onopen = r);

    const send = (method, params = {}) => {
      return new Promise((resolve) => {
        const msgId = id++;
        callbacks.set(msgId, resolve);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    };

    await send('Page.enable');
    await send('Runtime.enable');
    await wait(2000);

    const evalCode = async (code) => {
      const res = await send('Runtime.evaluate', {
        expression: `(() => { try { return (${code})(); } catch(e) { return 'ERROR: ' + e.message; } })()`,
        returnByValue: true,
        awaitPromise: true
      });
      return res.result?.result?.value;
    };

    const heroMetrics = await evalCode(`() => {
      const hero = document.getElementById('home');
      const title = document.querySelector('h1');
      const creds = Array.from(hero.querySelectorAll('div')).find(d => d.textContent?.includes('Chandigarh University') && d.textContent?.includes('NCC'));
      const techBox = Array.from(hero.querySelectorAll('div')).find(d => d.textContent?.includes('Core Technologies & Capabilities') && d.classList?.contains('rounded-3xl'));

      return {
        heroHeight: hero.offsetHeight,
        viewportHeight: window.innerHeight,
        titleTop: title ? Math.round(title.getBoundingClientRect().top) : null,
        credsTop: creds ? Math.round(creds.getBoundingClientRect().top) : null,
        techBoxTop: techBox ? Math.round(techBox.getBoundingClientRect().top) : null
      };
    }`);

    console.log('Mobile Hero Metrics:', heroMetrics);

    ws.close();
  } finally {
    chromeProcess.kill();
    nextServer.kill();
  }
}

main().catch(console.error);
