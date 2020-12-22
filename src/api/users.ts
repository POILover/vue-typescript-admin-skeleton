import request from '@/utils/request'

export const getUsers = (params: any) =>
  request({
    url: '/api/fs/auth/info',
    method: 'get',
    params
  })

export const getUserInfo = (params: any) =>
  request({
    url: '/api/fs/auth/info',
    method: 'get',
    params
  })
  // export function login(data) {
  //   return request({
  //     url: '/api/fs/auth/login',
  //     method: 'post',
  //     data: data,
  //   })
  // }
export const getUserByName = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'get'
  })

export const updateUser = (username: string, data: any) =>
  request({
    url: `/users/${username}`,
    method: 'put',
    data
  })

export const deleteUser = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'delete'
  })

export const login = (data: any) =>
  request({
    url: '/api/fs/auth/login',
    method: 'post',
    data
  })

export const logout = () =>
  request({
    url: '/users/logout',
    method: 'post'
  })

export const register = (data: any) =>
  request({
    url: '/users/register',
    method: 'post',
    data
  })
