import { Box, Card, Grid2, Tab, Tabs, Pagination } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Market } from "../../types/markets.type";
import MarketItem from "../../components/shared/market/market-item";

type CurrencyCode = "IRT" | "USDT";

const Markets = () => {
  const [marketData, setMarketData] = useState<Market[]>();
  const [filteredData, setFilteredData] = useState<Market[]>([]);
  const [value, setValue] = useState<0 | 1>(0);
  const [currentPage, setCurrentPage] = useState<{ IRT: number; USDT: number }>(
    { IRT: 1, USDT: 1 }
  );

  const itemsPerPage = 10;

  const handleChange = (event: React.SyntheticEvent, newValue: 0 | 1) => {
    setValue(newValue);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    const currency = value === 0 ? "IRT" : "USDT";
    setCurrentPage((prev) => ({ ...prev, [currency]: page }));
  };

  function a11yProps(currency: CurrencyCode) {
    return {
      id: `simple-tab-${currency}`,
      "aria-controls": `simple-tabpanel-${currency}`,
    };
  }

  const fetchMarketData = () => {
    axios
      .get<_, AxiosResponse<{ results: Market[] }>>(
        "https://api.bitpin.org/v1/mkt/markets/"
      )
      .then((res) => {
        setMarketData(res.data.results);
      });
  };

  const filterData = ({ data, by = value }: { data: Market[]; by?: 0 | 1 }) => {
    const currencyType = by === 0 ? "IRT" : "USDT";
    const newData = data.filter((item) => item.currency2.code === currencyType);
    setFilteredData(newData);
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  useEffect(() => {
    if (marketData) filterData({ data: marketData });
  }, [marketData, value]);

  const currentTab = value === 0 ? "IRT" : "USDT";
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage[currentTab] - 1) * itemsPerPage,
    currentPage[currentTab] * itemsPerPage
  );

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="IRT" {...a11yProps("IRT")} />
        <Tab label="USDT" {...a11yProps("USDT")} />
      </Tabs>

      <Grid2 container spacing={1}>
        {paginatedData.map((market) => (
          <Grid2 key={market.id} size={{ xs: 12, sm: 6, lg: 4 }}>
            <MarketItem item={market} />
          </Grid2>
        ))}
      </Grid2>

      {filteredData.length > itemsPerPage && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={totalPages}
            page={currentPage[currentTab]}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </>
  );
};

export default Markets;
