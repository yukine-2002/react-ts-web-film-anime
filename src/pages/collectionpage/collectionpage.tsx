import useInfiniteScroll from "react-infinite-scroll-hook";
import { useInfiniteQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import Item from "../../component/itemslide/item";
import { Spinner } from "../../component/lazyLoading/lazyLoading";
import { getList } from "../../utils/service";


// const ALL = [...GENRES, ...RANKINGS];
interface Props {
  category: string;
  slug: string;
}

const CollectionPage = () => {
  const nav = useNavigate();
  const param = useLocation();
  const [category, slug] = param.pathname.replace("/", "").split("/");

  const handlePath = (slug: string, name: string) => {
    nav(`/watch/${slug}/${name}`);
  };

  const useFetchList = ({ category, slug }: Props) => {
    const useFetch = ({ pageParam = 1 }) =>
      getList({ category, slug, page: pageParam });

    return useInfiniteQuery(["collection", slug], useFetch, {
      getNextPageParam: (response) => {
        if (!response.pagination) return;
        return response.pagination.currentPage > response.pagination.totalPage
          ? null
          : response.pagination.currentPage + 1;
      },
    });
  };

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
                onClick={() => handlePath(item.slug, item.latestEpisode!.name ? item.latestEpisode!.name : item.name)}
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
