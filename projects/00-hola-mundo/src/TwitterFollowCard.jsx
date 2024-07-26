import { useState } from "react"

export function TwitterFollowCard({ children, userName = 'unknow', initialIsFollowing}) {
    const imageSrc = `https://unavatar.io/${userName}`

    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
    const handleClick = () =>{
        setIsFollowing(!isFollowing)
    }


    const text = isFollowing ? 'Siguiendo': 'Seguir'
    const buttonClassName = isFollowing ? 'tw-followCard-button is-following': 'tw-followCard-button'

    return (
        <article className="tw-followCard">
            <header className="tw-followCard-header">
                <img className="tw-followCard-avatar" src={imageSrc} alt="Avatar Midudev" />
                <div className="tw-followCard-info">
                    <strong>{children}</strong>
                    <span className='tw-followCard-infoUserName'>@{userName}</span>
                </div>
            </header>
            <aside>
                <button className={buttonClassName} onClick={handleClick} >
                    <span className="tw-followCard-text">{text}</span>
                    <span className="tw-followCard-stopFollow">Dejar de seguir</span>
                </button>
            </aside>
        </article>
    )
}
