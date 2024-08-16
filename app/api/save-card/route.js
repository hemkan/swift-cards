// given:
// await fetch("/api/save-card", {
// 	method: "POST",
// 	body: JSON.stringify({
// 	  card: generation,
// 	  name: cardName,
// 	}),
//   });

// add to firebase
// import db from "../../../firebase";
// import { doc, getDoc, writeBatch, collection } from "firebase/firestore";
// import { NextResponse } from "next/server";
// import { currentUser } from "@clerk/nextjs";

// export async function POST(req) {
//   //   const { card, name } = await req.json();

//   //   await firebase.firestore().collection("cards").add({
//   //     card,
//   //     name,
//   //   });

//   //   return NextResponse.json({ success: true });
//   try {
//     const user = await currentUser();

//     if (!user) {
//       return NextResponse.json({
//         success: false,
//         error: "User not authenticated",
//       });
//     }
//     const { card, name: setName } = await req.json(); // Assuming userId is passed in the request body
//     const userId = user.id; // Get the user ID from the authenticated user

//     const userDocRef = doc(collection(db, "users"), userId);
//     const userDocSnap = await getDoc(userDocRef);

//     const batch = writeBatch(db);

//     if (userDocSnap.exists()) {
//       const userData = userDocSnap.data();
//       const updatedSets = [
//         ...(userData.flashcardSets || []),
//         { name: setName },
//       ];
//       batch.update(userDocRef, { flashcardSets: updatedSets });
//     } else {
//       batch.set(userDocRef, { flashcardSets: [{ name: setName }] });
//     }

//     const setDocRef = doc(collection(userDocRef, "flashcardSets"), setName);
//     batch.set(setDocRef, { flashcards: [card] });

//     await batch.commit();

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error saving flashcard:", error);
//     return NextResponse.json({ success: false, error: error.message });
//   }
// }

import { useState } from "react";
import { doc, getDoc, writeBatch, collection } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import db from "../firebase";

const [setName, setSetName] = useState("");
const [dialogOpen, setDialogOpen] = useState(false);
const handleOpenDialog = () => setDialogOpen(true);
const handleCloseDialog = () => setDialogOpen(false);
