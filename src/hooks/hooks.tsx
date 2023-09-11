import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '@/redux/clanmanagementstore'

export const useAppDispatch: ()=> AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
