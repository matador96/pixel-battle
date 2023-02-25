import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router';

interface MenuItemProps {
  label: string;
  path: string;
  icon: any;
}

const MenuItem = (props: MenuItemProps) => {
  const { label, icon, path } = props;
  const navigate = useNavigate();

  return (
    <div className="menu-item" key={path + label} onClick={() => navigate(path)}>
      {icon}
    </div>
  );
};

export default MenuItem;
