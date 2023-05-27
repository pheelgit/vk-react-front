import React from 'react';
import { useSideBarConfig } from './useSideBarConfig';

import { NavLink } from 'react-router-dom';

import styles from './SideBar.module.scss';

export const SideBar = () => {
  const { sideBarMenu } = useSideBarConfig();

  return (
    <div className={styles.wrapper}>
      {sideBarMenu.map((menu) => (
        <NavLink
          key={menu.title}
          to={menu.to}
          children={
            <>
              {menu?.icon} {menu.title}
            </>
          }
        />
      ))}
    </div>
  );
};
