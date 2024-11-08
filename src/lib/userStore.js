import { doc, getDoc } from "firebase/firestore";
import { create } from 'zustand'
import { db } from './firebase';

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {

    // if user in logout state that means no user id preset
    if (!uid) return set({ currentUser: null, isLoading: false });

    // if user id || logged in
    try {
      const docRef = doc(db, "users", uid);
      // fetching the information from database
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false })
      }
      else {
        set({ currentUser: null, isLoading: false })
      }
    } catch (err) {
      console.log(err)
      return set({ currentUser: null, isLoading: false });
    }
  }

}))
