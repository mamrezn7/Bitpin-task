import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Transaction } from "../../types/transactions.type";

const TransactionItem: React.FC<{ item: Transaction }> = ({
  item,
  // onClick,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography>{item.match_amount}</Typography>
        <Typography>{item.price}</Typography>
        <Typography>{item.match_id}</Typography>
        <Typography>{item.value}</Typography>
        <Typography>{item.time}</Typography>
        <Typography>{item.type}</Typography>
      </CardContent>
    </Card>
  );
};

export default TransactionItem;
