import {
  Box,
  Card,
  Grid2,
  Pagination,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MarketItem from "../../components/market/market-item";
import SwipeableViews from "react-swipeable-views";
import axios, { AxiosResponse } from "axios";
import { useSearchParams } from "react-router-dom";
import { SellOrder } from "../../types/sell-orders.type";
import SellItem from "../../components/orders/order-item";
import OrderItem from "../../components/orders/order-item";
import { Transaction } from "../../types/transactions.type";
import TransactionItem from "../../components/transactions/transaction-item";

const Orders = () => {
  const [value, setValue] = useState<0 | 1 | 2>(0);
  const [SaleData, setSaleData] = useState<SellOrder>();
  const [buyData, setBuyData] = useState<SellOrder>();
  const [transactionData, setTransactionData] = useState<Transaction[]>();
  const [searchParams] = useSearchParams();

  const handleSwipeChange = (index: 0 | 1 | 2) => {
    setValue(index);
  };

  function a11yProps(type: any) {
    return {
      id: `simple-tab-${type}`,
      "aria-controls": `simple-tabpanel-${type}`,
    };
  }
  const handleChange = (event: React.SyntheticEvent, newValue: 0 | 1 | 2) => {
    setValue(newValue);
  };
  const fetchSaleOrdersData = () => {
    axios
      .get<_, AxiosResponse<SellOrder>>(
        `https://api.bitpin.org/v2/mth/actives/${searchParams.get(
          "id"
        )}/?type=sell`
      )
      .then((res) => {
        setSaleData(res.data);
      });
  };
  const fetchBuyOrdersData = () => {
    axios
      .get<_, AxiosResponse<SellOrder>>(
        `https://api.bitpin.org/v2/mth/actives/${searchParams.get(
          "id"
        )}/?type=buy`
      )
      .then((res) => {
        setBuyData(res.data);
      });
  };
  const fetchTransactionsData = () => {
    axios
      .get<_, AxiosResponse<Transaction[]>>(
        `https://api.bitpin.org/v1/mth/matches/${searchParams.get("id")}/`
      )
      .then((res) => {
        setTransactionData(res.data);
      });
  };

  useEffect(() => {
    setInterval(() => {
      fetchSaleOrdersData();
      fetchBuyOrdersData();
      fetchTransactionsData();
    }, 3000);
  }, []);
  useEffect(() => {
    console.log(transactionData);
  }, [transactionData]);

  return (
    <div dir="ltr">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        variant="fullWidth"
      >
        <Tab label="Buy Orders" {...a11yProps("BuyOrders")} />
        <Tab label="Sell Orders" {...a11yProps("SellOrders")} />
        <Tab label="Transactions" {...a11yProps("Transactions")} />
      </Tabs>

      <SwipeableViews index={value} onChangeIndex={handleSwipeChange}>
        {/* Tab Panel 1 */}
        <Box>
          <Grid2 container spacing={1}>
            <Grid2 size={12}>
              <Typography color="textPrimary">Last 10 buy orders</Typography>
            </Grid2>
            {buyData?.orders?.slice(0, 10).map((order) => (
              <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <OrderItem item={order} />
              </Grid2>
            ))}
          </Grid2>
        </Box>

        {/* Tab Panel 2 */}
        <Box>
          <Grid2 container spacing={1}>
            <Grid2 size={12}>
              <Typography color="textPrimary">Last 10 sell orders</Typography>
            </Grid2>
            {SaleData?.orders?.slice(0, 10).map((order) => (
              <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <OrderItem item={order} />
              </Grid2>
            ))}
            <Grid2 size={12}>
              <Typography color="textPrimary">
                Last 10 buy orders total amount:
              </Typography>
            </Grid2>
          </Grid2>
        </Box>
        {/* Tab Panel 3 */}
        <Box>
          <Grid2 container spacing={1}>
            <Grid2 size={12}>
              <Typography color="textPrimary">Last 10 transactions</Typography>
            </Grid2>

            {transactionData?.slice(0, 10).map((order) => (
              <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
                <TransactionItem item={order} />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </SwipeableViews>
    </div>
  );
};

export default Orders;
