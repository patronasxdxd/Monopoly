import React from 'react';
import { useNavigate } from 'react-router-dom';

import Alert from './Alert';
import { useGlobalContext } from '../context';
import { monopolyMan,banner } from '../assets';
import styles from '../styles';

const PageHOC = (Component, title, description) => () => {
  const { showAlert } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <div className={styles.hocContainer}>
      {showAlert?.status && <Alert type={showAlert.type} message={showAlert.message} />}

      <div className={styles.hocContentBox}>
        <img src={banner} alt="logo"  onClick={() => navigate('/')} />

        <div className={styles.hocBodyWrapper}>
          <div className="flex flex-row w-full">
            <h1 className={`flex ${styles.headText} head-text`}>{title}</h1>
          </div>

          <p className={`${styles.normalText} my-10`}>{description}</p>

          <Component />
        </div>

        
      </div>

      <div className="">
        <img src={monopolyMan} alt="hero-img" className="w-full xl:h-full " />
      </div>
    </div>
  );
};

export default PageHOC;
