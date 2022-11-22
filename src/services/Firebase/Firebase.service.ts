import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore/lite";

import { firebaseConfig } from "../../constants/firebase";
import { useTokenStore } from "../../store";
import { ResultType } from "../../typings/trivia";
import { SetAnswersArgs } from "./Firebase.types";

/**
 * Class that takes care of all the Firebase functions needed for our app
 */
class Firebase {
  app = initializeApp(firebaseConfig);
  db = getFirestore();

  /**
   * Method that is used to fetch the answers of the current user
   * @param userToken - The token Id of the current user which will be used as the document id in firestore
   * @returns - The document related to the token id of the current user
   */
  public async getAnswers(userToken: string) {
    const answersDoc = doc(this.db, "answers", userToken);
    const docSnap = await getDoc(answersDoc);

    if (docSnap.exists()) {
      return docSnap.data();
    }
    throw new Error("Document not Found");
  }

  /**
   * Method that record the answers on Firestore
   * @param data - The current question and answers
   */
  public async setAnswers(data: SetAnswersArgs) {
    const answersCollection = collection(this.db, "answers");

    await setDoc(doc(answersCollection, data.userToken), {
      answers: data.answers,
      id: data.userToken,
      usedTime: data.timeUsed,
    });
  }
  /**
   * Method that fetches the answers of the current user using SSR
   * @returns - The document related to the token id of the current user
   */
  public async getAnswersOnServer() {
    const token = useTokenStore.getState().token;

    if (token) {
      const result = (await FirebaseService.getAnswers(token)) as ResultType;

      return result;
    } else {
      throw "No user found!";
    }
  }
}

const FirebaseService = new Firebase();

export default FirebaseService;
