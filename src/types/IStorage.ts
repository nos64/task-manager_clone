import Languages from './Languages';
import Themes from './Theme';

interface IStorage {
  _id: string;
  login: string;
  name: string;
  language: Languages;
  theme: Themes;
  avatarID: number;
}

export default IStorage;
