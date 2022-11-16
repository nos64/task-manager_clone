import Languages from './Languages';

interface IStorage {
  _id: string;
  login: string;
  name: string;
  language: Languages;
  theme: string;
  avatarID: number;
}

export default IStorage;
