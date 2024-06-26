import firebase from 'firebase/compat/app';

export async function saveImgFirebase(files ,path) {

    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(path);
    
    // บันทึกรูป
    await imageRef.put(files);
    
    // get link img
    const downloadURL = await imageRef.getDownloadURL();
    
    // update auth
    const user = firebase.auth().currentUser;
    await user.updateProfile({ photoURL: downloadURL });

    return downloadURL
}