const isLocal = location.hostname === 'localhost' ||
    location.hostname === '127.0.0.1' ||
    location.port === '4173';

if (isLocal) {
    import('./src/main.js'); // ← 修正ここ！
} else {
    const base = location.pathname.replace(/\/[^/]*$/, '/') || '/';
    fetch(`${base}manifest.json`)
        .then(res => res.json())
        .then(manifest => {
            const entry = Object.values(manifest).find(m => m.isEntry);
            if (entry && entry.file) {
                import(`${base}${entry.file}`);
            } else {
                console.error('No entry found in manifest.json');
            }
        });
}
