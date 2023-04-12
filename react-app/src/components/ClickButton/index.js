import { useEffect, useState } from "react";
import axios from "axios";

const ClickButton = () => {
  const sessionKey = "current-clicks-jdr";
  const [clicks, setClicks] = useState(
    Number(window.sessionStorage.getItem(sessionKey)) ?? 0
  );
  const [userState, setUserState] = useState("unknown");

  async function handleClick(e) {
    e.preventDefault();

    let total = clicks + 1;
    window.sessionStorage.setItem(sessionKey, total);
    const payload = {
      state: userState,
      clicks: 1,
    };

    const response = await axios({
      url: "/api/save",
      method: "POST",
      data: payload,
    });
    console.log(response);
    setClicks(total);
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
      setUserState("unknown");
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return (
    <div>
      <label>{clicks}</label>
      <button onClick={handleClick}>hello</button>
    </div>
  );
};

export default ClickButton;
