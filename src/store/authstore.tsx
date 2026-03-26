import {create} from 'zustand';

type AuthStore={
    token:string | null,
    settoken:(t:string)=>void,
    logout:() => void
}

export const useAuthStore= create<AuthStore>((set )=>(
{
     token:localStorage.getItem("token"),

     settoken:(t)=>
     {
        localStorage.setItem("token",t);
        set({token:t})
     },

     logout:()=>
     {
        localStorage.removeItem("token");
        set({token:null});
     }


}));