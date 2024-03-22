import * as React from 'react';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import { HiShoppingCart } from "react-icons/hi";

export default function Cartbadge() {
  return (
    <Stack spacing={1} direction="row">
      <Badge badgeContent={1} color="secondary">
      <HiShoppingCart color="action" fontSize="25px"/>
      </Badge>
      {/* <Badge badgeContent={4} color="success">
      <HiShoppingCart color="action" />
      </Badge> */}
    </Stack>
  );
}