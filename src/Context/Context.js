import { AppString } from "../Config/AppString";
import { myFirestore } from "../Config/MyFirebase";

export const getUserById = (uid) => {
  const result = myFirestore
    .collection("users")
    .where(AppString.ID, "==", uid)
    .get();
  return result;
};

export const downloadUserData = async (uid) => {
    const result = await getUserById(uid);
    if (result.docs.length > 0) {
      // Write user info to local
      const userExist = result.docs[0].data();
      localStorage.setItem(AppString.ID, uid);
      localStorage.setItem(AppString.DISPLAYNAME, userExist.displayName);
      localStorage.setItem(AppString.PHOTO_URL, userExist.photoURL);
      localStorage.setItem(AppString.ABOUT_ME, userExist.aboutMe);
      localStorage.setItem(AppString.GENDER, userExist.gender);
      localStorage.setItem(AppString.BIRTHDAY, userExist.birthday);
      localStorage.setItem(
        AppString.SHOW_DISPLAYNAME,
        userExist.showDisplayName
      );
      localStorage.setItem(AppString.SHOW_PROPHOTO, userExist.showProPhoto);
      localStorage.setItem(AppString.SHOW_GENDER, userExist.showGender);
      localStorage.setItem(AppString.INTERESTEDIN, userExist.interestedIn);
      localStorage.setItem(AppString.AGE_RANGE, userExist.ageRange);
    }
  };

  export const fs_listen_online = () => {
    // [START fs_onsnapshot_online]
    myFirestore.collection('users')
        .where('status', '==', 'online')
        .onSnapshot(function(snapshot) {
            snapshot.docChanges.forEach(function(change) {
                if (change.type === 'added') {
                   return true;
                }
                if (change.type === 'removed') {
                  return false;
                }
            });
        });
    // [END fs_onsnapshot_online]
}

