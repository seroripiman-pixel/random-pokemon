# Simple Alarm

シンプルでスタイリッシュなブラウザベースのアラームアプリ。

## 特徴

- 🎨 モダンでクリーンなUI
- ⏰ 複数のアラーム設定可能
- 🔊 カスタムビープ音
- 💾 LocalStorageで自動保存
- 🔀 スヌーズ機能
- 📱 レスポンシブデザイン

## 使い方

1. ブラウザで `index.html` を開く
2. アラーム時刻を設定
3. ラベル（オプション）を入力
4. 「セット」ボタンで登録
5. アラーム発火時に「停止」または「5分」ボタンで対応

## 機能

- **複数アラーム設定**: 複数のアラームを同時に管理
- **ON/OFF切り替え**: アラームを一時的に無効化
- **スヌーズ機能**: アラーム発火時に5分延長
- **削除**: 不要なアラームを削除
- **自動保存**: ブラウザのLocalStorageに自動保存
- **リアルタイム時刻表示**: 現在時刻を常に表示

## 技術スタック

- HTML5
- CSS3 (Flexbox, Grid, Gradient)
- Vanilla JavaScript (ES6+)
- Web Audio API

## ファイル構成

```
simple-alarm/
├── index.html      # メインHTMLファイル
├── style.css       # スタイルシート
├── script.js       # JavaScript（アラーム機能）
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
