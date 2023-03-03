import WorkIcon from '@mui/icons-material/Work';

import HomeIcon from '@mui/icons-material/Home';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const navConfig = [
  {
    id: 1,
    title: 'home',
    path: '/dashboard/home',
    icon: <HomeIcon />,
  },
  {
    id: 2,
    title: 'user',
    path: '/dashboard/user',
    icon: <AccountCircleIcon />,
  },
  {
    id: 3,
    title: 'job',
    path: '/dashboard/products',
    icon: <WorkIcon />
  },
  {
    id: 4,
    title: 'blog',
    path: '/dashboard/blog',
    icon: <WorkIcon />,
  },


  {
    id: 5,
    title: 'more',
    path: '/dashboard/user',
    icon: <WorkIcon />,

    submenu: [
      {
        id: 5.1,
        title: "Create",
        path: '#',
        icon: <WorkIcon />,
      },
      {
        id: 5.2,
        title: "Edit",
        path: '#',
        icon: <WorkIcon />,
      },

    ]
  },


];

export {navConfig};