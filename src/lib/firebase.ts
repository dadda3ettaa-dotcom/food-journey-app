import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { DayHistoryEntry, DayJourneyState, Mission, OnboardingData, UserProfile, CoachReviewState } from '../types';

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore with custom database ID if present
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Authentication Functions
export async function loginWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  await saveUserProfile(result.user);
  return result.user;
}

export async function loginWithEmail(email: string, pass: string): Promise<User> {
  const result = await signInWithEmailAndPassword(auth, email, pass);
  await saveUserProfile(result.user);
  return result.user;
}

export async function registerWithEmail(email: string, pass: string, name?: string): Promise<User> {
  const result = await createUserWithEmailAndPassword(auth, email, pass);
  if (name && name.trim()) {
    await updateProfile(result.user, { displayName: name.trim() });
  }
  await saveUserProfile(result.user);
  return result.user;
}

export async function logout(): Promise<void> {
  await signOut(auth);
}

// User Profile Firestore Sync
export async function saveUserProfile(user: User): Promise<void> {
  if (!user) return;
  try {
    const userRef = doc(db, 'users', user.uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email?.split('@')[0] || 'Food Explorer',
        photoURL: user.photoURL || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } else {
      await setDoc(userRef, {
        updatedAt: new Date().toISOString()
      }, { merge: true });
    }
  } catch (err) {
    console.error('Error saving user profile to Firestore:', err);
  }
}

// Cloud Data Sync Functions
export async function saveUserDataToCloud(
  userId: string,
  data: {
    onboarding?: OnboardingData;
    todayState?: DayJourneyState;
    history?: DayHistoryEntry[];
    missions?: Mission[];
    coachReviewState?: CoachReviewState;
  }
): Promise<void> {
  if (!userId) return;
  try {
    const userRef = doc(db, 'users', userId);
    const payload: Record<string, any> = {
      updatedAt: new Date().toISOString()
    };
    if (data.onboarding) payload.onboarding = data.onboarding;
    if (data.todayState) payload.todayState = data.todayState;
    if (data.missions) payload.missions = data.missions;
    if (data.history) payload.history = data.history;
    if (data.coachReviewState) payload.coachReviewState = data.coachReviewState;

    await setDoc(userRef, payload, { merge: true });
  } catch (err) {
    console.error('Failed to sync data to Firestore:', err);
  }
}

export async function loadUserDataFromCloud(userId: string): Promise<{
  onboarding?: OnboardingData;
  todayState?: DayJourneyState;
  history?: DayHistoryEntry[];
  missions?: Mission[];
  coachReviewState?: CoachReviewState;
} | null> {
  if (!userId) return null;
  try {
    const userRef = doc(db, 'users', userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const data = snap.data();
      return {
        onboarding: data.onboarding,
        todayState: data.todayState,
        history: data.history,
        missions: data.missions,
        coachReviewState: data.coachReviewState
      };
    }
  } catch (err) {
    console.error('Failed to load user data from Firestore:', err);
  }
  return null;
}
