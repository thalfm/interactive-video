import {createContext} from 'react'

interface StoreProps{
    token: string | null,
    setToken: Function
}
const StoreContext = createContext<StoreProps>({
    token: '',
    setToken: () => {}
})

export default StoreContext;