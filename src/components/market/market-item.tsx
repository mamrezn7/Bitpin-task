import React from "react";
import { Market } from "../../types/markets.type";
import { Card, CardContent, Typography } from "@mui/material";

const MarketItem: React.FC<{ item: Market; onClick: () => void }> = ({
  item,
  onClick,
}) => {
  return (
    <Card onClick={onClick}>
      <CardContent>
        <Typography>{item.title}</Typography>
        <Typography>{item.all_time_high}</Typography>
      </CardContent>
    </Card>
  );
};

export default MarketItem;
