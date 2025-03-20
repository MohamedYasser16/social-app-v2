import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar() {

  let navigate = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <>
      {/* <Link to={"/"} >
    <Typography
       variant="h6"
       noWrap
       component="div"
       sx={{ display: { lg: 'none', xs: 'block' } }}
     >
       FACEBOOK
     </Typography>
    </Link> */}
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <Link to={"/myProfile"} ><MenuItem onClick={handleMenuClose}>Profile</MenuItem></Link>
        <Link to={"/favorite"} >      <MenuItem onClick={handleMenuClose}>Favorite Posts</MenuItem>      </Link>
      </Menu>
    </>

  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <>

      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <Link to={"/favorite"} >
          <MenuItem>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge color="error">
                < FavoriteIcon />
              </Badge>
            </IconButton>
            <p> favorite </p>
          </MenuItem>
        </Link>

        <Link to={"/"}>
          <MenuItem>
            <p className="capitalize mx-3"> <HomeIcon sx={{ fontSize: "29px" }} /> home</p>
          </MenuItem>
        </Link>

        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>

        {/* <Link to={"/change"}  >  <button className="px-2 py-2  text-white  "> Change Password </button>
        </Link> */}

        {/* ////////// */}

        <Link to={"/change"}>
          <MenuItem>
            <p className="capitalize mx-3"> < ManageAccountsIcon sx={{ fontSize: "29px" }} /> Change Password </p>
          </MenuItem>
        </Link>


        <MenuItem onClick={
          () => {
            localStorage.clear()
            navigate("/")
          }
        } >
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <Badge color="error">
              < LogoutIcon />
            </Badge>
          </IconButton>
          <p> logout </p>
        </MenuItem>



      </Menu>
    </>


  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "#0284c7" }} >




          <Link to={"/"} >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'block' } }}
            >
              FACEBOOK
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex', alignItems: "center", gap: "5px" } }}>

            <Link to={"/favorite"}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge color="error">
                  <FavoriteIcon />
                </Badge>
              </IconButton>
            </Link>

            <Link to={"/"}>

              <IconButton
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                color="inherit"
              >
                home
              </IconButton>
            </Link>
            <IconButton
              size="small"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              profile
            </IconButton>
            {
              localStorage.getItem("token") ? <>

                <Link to={"/change"}>
                  <IconButton
                    size="small"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    color="inherit"
                  >Change Password</IconButton>
                </Link>


                <IconButton
                    size="small"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    color="inherit"
                  >

                <p onClick={() => {
                  localStorage.removeItem("token")
                }} className="text-white text-lg rounded-lg px-3 py-1 cursor-pointer"> <LogoutIcon/> 
                </p>
                  </IconButton>

              </>
                :
                <>
                  <button className="text-white rounded-lg px-3 py-1 cursor-pointer"> <Link to={"/login"} > Login</Link> </button>
                  <button className="text-white rounded-lg px-3 py-1 cursor-pointer"><Link to={"/register"} > Register</Link> </button>
                </>

            }



          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

    </Box>
  );
}
