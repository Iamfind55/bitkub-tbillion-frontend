import React from 'react'
import ReactPaginate from 'react-paginate';

function Pagination(props: any) {
  const isCurrentPage = props.filter.state.currentPage === 1;
  const totalItem = props.pageCount;
  const itemsPage = props.filter.state.pageSize;
  const totalPages = Math.ceil(totalItem / itemsPage);
 
  return (
    <div className="bottom-3 left-0 right-0">
      <ReactPaginate
        activeClassName="active"
        breakClassName="break-me"
        containerClassName="pagination"
        disabledClassName="disabled"
        forcePage={isCurrentPage ? 0 : props.filter.state.currentPage - 1}
        marginPagesDisplayed={1}
        nextClassName="next"
        nextLabel="next"
        onPageChange={props.handlePageClick}
        pageClassName="page"
        pageCount={totalPages}
        pageRangeDisplayed={1}
        previousClassName="previous"
        previousLabel="previous"
      />
    </div>
  );
}

export default Pagination