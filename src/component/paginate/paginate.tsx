import { useState } from "react";
import { UrlUpdateType } from "use-query-params";
import "./pagination.style.css";

const Pagination = ({
  maxPage,
  currentPage,
  setCurrentPage,
  setPage,
}: {
  maxPage: number;
  currentPage: number;
  setPage: (newValue: any, updateType?: UrlUpdateType | undefined) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const [pageNumberLimit, setPageNumberLimit] = useState(8);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(8);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pages = [];
  for (let i = 1; i <= maxPage; i++) {
    pages.push(i);
  }
  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);
    setPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);
    setPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const renderPageNumbers = pages.map((item) => {
    if (item <= maxPageNumberLimit && item >= minPageNumberLimit) {
      return (
        <li
          key={item}
          className={item === currentPage ? "active":""}
          onClick={() => {
            setCurrentPage(item);
            setPage(item);
          }}
        >
          {item}
        </li>
      );
    } else {
      return null;
    }
  });
 
  return (
    <div className="pagination">
      <div className="pagination-container">
        <button onClick={handlePrevbtn}> <i className="fa-solid fa-angle-left"></i> </button>
        <ul>{renderPageNumbers}</ul>
        <button onClick={handleNextbtn}> <i className="fa-solid fa-angle-right"></i> </button>
      </div>
    </div>
  );
};

export default Pagination;
