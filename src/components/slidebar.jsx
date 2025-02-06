
import React, { useContext, useEffect, useState } from "react";
import "../css/sidebar.css";
import assets from "../assets/assets";
import { Context } from "../context/context";

const Slidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompt, setRecentPrompt,newchat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="slidebar">
      <div className="top">
        <img
          onClick={() => setExtended(!extended)}
          className="menu"
          src={assets.menu}
          alt="Menu Icon"
        />
      </div>
      <div className="new-chat" onClick={()=>newchat()}>
        <img src={assets.newpage} alt="New Chat Icon" />
        {extended && <p>New Chat</p>}
      </div>

      {extended && prevPrompt.length > 0 && (
        <div className="recent">
          <p className="recent-title">Recent</p>
          {prevPrompt.map((item, index) => (
            <div key={index} className="recent-entry" onClick={() => loadPrompt(item)}>
              <img src={assets.msg} alt="Message Icon" />
              <p>{item.slice(0, 18)} ...</p>
            </div>
          ))}
        </div>
      )}

      <div className="bottom">
        <div className="bottom-item">
          <img src={assets.qmark} alt="Help Icon" />
          {extended && <p>Help</p>}
        </div>
        <div className="bottom-item">
          <img src={assets.timer} alt="Activities Icon" />
          {extended && <p>Activities</p>}
        </div>
        <div className="bottom-item">
          <img src={assets.setting} alt="Settings Icon" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Slidebar;
