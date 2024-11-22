import { Box, Card, Grid2, Tab, Tabs } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Market } from "../../types/markets.type";
import MarketItem from "../../components/shared/market/market-item";

type CurrencyCode = "IRT" | "USDT";

const Markets = () => {
  const [marketData, setMarketData] = useState<Market[]>();
  const [filteredData, setFilteredData] = useState<Market[]>();
  const [value, setValue] = useState<0 | 1>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: 0 | 1) => {
    setValue(newValue);
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
  const filterData = async ({
    data,
    by = value,
  }: {
    data: Market[];
    by?: 0 | 1;
  }) => {
    console.log("calling...", by);
    let currencyType;
    if (by === 0) {
      currencyType = "IRT";
    } else {
      currencyType = "USDT";
    }
    const newData = await data.filter((item) => {
      return item.currency2.code === currencyType;
    });
    setFilteredData(newData);
  };
  useEffect(() => {
    fetchMarketData();
  }, []);
  useEffect(() => {
    if (marketData) filterData({ data: marketData });
  }, [marketData, value]);

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
        {filteredData?.map((market) => (
          <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
            <MarketItem item={market} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default Markets;
