import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const OrderItem: React.FC<{ item: any }> = ({
  item,
  // onClick,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography>amount: {item.amount}</Typography>
        <Typography>price: {item.price}</Typography>
        <Typography>remain: {item.remain}</Typography>
        <Typography>value: {item.value}</Typography>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
