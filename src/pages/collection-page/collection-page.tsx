import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NumberParam, useQueryParam, useQueryParams } from "use-query-params";
import Item from "../../component/item-slide/item";
import { Spinner } from "../../component/lazyLoading/lazyLoading";
import Pagination from "../../component/paginate/paginate";
import { getList, handlePath } from "../../utils/service";
import { Anime } from "../../utils/type";

// const ALL = [...GENRES, ...RANKINGS];

const CollectionPage = () => {
  const nav = useNavigate();
  const param = useLocation();
  const [page = 1, setPage] = useQueryParam("page", NumberParam);
  const [category, slug] = param.pathname.replace("/", "").split("/");
  const [currentPage, setCurrentPage] = useState<number | null>(page);
  const [totalPage, setTotalPage] = useState(0);
  const [data, setData] = useState<Anime[]>([]);
  const [succes, setSucces] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetch: any = await new Promise((resolve, reject) => {
        const data = getList({ category, slug, page: currentPage! });
        resolve(data);
      });
      const { data, success, pagination } = fetch;
      setData(data);
      setSucces(success);
      setTotalPage(pagination.totalPage);
    };
    try {
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, [currentPage]);

  const handleChangePath = (path: string) => {
    if (slug) {
      var pathP = param.pathname.split("/");
      pathP[pathP.length - 1] = path;
      pathP[pathP.length - 2] = "anime";
      nav(pathP.join("/"));
    } else {
      console.log(2);
      nav(path);
    }
  };
  return (
    <div className="body">
      <div className="collection" style={{ marginTop: 100 + "px" }}>
        <div className="collection-list">
          {succes ? (
            data!.map((item, index) => (
              <Item
                key={index}
                anime={item}
                onClick={() => handleChangePath(item.slug)}
              />
            ))
          ) : (
            <Spinner />
          )}
        </div>
      </div>
      <Pagination
        maxPage={totalPage}
        currentPage={currentPage!}
        setPage={setPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
export default CollectionPage;
