import userImage0 from '../assets/images/userImage0.png';
import userImage1 from '../assets/images/userImage1.png';
import userImage2 from '../assets/images/userImage2.png';
import userImage3 from '../assets/images/userImage3.png';
import userImage4 from '../assets/images/userImage4.png';
import userImage5 from '../assets/images/userImage5.png';
import userImage6 from '../assets/images/userImage6.png';
import userImage7 from '../assets/images/userImage7.png';
import userImage8 from '../assets/images/userImage8.png';
import userImage9 from '../assets/images/userImage9.png';
import planImage from '../assets/images/planImage.png';
import simpleImage from '../assets/images/descriptionImage.png';
import changeImage from '../assets/images/changeImage.png';
import dragNdropImage from '../assets/images/dragNdropImage.png';

export const API_URL = `https://task-manager.adaptable.app`;

export const avatars = [
  {
    id: 0,
    src: userImage0,
    isCurrent: false,
    isActive: false,
  },
  {
    id: 1,
    src: userImage1,
    isCurrent: false,
    isActive: false,
  },
  {
    id: 2,
    src: userImage2,
    isCurrent: false,
    isActive: false,
  },
  {
    id: 3,
    src: userImage3,
    isCurrent: false,
    isActive: false,
  },
  {
    id: 4,
    src: userImage4,
    isCurrent: false,
    isActive: false,
  },
  {
    id: 5,
    src: userImage5,
    isCurrent: false,
    isActive: false,
  },
  {
    id: 6,
    src: userImage6,
    isCurrent: false,
    isActive: false,
  },
  {
    id: 7,
    src: userImage7,
    isCurrent: false,
    isActive: false,
  },
  {
    id: 8,
    src: userImage8,
    isCurrent: false,
    isActive: false,
  },
  {
    id: 9,
    src: userImage9,
    isCurrent: false,
    isActive: false,
  },
];

export const benefitsContent = [
  {
    id: '01',
    title: 'Plan',
    isActive: true,
    description:
      ' Break the big ideas down into manageable chunks across teams with user stories, issues, and tasks.',
    video: planImage,
  },
  {
    id: '02',
    title: 'Simplicity',
    isActive: false,
    description:
      'Break the big ideas down into manageable chunks across teams with user stories, issues, and tasks.',
    video: simpleImage,
  },
  {
    id: '03',
    title: 'Change',
    isActive: false,
    description: 'Customize your profile.',
    video: changeImage,
  },
  {
    id: '04',
    title: 'Comfortable',
    isActive: false,
    description: 'Transfer tasks and columns by drag and drop. Add an unlimited number of tasks.',
    video: dragNdropImage,
  },
];

export const ourTeams = [
  {
    imageSrc: 'https://avatars.githubusercontent.com/u/91889887?v=4',
    gitLink: 'https://github.com/andrewkarev',
    name: 'Andrew',
    role: 'Frontend Developer, Backend Developer, TeamLaed',
    description: '',
  },
  {
    imageSrc: 'https://avatars.githubusercontent.com/u/37663828?v=4',
    gitLink: 'https://github.com/kritskaya',
    name: 'Tatyana Kritskaya',
    role: 'Frontend Developer',
    description: '',
  },
  {
    imageSrc: 'https://avatars.githubusercontent.com/u/67101576?v=4',
    gitLink: 'https://github.com/nos64',
    name: 'Mikhail Nosov',
    role: 'Frontend Developer',
    description: '',
  },
];
