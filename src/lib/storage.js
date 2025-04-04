import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

// Upload file to Firebase Storage
export const uploadFileToStorage = (file) => {
  const storageRef = ref(storage, 'uploads/' + file.name);
  return uploadBytes(storageRef, file).then((snapshot) => {
    return getDownloadURL(snapshot.ref);
  });
};
