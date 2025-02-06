import React, { useContext } from "react";
import "../css/hero.css";
import assets from "../assets/assets";
import { Context } from "../context/context";

const Hero = () => {
  const { onSent, showResult, recentPrompt,loading, resultData, setinput, input } =
    useContext(Context);

  return (
    <>
      <div className="hero">
        <div className="nav">
          <p><b>AskNoVa</b></p>
          <img src={assets.user} alt="User" />
        </div>
        <div className="main-container">
          {!showResult ? (
            <>
              <div className="greet">
                <p>
                  <span>Hello, Dev.</span>
                </p>
                <p>How can I help you today?</p>
              </div>
              <div className="cards">
                <div className="card">
                  <p>Suggest beautiful places to see on an upcoming road trip</p>
                  <img src={assets.compass} alt="Compass" />
                </div>
                <div className="card">
                  <p>Briefly summarize this concept: urban planning</p>
                  <img src={assets.bulb} alt="Bulb" />
                </div>
                <div className="card">
                  <p>Brainstorm team bonding activities for our work retreat</p>
                  <img src={assets.msg} alt="Message" />
                </div>
                <div className="card">
                  <p>Tell me about React js and React native</p>
                 <img src={assets.snippet} alt="Snippet" />
                </div>
              </div>
            </>
          ) : (
            <div className="result">
               <div className="result-title">
                <img src={assets.user} alt="" />
                <p>{recentPrompt}</p>
               </div>
               <div className="result-data">
                <img src={assets.gemini} alt="" />
                {loading?
                <div className="loader">
                  <div class="dots">
                       <div></div>
                       <div></div>
                        <div></div>
                  </div>
                </div>:
                <>
                  {console.log("Result Data:", resultData)}
                 <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                 </>
                }
               
               </div>
            </div>
          )}

          {/* Moved Search Box inside Main-Bottom */}
          <div className="main-bottom">
            <div className="searchbox">
              <input
                onChange={(e) => setinput(e.target.value)}
                value={input}
                type="text"
                placeholder="Enter a prompt here...."
              />
              <div>
                <img src={assets.gallery_icon} alt="Gallery" />
                <img src={assets.mic} alt="Mic" />
                {input?<img src={assets.send} onClick={() => onSent(input)} alt="Send" />:null}
              </div>
            </div>

            <p className="bottom-info">
              AskNova may display inaccurate info, including about people, so
              double-check its responses. Your privacy and AskNova App.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
