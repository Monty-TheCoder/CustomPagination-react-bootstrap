// here we need to add the table contents after that just call the customPagination component here like below
const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);

 <CustomPagination
          totalCount={itemCount || 10}
          pageSize={itemCount && itemCount > 10 ? pageSize : 10}
          currentPage={pageIndex}
          onPageChange={(e) => setPageIndex(e)}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPageIndex(1);
          }}
        />
