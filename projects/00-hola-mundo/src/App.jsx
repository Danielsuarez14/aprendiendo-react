import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

export function App() {
    return (
        <div className='App'>
            <TwitterFollowCard userName='midudev'
                initialIsFollowing={true}>
                Miguel Angel Duran 
            </TwitterFollowCard>
            <TwitterFollowCard userName="pheralb">
                Pablo Hiraldo
            </TwitterFollowCard>
        </div>
    )
}
