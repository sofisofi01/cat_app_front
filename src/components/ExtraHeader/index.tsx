import { ExtraHeaderProps } from "./types";
import styles from './ExtraHeader.module.scss'
import classNames from "classnames";

export function ExtraHeader({ page }: ExtraHeaderProps) {
    const menuItems = [
      { id: 'thoughts', name: 'Котомыслы недели' },
      { id: 'memes', name: 'Мемы' },
      { id: 'upload', name: 'Загрузить кота' },
      { id: 'about', name: 'О нас' },
    ];
  
    return (
      <div className={styles.menuContainer}>
        <nav>
          <ul className={styles.menuList}>
            {menuItems.map((item) => (
              <li 
                key={item.id}
                className={classNames('menuItem', { active: page === item.id })}
              >
                <a href={`/${item.id}`} className={styles.menuLink}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }