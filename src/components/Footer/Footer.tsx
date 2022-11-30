import React from 'react';
import styles from './Footer.module.scss';
import rssImg from './../../assets/images/rs_school_js.svg';
import Container from 'components/Container';
import { AiFillGithub } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerContent}>
          <a className="courseLink" href="https://rs.school/react/">
            <img className={styles.courseImg} src={rssImg} alt={t('courseImg') || ''} />
          </a>
          <ul className={styles.githubList}>
            <li className={styles.githubItem}>
              <a className="githubLink" href="https://github.com/andrewkarev">
                <AiFillGithub className={styles.githubIcon} title="andrewkarev" />
                <span>andrewkarev</span>
              </a>
            </li>
            <li className={styles.githubItem}>
              <a className="githubLink" href="https://github.com/nos64">
                <AiFillGithub className={styles.githubIcon} title="nos64" />
                <span>nos64</span>
              </a>
            </li>
            <li className={styles.githubItem}>
              <a className="githubLink" href="https://github.com/kritskaya">
                <AiFillGithub className={styles.githubIcon} title="kritskaya" />
                <span>kritskaya</span>
              </a>
            </li>
          </ul>
          <div className="copyright">© 2022</div>
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
