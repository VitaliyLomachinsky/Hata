import { PageButtons } from "@ensdomains/thorin";
import { useState } from "react";

const Pagination = () => {
  const [page, setPage] = useState(1);
  return (
    <div
      style={{
        padding: "16px",
        margin: "15px 0 30px 0",
        borderRadius: "12px",
      }}
    >
      <PageButtons
        alwaysShowFirst
        alwaysShowLast
        current={page || 1}
        total={10}
        onChange={(value) => setPage(value)}
        size="medium"
      />
    </div>
  );
};

export default Pagination;
