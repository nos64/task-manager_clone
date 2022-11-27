import AboutTeams from 'components/AboutTeam';
import AboutApp from 'components/AboutApp';
import HeroComponent from 'components/HeroComponent';
import React from 'react';
import AboutCourse from 'components/AboutCourse';

const WelcomePage = () => {
  return (
    <>
      <HeroComponent />
      <AboutApp />
      <AboutCourse />
      <AboutTeams />
    </>
  );
};

export default WelcomePage;
