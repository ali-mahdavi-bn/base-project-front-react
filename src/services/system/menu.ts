// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Query menu list GET /api/v1/admin/menus */
export async function fetchMenu(params: API.PaginationParam, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Menu[]>>('/api/v1/admin/menus', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Create menu record POST /api/v1/admin/menus */
export async function addMenu(body: API.Menu, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Menu>>('/api/v1/admin/menus', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** Get menu record by ID GET /api/v1/admin/menus/${id} */
export async function getMenu(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<API.Menu>>(`/api/v1/admin/menus/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update menu record by ID PUT /api/v1/admin/menus/${id} */
export async function updateMenu(id: string, body: API.Menu, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/admin/menus/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** Delete menu record by ID DELETE /api/v1/admin/menus/${id} */
export async function delMenu(id: string, options?: { [key: string]: any }) {
  return request<API.ResponseResult<any>>(`/api/v1/admin/menus/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
