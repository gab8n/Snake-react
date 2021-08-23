import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = firebase.auth();
export const database = firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = (setUserData) => {
  auth
    .signInWithPopup(googleProvider)
    .then((currentUser) => {
      let user = currentUser.user;
      if (currentUser.additionalUserInfo.isNewUser === true) {
        const data = {
          userId: user.uid,
          username: user.displayName,
          scoreOnEasy: 0,
          scoreOnMedium: 0,
          scoreOnHard: 0,
          history: [],
        };
        database
          .collection('users')
          .doc(user.uid)
          .set(data)
          .then(() => {
            updateUserHistory(
              'The user created a new account with Google',
              currentUser.user.uid
            );
            getUserDataFromDatabase(setUserData, user.uid);
          });
      } else {
        updateUserHistory(
          'The user loggedIn with Google',
          currentUser.user.uid
        );

        getUserDataFromDatabase(setUserData, user.uid);
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};
export const signInWithEmailAndPassword = (email, password, setUserData) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((currentUser) => {
      updateUserHistory('The user loggedIn', currentUser.user.uid);
      getUserDataFromDatabase(setUserData, currentUser.user.uid);
    })
    .catch((error) => {
      console.log(error.message);
      console.log(error);
    });
};
export const createUserWithEmailAndPassword = (
  email,
  password,
  username,
  setUserData
) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((currentUser) => {
      let user = currentUser.user;

      user
        .updateProfile({
          displayName: username,
        })
        .then(() => {
          const userData = {
            userId: user.uid,
            username: username,
            scoreOnEasy: 0,
            scoreOnMedium: 0,
            scoreOnHard: 0,
            history: [],
          };
          database
            .collection('users')
            .doc(user.uid)
            .set(userData)
            .then(() => {
              updateUserHistory(
                'The user created a new accout with email',
                user.uid
              );
              getUserDataFromDatabase(setUserData, user.uid);
            });
        });
    })
    .catch((error) => {
      console.log(error.message);
      console.log(error);
    });
};

export const signOut = (setLoggedOut) =>
  auth
    .signOut()
    .then(() => {
      setLoggedOut();
    })
    .catch((error) => {
      console.log(error);
    });

export const getUserDataFromDatabase = (setUserData, userId) => {
  database
    .collection('users')
    .doc(userId)
    .get()
    .then((querySnapshot) => {
      const userData = querySnapshot.data();
      delete userData.history;
      setUserData(userData);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateUserHistory = (text, userId) => {
  const historyData = new Date().toLocaleString() + ': ' + text;
  database
    .collection('users')
    .doc(userId)
    .update({ history: firebase.firestore.FieldValue.arrayUnion(historyData) })
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};
export const updateUsername = (username, userId) => {
  console.log(username);
  database
    .collection('users')
    .doc(userId)
    .update({ username: username })
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};
export const getUserHistory = async (userId) => {
  try {
    const querySnapshot = await database.collection('users').doc(userId).get();

    const x = querySnapshot.data().history;
    console.log(x);
    return x;
  } catch (error) {
    console.log(error);
  }
};
export const getUsersScore = async (scoreDifficulty) => {
  const scoreboardArray = [];
  try {
    const querySnapshot =
      scoreDifficulty === 'easy'
        ? await database.collection('users').orderBy('scoreOnEasy', 'desc')
        : scoreDifficulty === 'medium'
        ? await database.collection('users').orderBy('scoreOnMedium', 'desc')
        : await database.collection('users').orderBy('scoreOnHard', 'desc');
    const data = await querySnapshot.get();
    data.docs.forEach((item) => {
      console.log(item.data().scoreOnMedium);
      scoreboardArray.push({
        score:
          scoreDifficulty === 'easy'
            ? item.data().scoreOnEasy
            : scoreDifficulty === 'medium'
            ? item.data().scoreOnMedium
            : item.data().scoreOnHard,
        username: item.data().username,
        userId: item.data().userId,
      });
    });
    console.log(scoreboardArray);
    return scoreboardArray;
  } catch (error) {
    console.log(error);
  }
};
export const updateUserScore = async (
  difficulty,
  userId,
  score,
  setUserData
) => {
  if (difficulty === 'scoreOnEasy') {
    database
      .collection('users')
      .doc(userId)
      .update({ scoreOnEasy: score })
      .then(() => {
        getUserDataFromDatabase(setUserData, userId);
      })
      .catch((error) => {
        console.log(error);
      });
  } else if ((difficulty = 'scoreOnMedium')) {
    database
      .collection('users')
      .doc(userId)
      .update({ scoreOnMedium: score })
      .then(() => {
        getUserDataFromDatabase(setUserData, userId);
      })
      .catch((error) => {
        console.log(error);
      });
  } else
    database
      .collection('users')
      .doc(userId)
      .update({ scoreOnHard: score })
      .then(() => {
        getUserDataFromDatabase(setUserData, userId);
      })
      .catch((error) => {
        console.log(error);
      });
};
