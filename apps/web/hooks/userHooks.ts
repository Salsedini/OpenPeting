'use client'

import useSWR, { mutate } from 'swr';
import { User } from '../model/user';
import useSWRMutation from 'swr/mutation'


export interface IuseUsers {
    users: User[];
    isLoadingUsers: boolean;
    isErrorUsers: Error;
}

export interface IuseUser {
  user: User;
  isLoadingUser: boolean;
  isErrorUser: Error;
}

const Userfetcher = (url: string) =>
  fetch(url).then((res) => res.json());

/*const Userfetcher = (url: string, token: string) =>
  fetch(url, {
    headers:{
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }
  ).then((res) => res.json());
*/

export function useAllUsers(): IuseUsers{
  const { data, error, isLoading } = useSWR("http://localhost:3333/api/users", Userfetcher);

  return {
    users: data,
    isLoadingUsers: isLoading,
    isErrorUsers: error,
  };

}

export function useGetUserById(id: string | null | undefined): IuseUser{
  const { data, error, isLoading } = useSWR(`http://localhost:3333/api/user/${id}`, Userfetcher);

  return {
    user: data,
    isLoadingUser: isLoading,
    isErrorUser: error,
  };

}
