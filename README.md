# ストップウォッチ

シンプルでスタイリッシュなブラウザベースのストップウォッチアプリ。

## 特徴

- 🎨 モダンでクリーンなUI
- ⏱️ 正確な時間計測
- 💾 LocalStorageで自動保存
- 🏁 ラップ機能
- 📱 レスポンシブデザイン
- ⚡ 軽量で高速

## 使い方

1. ブラウザで `index.html` を開く
2. 「開始」ボタンをクリック
3. 計測開始
4. 「ラップ」でラップタイム記録
5. 「停止」で一時停止
6. 「リセット」で初期化

## 機能

- **開始/停止**: ストップウォッチの開始・一時停止
- **リセット**: 時刻とラップを全てリセット
- **ラップ機能**: ラップタイムを記録
- **自動保存**: ブラウザのLocalStorageに自動保存
- **実時間計測**: requestAnimationFrameで高精度計測

## 技術スタック

- HTML5
- CSS3 (Grid, Gradient)
- Vanilla JavaScript (ES6+)
- Web APIs (LocalStorage, requestAnimationFrame)

## ファイル構成

```
stopwatch/
├── index.html      # メインHTMLファイル
├── style.css       # スタイルシート
├── script.js       # JavaScript（ストップウォッチ機能）
├── README.md       # このファイル
└── .gitignore      # Git設定
```

## ブラウザ対応

- Chrome/Chromium
- Firefox
- Safari
- Edge

## ライセンス

MIT
