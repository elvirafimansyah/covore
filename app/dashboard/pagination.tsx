import React from "react"
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface PaginationProps {
  handleChangePage: (number: number) => void,
  handleNextPage: () => void,
  handlePrevPage: () => void,
  curPage: number,
  pageNumbers: number[]
}
const Pagination: React.FC<PaginationProps> = ({ handleChangePage, handleNextPage, handlePrevPage, curPage, pageNumbers})  => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex space-x-5">
        <button className="bg-lightgray w-[40px] h-[40px] rounded-lg border border-line flex items-center justify-center" onClick={handlePrevPage}>
          <IoIosArrowBack size="18"/>
        </button>
        <div className="flex space-x-2">
          {pageNumbers.map((number) => (
            <button className="bg-gold w-[40px] h-[40px]  font-medium rounded-lg border border-line flex items-center justify-center" key={number} onClick={() => handleChangePage(number)}>
              {number}
            </button>
          ))}
        </div>
    
        <button className="bg-lightgray w-[40px] h-[40px] rounded-lg border border-line flex items-center justify-center" onClick={handleNextPage}>
          <IoIosArrowForward size="18" />
        </button>
      </div>
    </div>

  );
}

export default Pagination;