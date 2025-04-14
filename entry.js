const isDev = location.port === '5173'

const loadCSS = (cssPath) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = cssPath
    document.head.appendChild(link)
}

if (isDev) {
    fetch('.')  // 本番と仕組みを合わせるため仮のリクエスト
        .then(() => {
            import(`./src/main.js`).then(() => {
                console.log('Development entry file successfully loaded')
            }).catch((error) => {
                console.error('Error loading development entry file:', error)
            })
        })
        .catch((error) => {
            console.error('Failed to fetch manifest.json in development:', error)
        })
} else {
    // 本番環境：manifest.json からエントリーポイントを取得してインポート
    fetch('.vite/manifest.json')
        .then((res) => res.json())
        .then((manifest) => {
            Object.values(manifest).filter((m) => m.isEntry && m.name === 'main').forEach((entry) => {
                if (entry && entry.file) {
                    let entryFile = `../${entry.file}`
                    if (!entryFile.endsWith('.js')) {
                        entryFile += '.js'
                    }
                    import(/* @vite-ignore */ entryFile)
                } if (entry.css) {
                    entry.css.forEach((css) => {
                        loadCSS(`/vivid/${css}`)
                    })
                }
            })
        })
}
