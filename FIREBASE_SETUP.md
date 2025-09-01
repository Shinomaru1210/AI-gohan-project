# Firebase設定ガイド

このプロジェクトでFirebaseを使用するための設定手順です。

## 1. Firebaseプロジェクトの作成

1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. 「プロジェクトを追加」をクリック
3. プロジェクト名を入力（例：`ai-gohan-project`）
4. Google Analyticsの設定（任意）
5. 「プロジェクトを作成」をクリック

## 2. Firestore Databaseの設定

1. 左メニューから「Firestore Database」を選択
2. 「データベースを作成」をクリック
3. セキュリティルールを選択（開発中は「テストモードで開始」）
4. ロケーションを選択（例：`asia-northeast1`）

## 3. セキュリティルールの設定

Firestore Database > ルール で以下のルールを設定：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 冷蔵庫データ
    match /fridge/{document} {
      allow read, write: if true; // 開発中は全許可
    }
    
    // 買い物リストデータ
    match /buyList/{document} {
      allow read, write: if true; // 開発中は全許可
    }
  }
}
```

## 4. 設定値の取得

1. プロジェクトの設定（⚙️アイコン）をクリック
2. 「全般」タブで「マイアプリ」セクションを確認
3. Webアプリがない場合は「Webアプリを追加」をクリック
4. アプリのニックネームを入力
5. 設定オブジェクトをコピー

## 5. 設定ファイルの更新

1. `config/firebase.example.ts` を `config/firebase.ts` にコピー
2. コピーしたファイルの設定値を実際の値に置き換え

```typescript
const firebaseConfig = {
  apiKey: "実際のAPIキー",
  authDomain: "実際のドメイン",
  projectId: "実際のプロジェクトID",
  storageBucket: "実際のストレージバケット",
  messagingSenderId: "実際の送信者ID",
  appId: "実際のアプリID"
};
```

## 6. 依存関係のインストール

```bash
npm install firebase @react-native-async-storage/async-storage
```

## 7. 動作確認

アプリを起動して、冷蔵庫タブと買い物タブでデータの追加・削除・更新ができることを確認してください。

## 注意事項

- 開発中はセキュリティルールを緩く設定していますが、本番環境では適切な認証と認可を設定してください
- APIキーなどの機密情報は環境変数で管理することを推奨します
- 本番環境では、ユーザー認証を実装して、各ユーザーのデータを分離することを推奨します

## トラブルシューティング

### エラー：Firebase App named '[DEFAULT]' already exists

- アプリを再起動してください
- 開発サーバーを停止して再起動してください

### エラー：Permission denied

- Firestoreのセキュリティルールを確認してください
- データベースが作成されているか確認してください

### データが表示されない

- ブラウザのコンソールでエラーメッセージを確認してください
- Firebase設定が正しく設定されているか確認してください

