import { useState } from "react";
import { useParams } from "react-router-dom";
import ItemLarge from "../../component/item-slide/item-large";
import ItemMedium from "../../component/item-slide/item-medium";
import { Spinner } from "../../component/lazyLoading/lazyLoading";
import SlickCarousel from "../../component/slick-carousel/slick-carousel";
import { settings } from "../../utils/settingCarousel";
import {
  useFetchGeInfoStory,
  useFetchNewStory,
  useFetchStoryRecommender,
} from "../../utils/useFetchSerice";
import "./info-story-page.style.css";

const InfoStoryPage = () => {
  const { slug } = useParams();
  const [allChap, setAllChap] = useState(false);
  const { data, isSuccess } = useFetchGeInfoStory(slug!);
  const { data: dataStoryRecommender, isSuccess: isSsStoryRecommender } =
    useFetchStoryRecommender();
  const { data: dataNewStory, isSuccess: isSsNewStory } = useFetchNewStory();
  const convetTime = (date: string) => {
    const oldDate = new Date(date);
    const nowDate = new Date(Date.now());

    let distance = Math.abs(nowDate.getTime() - oldDate.getTime());
    const hours = Math.floor(distance / 3600000);
    distance -= hours * 3600000;
    const minutes = Math.floor(distance / 60000);
    distance -= minutes * 60000;
    const seconds = Math.floor(distance / 1000);

    if (
      oldDate.getFullYear() === nowDate.getFullYear() &&
      oldDate.getMonth() === nowDate.getMonth() &&
      oldDate.getDate() === nowDate.getDate()
    ) {
      if (hours === 0 && minutes === 0) {
        return seconds + " giấy trước";
      }
      if (hours === 0) {
        return minutes + " phút trước";
      }
      if (hours < 24) {
        return hours + " giờ trức";
      }
    }
    if (
      oldDate.getFullYear() === nowDate.getFullYear() &&
      oldDate.getMonth() === nowDate.getMonth() &&
      oldDate.getDate() < nowDate.getDate()
    ) {
      if (hours < 24) {
        return hours + " giờ trước";
      } else if (hours > 24 && nowDate.getDate() - oldDate.getDate() < 7) {
        return nowDate.getDate() - oldDate.getDate() + " ngày trươc";
      } else if (nowDate.getDate() - oldDate.getDate() > 7) {
        return (
          Math.floor((nowDate.getDate() - oldDate.getDate()) / 7) +
          " tuần trươc"
        );
      }
    }
    if (
      oldDate.getFullYear() === nowDate.getFullYear() &&
      oldDate.getMonth() < nowDate.getMonth()
    ) {
      if (nowDate.getMonth() - oldDate.getMonth() < 2) {
        return nowDate.getMonth() - oldDate.getMonth() + " tháng trước";
      }
    }
    const days =
      oldDate.getDate() < 10 ? "0" + oldDate.getDate() : oldDate.getDate();
    const months =
      oldDate.getMonth() + 1 < 10
        ? "0" + (oldDate.getMonth() + 1)
        : oldDate.getMonth() + 1;
    const years =
      oldDate.getFullYear() < 10
        ? "0" + oldDate.getFullYear()
        : oldDate.getFullYear();
    return days + "-" + months + "-" + years;
  };
  return (
    <div>
      {isSuccess && isSsStoryRecommender && isSsNewStory ? (
        <div className="info-story-page">
          <div className="bg-info-story-page">
            <img src={data?.poster} alt="" />
          </div>

          <div className="body header-info-story-page">
            <div className="header-info-story">
              <div className="header-info">
                <div className="header-info-image">
                  <img src={data?.thumbnail} alt="" />
                </div>

                <div className="header-info-content">
                  <div className="story-name">
                    <h4>{data?.name}</h4>
                  </div>
                  <div className="info-base">
                    <div className="story-auth str-item">
                      <span>Tác giả </span>
                      <span>{data?.auth}</span>
                    </div>
                    <div className="story-chap-new str-item">
                      <span>Mới nhất </span>
                      <span>{data?.latest}</span>
                    </div>
                    <div className="story-view str-item">
                      <span>Trạng thái </span>
                      <span>{data?.status}</span>
                    </div>
                    <div className="story-view str-item">
                      <span>Lượt đọc </span>
                      <span>{data?.views}</span>
                    </div>
                  </div>
                  <div className="content">
                    <h4>Nội dung : </h4>
                    <p>{data?.description}</p>
                  </div>
                  <div className="button-read">
                    <button>Đọc từ đầu</button>
                    <button>Đọc Chap mới nhất</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="body body-info-story">
            <div className="title">
              <h3>Danh sách các chap</h3>
            </div>
            <div className="chap-collection">
              {data?.chapters.map((item, index) =>
                !allChap ? (
                  index < 50 && (
                    <div className="item-chap" key={item.id}>
                      <h4>Chạp {item.name}</h4>
                      <span>{convetTime(item.created_at)}</span>
                    </div>
                  )
                ) : (
                  <div className="item-chap" key={item.id}>
                    <h4>Chạp {item.name}</h4>
                    <span>{convetTime(item.created_at)}</span>
                  </div>
                )
              )}
            </div>

            <div
              className="see-all-chap button-read"
              style={{ display: !allChap ? "block" : "none" }}
              onClick={() => setAllChap(true)}
            >
              <button>Xem tất cả</button>
            </div>
          </div>

          <div className="body p-l-r m-top-50 m-bottom-50">
            <div className="title m-bottom-50">
              <h3>Đừng bỏ lỡ</h3>
            </div>
            <SlickCarousel
              setting={{
                ...settings,
                slidesToShow: 8,
                responsive: [
                  {
                    breakpoint: 1460,
                    settings: {
                      slidesToShow: 6,
                    },
                  },
                  {
                    breakpoint: 1160,
                    settings: {
                      slidesToShow: 4,
                    },
                  },
                  {
                    breakpoint: 760,
                    settings: {
                      slidesToShow: 3,
                    },
                  },
                  {
                    breakpoint: 560,
                    settings: {
                      slidesToShow: 2,
                    },
                  },
                ],
              }}
              className="Slider-slick-sl"
            >
              {dataStoryRecommender?.map((item) => (
                <ItemMedium key={item.name} item={item} />
              ))}
            </SlickCarousel>
          </div>

          <div className="body p-l-r m-top-50 m-bottom-50">
            <div className="title m-bottom-50">
              <h3>Truyện mới</h3>
            </div>
            <SlickCarousel
              setting={{
                ...settings,
                slidesToShow: 8,
                responsive: [
                  {
                    breakpoint: 1460,
                    settings: {
                      slidesToShow: 6,
                    },
                  },
                  {
                    breakpoint: 1160,
                    settings: {
                      slidesToShow: 4,
                    },
                  },
                  {
                    breakpoint: 760,
                    settings: {
                      slidesToShow: 3,
                    },
                  },
                  {
                    breakpoint: 560,
                    settings: {
                      slidesToShow: 2,
                    },
                  },
                ],
              }}
              className="Slider-slick-sl"
            >
              {dataNewStory?.map((item) => (
                <ItemLarge key={item.name} item={item} />
              ))}
            </SlickCarousel>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
export default InfoStoryPage;
