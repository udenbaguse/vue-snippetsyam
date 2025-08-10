import plugin from '../plugin.json';

class AcodePlugin {
  async init($page) {
    // Buat UI plugin
    $page.innerHTML = `
      <h1>Vue Snippet: vbase</h1>
      <p>Template dasar Vue 3 dengan &lt;script setup&gt;</p>
      <button id="copy-vbase">Copy vbase snippet</button>
    `;

    // Tambahkan event klik
    document.getElementById('copy-vbase').onclick = () => {
      const snippet = `<template></template>\n<script setup></script>\n<style scoped></style>`;
      this.copyToClipboard(snippet);
    };
  }

  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      acode.toast('vbase snippet copied!');
    });
  }

  async destroy() {
    // Tidak ada yang perlu dibersihkan untuk sekarang
  }
}

if (window.acode) {
  const acodePlugin = new AcodePlugin();
  acode.setPluginInit(plugin.id, async (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
    if (!baseUrl.endsWith('/')) {
      baseUrl += '/';
    }
    acodePlugin.baseUrl = baseUrl;
    await acodePlugin.init($page, cacheFile, cacheFileUrl);
  });
  acode.setPluginUnmount(plugin.id, () => {
    acodePlugin.destroy();
  });
}
