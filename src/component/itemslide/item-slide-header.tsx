const ItemSliderHeader = () => {
  return (
    <div className="item_slide_header">
      <div className="item_slide_header-img">
        <img
          src="https://s199.imacdn.com/vg/2022/03/23/178dac546a7d5c1a_4f76b1895239b273_22962416480417967118684.jpg"
          alt=""
        />
      </div>
      <div className="item_slide_header-content">
        <div className="slide_content_left">
          <div className="slide_header-content-name-item">
            <h4>Kawaii dake ja Nai Shikimori-san</h4>
          </div>
          <div className="slide_header-icon-item">
            <div className="icon-item">
              <div className="start">
                <i className="fa-solid fa-star"></i>
                <span>8.8</span>
              </div>
              <div className="episodes">
                <i className="material-icons">schedule</i>
                <span>27 tập</span>
              </div>
              <div className="genres">
                <i className="material-icons">add_circle</i>
                <span>Hành động - chuyển sinh - học đường</span>
              </div>
            </div>
            <div className="slide_header-desc">
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
                accusamus iste, laborum fugit quisquam reprehenderit sit maiores
                beatae tempore neque sint, optio, consectetur officia quidem ad
                consequuntur harum modi. Minima.
              </span>
            </div>
            <div className="slide_header-button">
              <button>Xem ngay</button>
            </div>
          </div>
        </div>
        <div className="slide_content_right">
          <span className="icons">
            <i className="material-icons">play_arrow</i>
          </span>
        </div>
      </div>
    </div>
  );
};
export default ItemSliderHeader;
