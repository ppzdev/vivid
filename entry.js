const isDev = location.port === '5173' || location.port === '4173';

if (isDev) {
    // 開発環境：直接 src/main.js をインポート
    import('/src/main.js');
} else {
    // 本番環境：manifest.json からエントリーポイントを取得してインポート
    fetch('./manifest.json')
        .then((res) => res.json())
        .then((manifest) => {
            const entry = Object.values(manifest).find((m) => m.isEntry);
            if (entry && entry.file) {
                import(/* @vite-ignore */ `./${entry.file}`);
            } else {
                console.error('No entry found in manifest.json');
            }
        });
}
