import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "@/src/store"
import type { User } from '@/src/types/user'

type UserState =  {
  currentUser: User | null
}

const initialState: UserState = {
    currentUser: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload
    },
  },
})

export const { setCurrentUser } = userSlice.actions
export const selectCurrentUser = (state: RootState) => state.user.currentUser
export default userSlice.reducer