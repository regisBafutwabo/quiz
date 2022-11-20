import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore/lite";

import { firebaseConfig } from "../../constants/firebase";
import { SetAnswersArgs } from "./Firebase.types";

/**
 * Class that takes care of all the Firebase functions needed for our app
 */
class FirebaseService {
  app = initializeApp(firebaseConfig);
  db = getFirestore();

  /**
   * Method that is used to fetch all the answers of the current user
   * @param userToken - The token Id of the current user which will be used as the document id in firestore
   * @returns - The document related to the token id of the current user
   */
  public async getAnswers(userToken: string) {
    try {
      const answersDoc = doc(this.db, "answers", userToken);
      const docSnap = await getDoc(answersDoc);

      if (docSnap.exists()) {
        return docSnap.data();
      }
      throw new Error("Document not Found");
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Method that record the answers on Firestore
   * @param data - The current question and answers
   */
  public async setAnswers(data: SetAnswersArgs) {
    const answersCollection = collection(this.db, "answers");

    await setDoc(doc(answersCollection, data.userToken), {
      questions: data.answers,
      id: data.userToken,
      usedTime: data.timeUsed,
    });
  }
}

const firebaseService = new FirebaseService();

export default firebaseService;
