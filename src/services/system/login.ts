// @ts-ignore
/* eslint-disable */
import { getToken, getTokenType, removeToken } from '@/utils/auth';
import { request } from 'umi';

/** Get captcha ID GET /api/v1/captcha/id */
export async function getCaptchaId(options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Captcha>>('/api/v1/p/captcha/id', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Response captcha image GET /api/v1/captcha/image */
export function getCaptchaImageURL(id: string) {
  return `/api/v1/p/captcha/image?id=${id}&reload=1&ts=${new Date().getTime()}`;
}

/** Login system with username and password POST /api/v1/login */
export async function login(body: API.LoginForm, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.LoginToken>>('/api/v1/p/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Logout system POST /api/v1/current/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>('/api/v1/current/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** Query current user menus based on the current user role GET /api/v1/current/menus */
export async function fetchCurrentMenus(options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Menu[]>>('/api/v1/current/menus', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Query current user menus based on the current user role GET /api/v1/p/menus */
export async function fetchPublicMenus(options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Menu[]>>('/api/v1/p/menus', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Change current user password PUT /api/v1/current/password */
export async function updateCurrentPassword(
  body: API.UpdateLoginPassword,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult<any>>('/api/v1/current/password', {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Refresh current access token POST /api/v1/current/refresh-token */
export async function refreshToken(options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.LoginToken>>('/api/v1/current/refresh-token', {
    method: 'POST',
    ...(options || {}),
  });
}

/** Get current user info GET /api/v1/current/user */
export async function getCurrentUser(options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.User>>('/api/v1/current/user', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Get current user info GET /api/v1/current/user */
export async function fetchCurrentUser(options = {}) {
  const url = '/api/v1/current/user';
  const token = getToken();
  const tokenType = getTokenType();

  if (!token) {
    return { isLogin: false, error: 'Token not found' };
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${tokenType} ${token}`,
      },
      ...options,
    });

    // مدیریت وضعیت پاسخ
    if (response.status === 401) {
      removeToken();
      return { isLogin: false };
    }

    if (!response.ok) {
      return { isLogin: false };
    }

    // Data analysis if successful
    const data = await response.json();
    return { currentUser: data.data, isLogin: true };
  } catch (error) {
    return { isLogin: false};
  }
}

/** Change current user info PUT /api/v1/current/user */
export async function updateCurrentUser(body: API.User, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>('/api/v1/current/user', {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}
