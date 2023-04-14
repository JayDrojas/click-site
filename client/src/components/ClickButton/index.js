import "./clickbutton.css";
import { useEffect, useState } from "react";
import axios from "axios";

const ClickButton = ({ getStateClicks }) => {
  const sessionKey = "current-clicks-jdr";
  const [clicks, setClicks] = useState(
    Number(window.sessionStorage.getItem(sessionKey)) ?? 0
  );
  const [userState, setUserState] = useState("Unknown");
  const [loadingClick, setLoadingClick] = useState(false);

  async function handleClick(e) {
    e.preventDefault();
    setLoadingClick(true)
    let total = clicks + 1;
    window.sessionStorage.setItem(sessionKey, total);
    const payload = {
      state: userState,
      clicks: 1,
    };

    const response = await axios({
      url: "https://click-site.vercel.app/api/save",
      method: "POST",
      data: payload,
    });

    if (response.status === 200) {
      setClicks(total);
      getStateClicks();
    }
    setLoadingClick(false)
  }

  useEffect(() => {
    let storageClicks = window.sessionStorage.getItem(sessionKey);

    if (!storageClicks) {
      window.sessionStorage.setItem(sessionKey, "0");
    }
  }, []);

  useEffect(() => {
    const success = async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const locationData = await axios({
        url: `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
      });

      if (locationData.status === 200)
        setUserState(locationData.data.principalSubdivision);
    };

    const error = (error) => {
      setUserState("Unknown");
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return (
    <div className="user-ui">
      <h1>Your state is : {userState}</h1>
      <label className="click-title">
        You have clicked it <span>{clicks}</span> times.
      </label>
      <button disabled={loadingClick} onClick={handleClick}>Click here!</button>
    </div>
  );
};

export default ClickButton;
