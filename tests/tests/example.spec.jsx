// import { test, expect } from '@playwright/test';

// test('ログインフォームで未入力エラーが表示されること', async ({ page }) => {
//   await page.goto('http://localhost:3000/login'); // 適宜URL調整
//   // ボタンをクリック（バリデーションが走る）
//   await page.click('button:has-text("ログイン")');//成功はこの前にかける
//   //このコードは失敗の方

//   // エラーメッセージが表示されるか確認
//   await expect(page.locator('text=メールアドレスは必須です')).toBeVisible();
//   await expect(page.locator('text=パスワードは必須です')).toBeVisible();
// })

// //成功↓
// test('ログインフォームで正しく入力した場合はエラーが表示されないこと', async ({ page }) => {
//   await page.goto('http://localhost:3000/login');

//   await page.fill('input[name="email"]', 'test@example.com');
//   await page.fill('input[name="password"]', 'password123');
//   await page.click('button:has-text("ログイン")');

//   // エラーが表示されないことを確認
//   await expect(page.locator('text=メールアドレスは必須です')).not.toBeVisible();
//   await expect(page.locator('text=パスワードは必須です')).not.toBeVisible();
// });

//遷移先でリダイレクト出来たらなおいい
//テストではコメントアウトしなくてもいい

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import { Login } from '../../src/Login.jsx';

describe('Login コンポーネント', () => {
  it('タイトルが表示されること', () => {
    render(
      <CookiesProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </CookiesProvider>
    );

    expect(screen.getByRole('heading', { name: 'ログイン' })).toBeInTheDocument();

    // メールアドレス入力フィールドがあるか確認（name属性やplaceholderに応じて調整）
    expect(screen.getByLabelText(/メールアドレス/i)).toBeInTheDocument();

    // パスワード入力フィールドがあるか確認
    expect(screen.getByLabelText(/パスワード/i)).toBeInTheDocument();

    // ログインボタンの存在確認
    expect(screen.getByRole('button', { name: /ログイン/i })).toBeInTheDocument();
  });
});




