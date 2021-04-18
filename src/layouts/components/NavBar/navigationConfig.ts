import HomeIcon from "@material-ui/icons/HomeOutlined";
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import BallotIcon from '@material-ui/icons/Ballot';

export default [
  {
    title: "Bảng điều khiển",
    pages: [
      {
        title: "Tổng quan",
        href: "/overview",
        icon: HomeIcon,
      },
    ],
  },
  {
    title: "Quản lý",
    pages: [
      {
        title: "Nội dung",
        href: "/content",
        icon: BallotIcon,
        children: [
          {
            title: "Tất cả",
            href: "/content/list",
          }
        ],
      },
      {
        title: "Sản phẩm",
        href: "/san-pham",
        icon: LocalLibraryIcon,
        children: [
          {
            title: "Tất cả",
            href: "/san-pham/danh-sach",
          }
        ],
      }
    ],
  },
];
