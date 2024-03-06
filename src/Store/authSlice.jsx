import { createSlice } from "@reduxjs/toolkit";
const initialState={
    user:null
}

export const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
            window.localStorage.setItem('user',action.payload)
        },
        removeUser:(state)=>{
            state.user=null
            window.localStorage.removeItem('user')
        }
    }
})
export const {setUser,removeUser}=authSlice.actions
export default authSlice.reducer