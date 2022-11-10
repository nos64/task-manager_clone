import React from 'react';
import styles from './footer.module.scss';
import rssImg from './../../assets/images/rs_school_js.svg';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={`${styles.container} ${styles.footerContainer}`}>
      <a className="courseLink" href="https://rs.school/react/">
        <img className={styles.courseImg} src={rssImg} alt="course img" />
      </a>
      <ul className={styles.githubList}>
        <li className={styles.githubItem}>
          <a className="githubLink" href="https://github.com/andrewkarev">
            andrewkarev
          </a>
        </li>
        <li className={styles.githubItem}>
          <a className="githubLink" href="https://github.com/nos64">
            nos64
          </a>
        </li>
        <li className={styles.githubItem}>
          <a className="githubLink" href="https://github.com/kritskaya">
            kritskaya
          </a>
        </li>
      </ul>
      <div className="copyright">© 2022</div>
    </div>
  </footer>
);

export default Footer;
