import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function CartIconWithNumber({count='0'}) {
  const navigate = useNavigate()

  return (
    <IconButton aria-label="cart" onClick={() => navigate('/checkout')}>
      <StyledBadge badgeContent={count} color="secondary">
        <ShoppingCartIcon fontSize='large' />
      </StyledBadge>
    </IconButton>
  );
}