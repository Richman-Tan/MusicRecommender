import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import {
  FaUser,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTachometerAlt,
  FaGem,
  FaList,
  FaRegLaughWink,
  FaHeart
} from 'react-icons/fa';
import sidebarBg from '../assets/react.svg';

const SidebarComponent = ({
  image,
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange
}) => {
  return (
    <Sidebar
      image={image ? sidebarBg : false}
      collapsed={collapsed}
      toggled={toggled}
      onToggle={handleToggleSidebar}
      breakPoint="md"
    >
      {/* Custom Header */}
      <div className="custom-sidebar-header" style={{ padding: '10px', fontWeight: 'bold', fontSize: '18px' }}>
        <Menu iconShape="circle">
          {collapsed ? (
            <MenuItem
              icon={<FaAngleDoubleRight />}
              onClick={handleCollapsedChange}
            ></MenuItem>
          ) : (
            <MenuItem
              suffix={<FaAngleDoubleLeft />}
              onClick={handleCollapsedChange}
            >
              <div
                style={{
                  padding: '9px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: 15,
                  letterSpacing: '1px'
                }}
              >
                Pro Sidebar
              </div>
            </MenuItem>
          )}
        </Menu>
      </div>

      {/* Content */}
      <Menu iconShape="circle">
        <MenuItem
          icon={<FaTachometerAlt />}
          suffix={<span className="badge red">NEW</span>}
        >
          Dashboard
          <NavLink to="/" />
        </MenuItem>
        <MenuItem icon={<FaGem />}>
          Components <Link to="/components" />
        </MenuItem>
        <SubMenu
          suffix={<span className="badge yellow">3</span>}
          title={'With Suffix'}
          icon={<FaRegLaughWink />}
        >
          <MenuItem>Submenu 1</MenuItem>
          <MenuItem>Submenu 2</MenuItem>
          <MenuItem>Submenu 3</MenuItem>
        </SubMenu>
        <SubMenu
          prefix={<span className="badge gray">3</span>}
          title={'With Prefix'}
          icon={<FaHeart />}
        >
          <MenuItem>Submenu 1</MenuItem>
          <MenuItem>Submenu 2</MenuItem>
          <MenuItem>Submenu 3</MenuItem>
        </SubMenu>
        <SubMenu title={'Multi Level'} icon={<FaList />}>
          <MenuItem>Submenu 1 </MenuItem>
          <MenuItem>Submenu 2 </MenuItem>
          <SubMenu title={'Submenu 3'}>
            <MenuItem>Submenu 3.1 </MenuItem>
            <MenuItem>Submenu 3.2 </MenuItem>
          </SubMenu>
        </SubMenu>
      </Menu>

      {/* Custom Footer */}
      <div className="custom-sidebar-footer" style={{ textAlign: 'center', padding: '16px' }}>
        <Link
          className="sidebar-btn"
          style={{ cursor: 'pointer' }}
          to="/profile"
        >
          <FaUser />
          <span>My Account</span>
        </Link>
      </div>
    </Sidebar>
  );
};

export default SidebarComponent;
