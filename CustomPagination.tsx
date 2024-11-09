 import React from "react";
import Pagination from "react-bootstrap/Pagination";
import Select from "react-select";

interface CustomPaginationProps {
  totalCount: number;
  pageSize?: number;
  currentPage: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void;
  // eslint-disable-next-line no-unused-vars
  onPageSizeChange?: (pageSize: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
  onPageSizeChange,
}) => {
  const totalPages = Math.ceil(totalCount / (pageSize || 10));

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPaginationItems = () => {
    const items = [];

    // Render Previous button
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
    );

    // Render first page
    items.push(
      <Pagination.Item
        key={1}
        active={currentPage === 1}
        onClick={() => handlePageChange(1)}
      >
        1
      </Pagination.Item>
    );

    // Render dots if needed
    if (currentPage > 3) {
      items.push(<Pagination.Ellipsis key="ellipsis-start" />);
    }

    // Render pages around the current page
    for (
      let page = Math.max(2, currentPage - 2);
      page <= Math.min(totalPages - 1, currentPage + 2);
      page += 1
    ) {
      items.push(
        <Pagination.Item
          key={page}
          active={currentPage === page}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    // Render dots if needed
    if (currentPage < totalPages - 2) {
      items.push(<Pagination.Ellipsis key="ellipsis-end" />);
    }

    // Render last page
    if (totalPages > 1) {
      items.push(
        <Pagination.Item
          key={totalPages}
          active={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    // Render Next button
    items.push(
      <Pagination.Next
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    );

    return items;
  };

  const pageSizeOptions = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
    { value: 200, label: "200" },
  ];

  const handlePageSizeChange = (option: any) => {
    if (onPageSizeChange) {
      onPageSizeChange(option.value);
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Pagination>{renderPaginationItems()}</Pagination>
        <div style={{ paddingLeft: "10px" }}>
          <Select
            options={pageSizeOptions}
            value={pageSizeOptions.find((x) => x.value === pageSize)}
            onChange={handlePageSizeChange}
            isSearchable={false}
          />
        </div>
      </div>
    </>
  );
};

export default CustomPagination;

CustomPagination.defaultProps = {
  onPageSizeChange: undefined,
  pageSize: 10,
};
