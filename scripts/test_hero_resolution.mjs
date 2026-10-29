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
  const nextPort = 3050;
  const cdpPort = 9260;

  console.log('Starting next server on port', nextPort);
  const nextServer = spawn('C:\\nvm4w\\nodejs\\node.exe', ['node_modules/next/dist/bin/next', 'start', '-p', String(nextPort)], {
    env: { ...process.env, PATH: 'C:\\nvm4w\\nodejs;' + process.env.PATH },
    stdio: 'ignore'
  });

  await wait(3500);

  const chromeProcess = spawn(chromePath, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${cdpPort}`,
    '--window-size=1280,900',
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

    const outDir = path.resolve('./scripts/hero_screenshots');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    // Step through the hero scroll range: 0 to 900px in 150px steps
    for (let scrollY = 0; scrollY <= 900; scrollY += 150) {
      await evalCode(`() => window.scrollTo(0, ${scrollY})`);
      await wait(250);

      const status = await evalCode(`() => {
        const title = document.querySelector('h1')?.parentElement;
        const creds = document.querySelector('.grid.grid-cols-1.sm\\:grid-cols-2.gap-3\\.5');
        const techBox = document.querySelector('.mt-14.sm\\:mt-16');
        const connector = document.querySelector('.pointer-events-none.select-none');

        const titleStyle = title ? window.getComputedStyle(title) : null;
        const credsStyle = creds ? window.getComputedStyle(creds) : null;
        const techStyle = techBox ? window.getComputedStyle(techBox) : null;
        const connectorRect = connector ? connector.getBoundingClientRect() : null;

        return {
          scrollY: window.scrollY,
          titleOpacity: titleStyle ? titleStyle.opacity : null,
          titleTransform: titleStyle ? titleStyle.transform : null,
          credsOpacity: credsStyle ? credsStyle.opacity : null,
          credsTransform: credsStyle ? credsStyle.transform : null,
          techBoxOpacity: techStyle ? techStyle.opacity : null,
          techBoxTransform: techStyle ? techStyle.transform : null,
          connectorTop: connectorRect ? Math.round(connectorRect.top) : null
        };
      }`);

      console.log(`scrollY: ${scrollY} =>`, JSON.stringify(status));

      const shot = await send('Page.captureScreenshot', { format: 'png' });
      const data = shot.data || shot.result?.data;
      if (data) {
        fs.writeFileSync(path.join(outDir, `hero_scroll_${scrollY}.png`), Buffer.from(data, 'base64'));
      }
    }

    ws.close();
  } finally {
    chromeProcess.kill();
    nextServer.kill();
  }
}

main().catch(console.error);
