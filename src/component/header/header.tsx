import { Link } from "react-router-dom";
import "./header.style.css";
import mainLogo from "../../assests/anime-logo-png-7-removebg-preview (1).png";
import CollectionDropDown from "../collection-dropdown/collection-dropdown";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const refDiv = useRef<HTMLDivElement | null>(null);
  const reDivDrop = useRef<HTMLDivElement | null>(null);
  const [isMobileDropdown,setIsMobileDropdown] = useState(false)
  const [isMobileBar,setIsMobileBar] = useState(false)
  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
 
  useEffect(() => {
    window.addEventListener('resize', e => {
      setWindowWidth(window.innerWidth);
    });
  }, [window.innerWidth]);

  useEffect(() => {
    window.addEventListener('resize', e => {
      setWindowHeight(window.innerHeight);
    });
  }, [window.innerHeight]);

  const handleDropDown = () => {
    setIsMobileDropdown(!isMobileDropdown)
  }

  const listenScrollEvent = () => {
    if (window.scrollY > 100 && refDiv.current) {
      refDiv.current.style.background = `#13161fc9`;
      refDiv.current.style.transition = `1s ease-in`;
    } else {
      refDiv.current!.style.background = "transparent";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);
  return (
    <header>
      <div className="navbar" ref={refDiv}>
        <div className="navbar-left">
          <div className="logo">
            <img src={mainLogo} alt="" />
          </div>
        </div>
          <div className="mobile" onClick={() => setIsMobileBar(!isMobileBar)}>
              <span className="icons">
                <i className="material-icons menu">{isMobileBar ? `menu_open` : `menu`}</i>
              </span>
          </div>
        <div className="navbar-right" style={ windowWidth < 940 ? {width : isMobileBar ? `100%` : `0%` , opacity : isMobileBar ? 1 : 0} : {}}>
          <div className="navbar-item">
            <Link to={`/`}>
              <span>Trang Chủ</span>
            </Link>
          </div>
          <div className="navbar-item dropdown" onClick={handleDropDown}>
            <Link to={``} className="disable ">
              <span>Mục Lục</span>
            </Link>
            <CollectionDropDown isMobile = {isMobileDropdown} />
          </div>
          <div className="navbar-item">
            <Link to={``}>
              <span>Truyện</span>
            </Link>
          </div>  
        </div>
        <div className="func">
          <div className="search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="search" placeholder="search your anime" />
            </div>
            <div className="button-login">
              <Link to={``}>
                <span>Login</span>
              </Link>
            </div>
          </div>
      </div>
    </header>
  );
};

export default Header;
