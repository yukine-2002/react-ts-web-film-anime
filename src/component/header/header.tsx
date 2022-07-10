import { Link } from "react-router-dom";
import "./header.style.css";
import mainLogo from "../../assests/anime-logo-png-7-removebg-preview (1).png";
import CollectionDropDown from "../collection-dropdown/collection-dropdown";
import { useEffect, useRef, useState } from "react";
import { useSearch } from "../../utils/useFetchSerice";
import DropdownSearch from "../dropdown-search/dropdown-search";
import { Spinner } from "../lazyLoading/lazyLoading";

const Header = () => {
  const refDiv = useRef<HTMLDivElement | null>(null);
  const reDivDrop = useRef<HTMLDivElement | null>(null);
  const [isMobileDropdown, setIsMobileDropdown] = useState(false);
  const [isMobileBar, setIsMobileBar] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [search, setSearch] = useState<string>("");

  const { data, isLoading, isSuccess, refetch } = useSearch({
    keyword: search,
    limit: windowHeight/100,
    enabled: true,
  });
  useEffect(() => {
    window.addEventListener("resize", (e) => {
      setWindowWidth(window.innerWidth);
    });
  }, [window.innerWidth]);

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      setWindowHeight(window.innerHeight);
    });
  }, [window.innerHeight]);

  const handleDropDown = () => {
    setIsMobileDropdown(!isMobileDropdown);
  };

  const listenScrollEvent = () => {
    if (window.scrollY > 100 && refDiv.current) {
      refDiv.current.style.background = `#13161fc9`;
      refDiv.current.style.transition = `1s ease-in`;
    } else {
      refDiv.current!.style.background = "transparent";
    }
  };
 
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
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
            <i className="material-icons menu">
              {isMobileBar ? `menu_open` : `menu`}
            </i>
          </span>
        </div>
        <div
          className="navbar-right"
          style={
            windowWidth < 940
              ? {
                  width: isMobileBar ? `100%` : `0%`,
                  opacity: isMobileBar ? 1 : 0,
                }
              : {}
          }
        >
          <div className="navbar-item">
            <Link to={`/`}>
              <span>Trang Chủ</span>
            </Link>
          </div>
          <div className="navbar-item dropdown" onClick={handleDropDown}>
            <Link to={``} className="disable ">
              <span>Mục Lục</span>
            </Link>
            <CollectionDropDown isMobile={isMobileDropdown} />
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
            <input
              type="search"
              onChange={handleSearch}
              placeholder="search your anime"
            />
            {search ? isSuccess ? <DropdownSearch dataSearch = {data.data} /> : <Spinner /> : ""}
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
