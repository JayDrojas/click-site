import { useEffect, useState } from "react"

const ClickButton = () => {
    const sessionKey = "current-clicks-jdr"
    const [clicks, setClicks] = useState(Number(window.sessionStorage.getItem(sessionKey)) ?? 0);

    function handleClick (e) {
        e.preventDefault();
        let total = clicks + 1;
        window.sessionStorage.setItem(sessionKey, total)
        setClicks(total)
    }

    useEffect(() => {
        let storageClicks = window.sessionStorage.getItem(sessionKey);
        
        if(!storageClicks) {
            window.sessionStorage.setItem(sessionKey, '0')
        } 
    }, [])

    return (
        <div>
            <label>{clicks}</label>
            <button onClick={handleClick}>hello</button>
        </div>
    )
}

export default ClickButton;