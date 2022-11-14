import IStorage from 'types/IStorage';

const updateStorage = (key = 'id', value: Partial<IStorage>) => {
  const userInfo = localStorage.getItem(key);
  const updatedUserinfo: Partial<IStorage> = userInfo
    ? { ...JSON.parse(userInfo), ...value }
    : value;

  localStorage.setItem(key, JSON.stringify(updatedUserinfo));

  return updatedUserinfo;
};

export default updateStorage;
