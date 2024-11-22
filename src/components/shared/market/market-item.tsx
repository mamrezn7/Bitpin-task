import React from "react";
import { Market } from "../../../types/markets.type";
import { Card, CardContent, Typography } from "@mui/material";

const MarketItem: React.FC<{ item: Market }> = ({ item }) => {
  return (
    <Card>
      <CardContent>
        <Typography>{item.title}</Typography>
        <Typography>{item.all_time_high}</Typography>
      </CardContent>
    </Card>
  );
};

export default MarketItem;
