import useInfiniteScroll from "react-infinite-scroll-hook";
import { useLocation, useNavigate } from "react-router-dom";
import Item from "../../component/itemslide/item";
import { Spinner } from "../../component/lazyLoading/lazyLoading";
import { handlePath } from "../../utils/service";
import { useFetchList } from "../../utils/useFetchSerice";


// const ALL = [...GENRES, ...RANKINGS];


const CollectionPage = () => {
  const nav = useNavigate();
  const param = useLocation();
  const [category, slug] = param.pathname.replace("/", "").split("/");



  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchList({ category, slug });
  const [sentryRef] = useInfiniteScroll({
    loading: isFetchingNextPage,
    hasNextPage: hasNextPage!,
    onLoadMore: fetchNextPage,
    rootMargin: "0px 0px 20px 0px",
  });
  const listAnime = data?.pages.map((item) => item.data).flat();

  return (
    <div className="body">
      <div className="collection" style={{ marginTop: 100 + "px" }}>
        <div className="collection-list">
          {!isLoading ? (
            listAnime!.map((item,index) => (
              <Item
                key={index}
                anime={item}
                onClick={() => handlePath(nav,item.slug, item.latestEpisode!.name ? item.latestEpisode!.name : item.name)}
              />
            ))
          ) : (
            <Spinner />
          )}
        </div>
      </div>
      {(!isFetchingNextPage || hasNextPage) && (
        <div ref={sentryRef}>
          <Spinner />
        </div>
      )}
    </div>
  );
};
export default CollectionPage;
