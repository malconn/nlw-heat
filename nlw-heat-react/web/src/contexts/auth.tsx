import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type User = {
  id: string;
  name:string;
  login:string;
  avatar_url:string;
}

type AuthContextData = {
  user: User | null;
  sigInUrl: string;
}

export const AuthContext = createContext({} as AuthContextData)

type AuthProvider = {
  children: ReactNode;
}

type AuthResponse = {
  token: string;
  user: {
      id: string;
      avatar_url: string;
      name: string;
      login: string;
  }
}


export function AuthProvider(props: AuthProvider){
  const [user, setUser] = useState<User | null>(null)

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=99ac68b41439c6ed6b79`;

  async function signIn(gitubCode: string){
      const response = await api.post<AuthResponse>('authenticate',{
          code: gitubCode,

      });

      const { token, user } = response.data;

      localStorage.setItem('@dowhile:token',token)

      setUser(user)

  }

  useEffect(() =>{
      const url = window.location.href;
      const hasGithubCode = url.includes('?code=');

      if(hasGithubCode){
          const [ urlWithoutCode, gitubCode ] = url.split('?code=')  
          
          
          window.history.pushState({},'', urlWithoutCode)

          signIn(gitubCode);

      }
  }, [])


  return(
    <AuthContext.Provider value={{ signInUrl, user }}>
      {props.children}
    </AuthContext.Provider>
  )
}