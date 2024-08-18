// "use client"


// import { UploadButton } from "@/utils/uploadthing";
// import { UploadDropzone } from "@/utils/uploadthing";

// export default function Test() {
//   return (<>
//     <h2>hello world </h2>
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">

//       {/* <UploadButton
//         endpoint="imageUploader"
//         onClientUploadComplete={(res) => {
//           console.log("Files: ", res);
//           alert("Upload Completed");
//         }}
//         onUploadError={(error: Error) => {
//           alert(`ERROR! ${error.message}`);
//         }}
//       /> */}


//       <UploadDropzone
//         endpoint="imageUploader"
//         onClientUploadComplete={(res) => {
//           console.log("Files: ", res);
//           alert("Upload Completed");
//         }}
//         onUploadError={(error: Error) => {
//           alert(`ERROR! ${error.message}`);
//         }}
//       />

//     </main >
//   </>)
// }

import prisma from "@/lib/db";

export default async function Page() {
  const users = await prisma.user.findMany();

  return (
    <div>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}
