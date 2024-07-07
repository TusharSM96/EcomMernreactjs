import React, { useEffect, useState } from "react";

export default function TableSerchComp({
  OrignalRowData,
  setRowData,
}) {
  const [SearchValue, setSearchValue] = useState("");

  const SerchDataHandler = () => {
    const serchText = SearchValue?.toLowerCase();
    if (serchText?.length) {
      const SerData =
        OrignalRowData?.length &&
        OrignalRowData?.filter((event, i) => {
          return Object.values(event).some((value) => {
            return String(value).toLowerCase().includes(serchText);
          });
        });
      setRowData(SerData);
    } else {
      setRowData(OrignalRowData);
    }
  };
  useEffect(() => {
    SerchDataHandler();
  }, [SearchValue]);
  return (
    <input
      type="search"
      className="form-control me-2"
      onChange={(e) => {
        setSearchValue(e.target.value);
      }}
      value={SearchValue}
    />
  );
}
