import AboutTeams from 'components/AboutTeams';
import AboutApp from 'components/AboutApp';
import HeroComponent from 'components/HeroComponent';
import React from 'react';

const WelcomePage = () => {
  return (
    <>
      <HeroComponent />
      <AboutApp />
      <AboutTeams />
    </>
  );
};

export default WelcomePage;
