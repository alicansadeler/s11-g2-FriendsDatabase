import React from 'react';

import { beforeEach, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { server } from '../mocks/server';
import 'mutationobserver-shim';

import App from '../App';

import { BrowserRouter } from 'react-router-dom';
import fs from 'fs';
import path from 'path';

const isAuthContextFileExists = fs.existsSync(
  path.resolve(__dirname, '../contexts/AuthContext.jsx'),
  'utf8'
);

const authContextFile = isAuthContextFileExists
  ? fs
      .readFileSync(
        path.resolve(__dirname, '../contexts/AuthContext.jsx'),
        'utf8'
      )
      .replaceAll(/(?:\r\n|\r|\n| )/g, '')
  : '';

const isPrivateRouteFileExists = fs.existsSync(
  path.resolve(__dirname, '../components/PrivateRoute.jsx'),
  'utf8'
);

const privateRouteFile = isPrivateRouteFileExists
  ? fs
      .readFileSync(
        path.resolve(__dirname, '../components/PrivateRoute.jsx'),
        'utf8'
      )
      .replaceAll(/(?:\r\n|\r|\n| )/g, '')
  : '';

const appFile = fs
  .readFileSync(path.resolve(__dirname, '../App.jsx'), 'utf8')
  .replaceAll(/(?:\r\n|\r|\n| )/g, '');

const mainFile = fs
  .readFileSync(path.resolve(__dirname, '../main.jsx'), 'utf8')
  .replaceAll(/(?:\r\n|\r|\n| )/g, '');

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  document.body.innerHTML = '';
});
beforeEach(() => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});

test('contexts klasöründe AuthContext.jsx isimli Context Provider Componenti dosyası oluşturulmuş', () => {
  expect(isAuthContextFileExists).toBe(true);
});

test('AuthContext.jsx dosyasında createContext() ile context oluşturulmuş', () => {
  expect(authContextFile).toContain('createContext()');
});

test('AuthContext.jsx dosyasında AuthContext.Provider tanımlanmış', () => {
  expect(authContextFile).toContain('<AuthContext.Provider');
});

test('contexts klasöründe AuthContext Providera valuelar aktarılmış', () => {
  expect(authContextFile).toContain('<AuthContext.Providervalue={');
});

test('App.jsxde oluşturulan provider kullanılmış', () => {
  expect(appFile).toContain('Provider>');
  expect(appFile.split('Provider>')).toHaveLength(3);
});

test('components klasöründe PrivateRoute.jsx isimli protected route componenti oluşturulmuş', () => {
  expect(isPrivateRouteFileExists).toBe(true);
});

test('PrivateRoute.jsx dosyasında login sayfasına redirect kullanılmış', () => {
  expect(privateRouteFile).toContain('<Redirect');
});

test('App.jsxde oluşturulan protected route componenti kullanılmış', () => {
  expect(appFile).toContain('<PrivateRoute');
});

test('main.jsxde routing için uygulama BrowserRouter ile sarmalanmış', () => {
  expect(mainFile).toContain('BrowserRouter');
});

test('App.jsxde routelar eklenmiş', () => {
  expect(appFile).toContain('<Route');
});

test('Sayfa yüklendiğinde, login sayfası çıkıyor. headerda sadece login butonu var', async () => {
  screen.getAllByText('LOGIN');
  expect(screen.queryByText('LOGOUT')).toBe(null);
  expect(screen.queryByText('FRIENDS LIST')).toBe(null);
  expect(screen.queryByText('ADD FRIEND')).toBe(null);
});

test('Login formu submit edildiğinde login oluyor. Headerda FRIENDS LIST, ADD FRIEND butonu görünüyor.', async () => {
  const user = userEvent.setup();
  await user.type(await screen.findByPlaceholderText('Username'), 'workintech');
  await user.type(await screen.findByPlaceholderText('Password'), 'wecandoit');
  await user.click(await screen.findByText('SUBMIT'));
  await screen.findByText('ADD FRIEND');
  await screen.findByText('FRIENDS LIST');
});

test('Login olunca headerda logout butonu görünüyor, login butonu kayboluyor', async () => {
  expect(screen.queryByText('LOGIN')).toBe(null);
  await screen.findByText('LOGOUT');
});

test('Logout olunca login sayfası açılıyor', async () => {
  await screen.findByText('SUBMIT');
});

test('FRIENDS LIST sayfasında isimler doğru formatta -isim-email şeklinde görüntüleniyor', async () => {
  const user = userEvent.setup();
  await user.type(await screen.findByPlaceholderText('Username'), 'workintech');
  await user.type(await screen.findByPlaceholderText('Password'), 'wecandoit');
  await user.click(await screen.findByText('SUBMIT'));
  await user.click(await screen.findByText('FRIENDS LIST'));
  expect(await screen.findAllByText('FRIENDS LIST')).toHaveLength(2);
  await screen.findByText('-Rachel Green-rachel@friends.com');
  await screen.findByText('-Joey Tribbiani-joey@friends.com');
});

test('Login bilgisi localStorageda s11d2 anahtarı ile tutuluyor', async () => {
  const user = userEvent.setup();
  expect(isAuthContextFileExists).toBe(true);
  expect(isPrivateRouteFileExists).toBe(true);
  await user.click(await screen.findByText('LOGOUT'));
  localStorage.clear('s11d2');

  await user.type(await screen.findByPlaceholderText('Username'), 'workintech');
  await user.type(await screen.findByPlaceholderText('Password'), 'wecandoit');
  await user.click(await screen.findByText('SUBMIT'));
  const storedData = localStorage.getItem('s11d2') ?? '';
  expect(storedData.length).toBeGreaterThan(63);
});

test('Login bilgisi logout olunca localStoragedan siliniyor', async () => {
  const user = userEvent.setup();
  expect(isAuthContextFileExists).toBe(true);
  expect(isPrivateRouteFileExists).toBe(true);
  await user.click(await screen.findByText('LOGOUT'));
  const storedData = localStorage.getItem('s11d2') ?? '';
  expect(storedData.length).not.toBeGreaterThan(63);
});
